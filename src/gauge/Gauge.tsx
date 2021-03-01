import React from "react";
import { Component, RefObject } from "react";

type GaugeProps = {
    value: number,
    orientation:"horizonal"|"vertical"
}
export class ArtificialHorizon extends Component<GaugeProps, {}>{
    canvasRef: RefObject<HTMLCanvasElement>

    constructor(props: GaugeProps) {
        super(props)
        this.canvasRef = React.createRef<HTMLCanvasElement>()
    }
    render() {
        return (
            <div>
                <canvas ref={this.canvasRef} />
            </div>
        )
    }
    componentDidUpdate() {
        const context = this.canvasRef.current?.getContext("2d")
        if (!context)
            return
        //render gauge horizon here. Access value using this.props.value.
    }
}