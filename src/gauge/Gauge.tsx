import React from "react";
import { Component, RefObject } from "react";

type GaugeProps = {
    value: number,
    orientation: "horizontal" | "vertical"
}
export class Gauge extends Component<GaugeProps, {}>{
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
        const ctx = this.canvasRef.current?.getContext("2d")
        if (!ctx)
            return
        //render gauge horion here. Access value using this.props.value.
        const value = this.props.value


        const factor = 5
        const width = 600
        const height = 400
        var fwidth = 2.5 * width
        var fheight = factor * height



        /**value band */
        for (let i = (value - 15); i <= (value + 15); i++) {
            ctx.strokeStyle = "white";
            if (i % 10 == 0) {
                ctx.strokeText(i.toString(), width * 0.87, height / 2 + 12 - (i - value) * 4 * factor);
            }
            else if (i % 5 == 0) {
                ctx.beginPath();
                ctx.moveTo(width * 0.87, height / 2 - (i - value) * 4 * factor);
                ctx.lineTo(width * 0.95, height / 2 - (i - value) * 4 * factor);
                ctx.stroke();
            }
        }
        ctx.clearRect(width * 0.83, height / 2 - 25, width * 0.17, 50); //Value on PFD
        ctx.strokeText(value + " m", width * 0.85, height / 2 + 12);


    }
}