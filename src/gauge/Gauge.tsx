import React from "react";
import { Component, RefObject } from "react";

type GaugeProps = {
    value: number,
    orientation: "horizontal" | "vertical"
    height: number,
    width: number
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
                <canvas height={this.props.height} width={this.props.width} ref={this.canvasRef} />
            </div>
        )
    }
    componentDidMount() {
        this.componentDidUpdate()
    }
    componentDidUpdate() {
        switch (this.props.orientation) {
            case "horizontal":
                this.renderHorizontally();
                break;
            case "vertical":
                this.renderVertically();
                break;
        }
    }
    renderHorizontally() {

    }
    renderVertically() {

        const ctx = this.canvasRef.current?.getContext("2d")
        if (!ctx)
            return
        //render gauge horion here. Access value using this.props.value.
        const value = this.props.value


        const factor = 5
        const width = this.props.width
        const height = this.props.height
        var fwidth = 2.5 * width
        var fheight = factor * height



        /**value band */
        for (let i = (value - 15); i <= (value + 15); i++) {
            ctx.strokeStyle = "white";
            if (i % 10 == 0) {
                ctx.strokeText(i.toString(), width * 0.1, height / 2 + 12 - (i - value) * 4 * factor);
            }
            else if (i % 5 == 0) {
                ctx.beginPath();
                ctx.moveTo(width * 0.5, height / 2 - (i - value) * 4 * factor);
                ctx.lineTo(width * 0.95, height / 2 - (i - value) * 4 * factor);
                ctx.stroke();
            }
        }
        ctx.clearRect(width * 0.05, height / 2 - 25, width * 0.8, 50); //Value on PFD
        ctx.strokeText(value + " m", width * 0.1, height / 2 + 12);


    }
}