import { Message, MessageRegistry } from "telemetryprotocolclient/dist/index"
import { NumberSensorValue, SensorValue } from "telemetryprotocolclient/dist/SensorValue"

class AbstractStreamHook {
    onData: ((data: ArrayBuffer) => void) | null = null;
    writeData: (data: ArrayBuffer) => void = data => { };
}
export class Logic {
    registry: MessageRegistry
    onUpdate: () => void
    data = {
        pitch: 0,
        bank: 0,
        heading: 0,
        speed: 0
    }
    constructor(streamHook: AbstractStreamHook, onUpdate = () => { }) {
        this.registry = new MessageRegistry()
        this.onUpdate = onUpdate
        streamHook.onData = (data) => {
            this.registry.readData(data)
            for (const sensVal of this.registry.basicSensorValues) {
                if (Object.keys(this.data).includes(sensVal.name)) {
                    (this.data as any)[sensVal.name] = sensVal.value
                }
            }
            this.onUpdate()
        }
    }
}