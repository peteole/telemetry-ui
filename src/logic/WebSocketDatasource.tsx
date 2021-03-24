import { Link, MenuItem, Select, TextField } from "@material-ui/core"
import { ContactsOutlined } from "@material-ui/icons"
import React, { useEffect, useRef } from "react"
import { DataSource, AbstractStreamHook } from "./Datasource"

export class WebSocketDataSource implements DataSource {
    baseUrl: string = ""
    socket: WebSocket | null = null
    streamHook: AbstractStreamHook
    constructor(baseUrl: string = "localhost:9091") {
        this.setSocketUrl(baseUrl)
        this.streamHook = {
            writeData: data => this.socket?.send(data),
            onData: null
        }
    }
    matchesStringValue(selectValue: string): boolean {
        return selectValue === "websocket-" + this.baseUrl
    }
    getSettings(): React.ReactNode {
        return <Settings source={this} />
    }
    openPort(newPort: PortInfo) {
        const url = new URL(this.baseUrl + "/open-port-request?")
        url.searchParams.append("path", encodeURI(newPort.path))
        url.searchParams.append("baud", "9600")
        fetch(url.href).then(res => {
            res.text().then(text => {
                if (text === "success") {
                    this.setSocketUrl(this.baseUrl, "/device" + newPort.path)
                }
            })
        })
    }
    close(): void {
        this.socket?.close()
    }
    setSocketUrl(newUrl: string, socketURLExtension = "") {
        this.socket?.close()
        try {
            this.socket = new WebSocket(newUrl.replace("http://", "ws://") + socketURLExtension)
            this.socket.onopen = (ev) => {
                this.socket?.send("Hallo Welt")
            }
            this.socket.onmessage = (ev) => console.log(ev.data)
        } catch (error) {
            console.log(error)
        }
        this.baseUrl = newUrl
    }
    getSelectOption(): React.ReactNode {
        return (<MenuItem value={"websocket-" + this.baseUrl}>
            <p>Websocket <Link>{this.baseUrl}</Link></p>
        </MenuItem>)
    }
    getStreamHook(): AbstractStreamHook {
        this.streamHook.writeData = data => this.socket?.send(data)
        return this.streamHook
    }
    begin() { }
}

const WebsocketPortInfo: React.FC<{ url: string, onChange: (newPort: PortInfo) => void }> = (props) => {
    const [state, setState] = React.useState<{ ports: PortInfo[], selected: string }>({ ports: [], selected: "" })
    const timerID = useRef(-1)
    window.clearInterval(timerID.current)
    const localURL = props.url
    timerID.current = window.setInterval(async () => {
        try {

            const deviceJSON = await fetch(localURL + "/devices")
            const ports = await deviceJSON.json()
            setState({ ports: ports, selected: state.selected })
        } catch (error) {
            console.log(error)
        }
    }, 1000)
    useEffect(() => {
        return () => {
            console.log("Clearing timer ", timerID.current, "before exit")
            window.clearInterval(timerID.current)
        }
    }, [])
    return (
        <Select value={state.selected} onChange={(event) => {
            const newPort = state.ports.find(p => p.path === event.target.value)
            if (newPort)
                props.onChange(newPort)
            setState({ ports: state.ports, selected: event.target.value as string })
        }}>
            {
                state.ports.map(port => (
                    <MenuItem value={port.path}>{port.path} ({port.manufacturer})</MenuItem>
                ))
            }
        </Select >
    )

}

interface PortInfo {
    path: string;
    manufacturer?: string;
    serialNumber?: string;
    pnpId?: string;
    locationId?: string;
    productId?: string;
    vendorId?: string;
}

const Settings: React.FC<{ source: WebSocketDataSource }> = (props) => {
    const [url, setURL] = React.useState<string>(props.source.baseUrl)
    return (
        <div>
            <TextField defaultValue={props.source.baseUrl} onChange={(event) => {
                props.source.setSocketUrl(event.target.value)
                setURL(event.target.value)
            }} />
            <WebsocketPortInfo url={url} onChange={props.source.openPort.bind(props.source)} />
        </div>
    )
}