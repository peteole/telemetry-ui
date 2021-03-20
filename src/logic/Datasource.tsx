import { Link, MenuItem, TextField } from "@material-ui/core";
import React from "react"
export class AbstractStreamHook {
    /**this is called when data arrive on the plane */
    onData: ((data: ArrayBuffer) => void) | null = null;
    /** call this to send data to the plane */
    writeData: (data: ArrayBuffer) => void = data => { };
}
export interface DataSource {
    getSelectOption(): React.ReactNode
    getStreamHook(): AbstractStreamHook
}
export class DemoDataSource implements DataSource {
    getSelectOption(): React.ReactNode {
        return (<MenuItem value="demo">Demo data</MenuItem>)
    }
    getStreamHook(): AbstractStreamHook {
        return {
            writeData: data => console.log(data),
            onData: null
        }
    }
}
export class WebSocketDataSource implements DataSource {
    url: string=""
    socket: WebSocket | null = null
    streamHook: AbstractStreamHook
    constructor(url: string = window.location.href) {
        this.setUrl(url)
        this.streamHook = {
            writeData: data => this.socket?.send(data),
            onData: null
        }
    }
    setUrl(newUrl: string) {
        this.socket?.close()
        try {
            this.socket = new WebSocket(newUrl)
        } catch (error) {

        }
        this.url = newUrl
    }
    getSelectOption(): React.ReactNode {
        return (<MenuItem value={"websocket-" + this.url}>
            <p>Websocket <Link>{this.url}</Link></p>
        </MenuItem>)
    }
    getStreamHook(): AbstractStreamHook {
        this.streamHook.writeData = data => this.socket?.send(data)
        return this.streamHook
    }

}
const socketSource = new WebSocketDataSource("")
const demoSource = new DemoDataSource()
export const dataSources = [demoSource, socketSource]