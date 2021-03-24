import { MessageRegistry } from "telemetryprotocolclient/dist/index"
import { AbstractStreamHook, DataSource } from "./Datasource"


export class Logic {
    registry: MessageRegistry | null = null
    onUpdate: () => void
    data = {
        pitch: 0,
        bank: 0,
        heading: 0,
        speed: 0,
        altitude: 0
    }
    private _currentDataSource: DataSource | null = null
    private streamHook: AbstractStreamHook | null = null
    constructor(onUpdate = () => { }) {
        this.onUpdate = onUpdate
    }
    set currentDataSource(s: DataSource | null) {
        this._currentDataSource = s
        this.setStreamHook(s?.getStreamHook() || null)
        s?.begin()
    }
    get currentDataSource() { return this._currentDataSource }
    private setStreamHook(streamHook: AbstractStreamHook | null) {
        this.streamHook = streamHook
        this.registry = new MessageRegistry()
        if (streamHook)
            streamHook.onData = (data) => {
                if (!this.registry)
                    return
                this.registry.readData(data)
                for (const sensVal of this.registry.basicSensorValues || []) {
                    if (Object.keys(this.data).includes(sensVal.name)) {
                        (this.data as any)[sensVal.name] = sensVal.value
                    }
                }
                this.onUpdate()
            }
    }
}
