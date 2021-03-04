import React from "react";
import { Component, RefObject } from "react";

type GaugeProps = {
    value: number,
    orientation: "horizonal" | "vertical"
}
export class Terminal extends Component<GaugeProps, { lines: string[] }>{
    canvasRef: RefObject<HTMLCanvasElement>

    constructor(props: GaugeProps) {
        super(props)
        this.canvasRef = React.createRef<HTMLCanvasElement>()
        this.state = { lines: [] }
    }
    render() {
        return (
            <div>
                {this.state.lines.map((line) => (
                    <p>line</p>
                ))}
                <input />
            </div>
        )
    }
    addLine(line: string) {
        this.setState({ lines: [...this.state.lines, line] })
    }
    clear() {
        this.setState({ lines: [] })
    }
}