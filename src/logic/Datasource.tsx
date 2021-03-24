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
    getSettings(): React.ReactNode
    close(): void
    begin(): void
    matchesStringValue(selectValue: string): boolean
}
export class DemoDataSource implements DataSource {
    matchesStringValue(selectValue: string) {
        return selectValue === "demo"
    }
    hook: AbstractStreamHook = {
        writeData: data => console.log(data),
        onData: null
    }
    getSettings(): React.ReactNode {
        return null
    }
    getSelectOption(): React.ReactNode {
        return (<MenuItem value="demo">Demo data</MenuItem>)
    }
    getStreamHook(): AbstractStreamHook {
        return this.hook
    }
    close() { }
    begin() {
        this.hook.onData?.(sampleInputBuffer)
    }
}
export class WebSocketDataSource implements DataSource {
    url: string = ""
    socket: WebSocket | null = null
    streamHook: AbstractStreamHook
    constructor(url: string = window.location.href) {
        this.setUrl(url)
        this.streamHook = {
            writeData: data => this.socket?.send(data),
            onData: null
        }
    }
    matchesStringValue(selectValue: string): boolean {
        return selectValue === "websocket-" + this.url
    }
    getSettings(): React.ReactNode {
        return (<TextField defaultValue={this.url} onChange={(event) => {
            this.setUrl(event.target.value)
        }} />)
    }
    close(): void {
        this.socket?.close()
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
    begin() { }
}
const socketSource = new WebSocketDataSource("")
const demoSource = new DemoDataSource()
export const dataSources = [demoSource, socketSource]



const sampleBinaryInput = "00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 0A 5D 0A 7D 00 01 00 11 00 00 00 00 C0 41 18 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 C8 41 19 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 D0 41 1A 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 D8 41 1B 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 E0 41 1C 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 E8 41 1D 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 F0 41 1E 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 F8 41 1F 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 00 00 42 20 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 04 42 21 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 08 42 22 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 0C 42 23 00 00 00 00 00 00 00 01 00 FF 11 7B 22 6E 61 6D 65 22 3A 20 22 6C 69 73 74 22 2C 0A 20 22 73 69 7A 65 22 3A 20 38 2C 20 22 76 61 6C 75 65 73 22 3A 20 5B 0A 7B 22 6E 61 6D 65 22 3A 20 22 61 6C 74 69 74 75 64 65 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 66 6C 6F 61 74 22 7D 2C 0A 7B 22 6E 61 6D 65 22 3A 20 22 68 65 61 64 69 6E 67 22 2C 20 22 73 69 7A 65 22 3A 20 34 2C 20 22 74 79 70 65 22 3A 20 22 69 6E 74 22 7D 2C 0A 5D 0A 7D 00 01 00 11 00 00 00 00 10 42 24 00 00 00 00 00 00 00 01 "
const sampleInputBuffer = new Uint8Array(sampleBinaryInput.split(" ").map(hexString => parseInt(hexString, 16)))