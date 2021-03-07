import { Message, MessageRegistry } from "telemetryprotocolclient/dist/index"
import { NumberSensorValue, SensorValue } from "telemetryprotocolclient/dist/SensorValue"

export class Logic {
    registry: MessageRegistry
    stream: WebSocket
    constructor(url:string) {
        this.registry = new MessageRegistry()
        this.stream = new WebSocket(url)
        this.stream.onopen=(ev)=>{
            console.log("Websocked opened")
        }
        this.stream.onmessage=(ev)=>{
            this.registry.readData(ev.data)
        }
    }
}