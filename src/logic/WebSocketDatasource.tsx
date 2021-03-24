import { Link, MenuItem, Select, TextField } from "@material-ui/core"
import { render } from "@testing-library/react"
import React from "react"
import { DataSource, AbstractStreamHook } from "./Datasource"

export class WebSocketDataSource implements DataSource {
    baseUrl: string = ""
    socket: WebSocket | null = null
    streamHook: AbstractStreamHook
    constructor(baseUrl: string = window.location.href) {
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
        return (
            <div>
                <TextField defaultValue={this.baseUrl} onChange={(event) => {
                    this.setSocketUrl(event.target.value)
                }} />
                <WebsocketPortInfo url={this.baseUrl} onChange={this.openPort} />
            </div>)
    }
    openPort(newPort: PortInfo) {
        const params = new URLSearchParams()
        params.set("path", newPort.path + "/open-port-request")
        params.set("baud", "9600")
        fetch(this.baseUrl + "/open-port-request?" + params.toString()).then(res => {
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
            this.socket = new WebSocket(newUrl + socketURLExtension)
        } catch (error) {

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

class WebsocketPortInfo extends React.Component<{ url: string, onChange: (newPort: PortInfo) => void }, { ports: PortInfo[], selected: string }> {
    private timerID: number
    constructor(props: { url: string, onChange: (newPort: PortInfo) => void }) {
        super(props)
        this.state = { ports: [], selected: "" }
        this.timerID = window.setInterval(async () => {
            const deviceJSON = await fetch(this.props.url + "/devices")
            this.setState(await deviceJSON.json())
        }, 1000)
    }
    componentWillUnmount() {
        window.clearInterval(this.timerID)
    }
    render() {
        return (
            <Select onChange={(event) => {
                const newPort = this.state.ports.find(p => p.path === event.target.value)
                if (newPort)
                    this.props.onChange(newPort)
            }}>
                {this.state.ports.map(port => (
                    <MenuItem value={port.path}>{port.path} ({port.manufacturer})</MenuItem>
                ))}
            </Select>
        )
    }
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