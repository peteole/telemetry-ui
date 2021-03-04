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
        const ctx = this.canvasRef.current?.getContext("2d")



        if (!ctx)
            return
        //render gauge horion here. Access value using this.props.value.
        const value = this.props.value


        const factor = 5
        const width = this.props.width
        const height = this.props.height


        /**value band */
        for (let i = (value - 25); i <= (value + 25); i++) {
            ctx.strokeStyle = "black";

            if (i % 10 === 0) {
                ctx.font = "15px Arial";
                let j = i % 360;
                if (j<0) {j= j+360}

                ctx.strokeText(j.toString(), width / 2 + (i - value) * 2 * factor-5, height * 0.8);
                ctx.beginPath();
                ctx.moveTo(width / 2 + (i - value) * 2 * factor, height * 0.1);
                ctx.lineTo(width / 2 + (i - value) * 2 * factor, height * 0.4);
                ctx.stroke();
            }
            else if (i % 5 === 0) {
                ctx.beginPath();
                ctx.moveTo(width / 2 + (i - value) * 2 * factor, height * 0.1);
                ctx.lineTo(width / 2 + (i - value) * 2 * factor, height * 0.8);
                ctx.stroke();
            }
        }
        ctx.clearRect(width * 0.5 - 20, 0, 40, height); //Value on PFD
        ctx.font = "20px Arial";
        ctx.strokeText(value.toString(), width * 0.5 - 10, height * 0.8);



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


        /**value band */
        for (let i = (value - 25); i <= (value + 25); i++) {
            ctx.strokeStyle = "black";

            if (i % 10 === 0) {
                ctx.font = "15px Arial";
                ctx.strokeText(i.toString(), width * 0.1, height / 2 + 5 - (i - value) * 2 * factor);
                ctx.beginPath();
                ctx.moveTo(width * 0.6, height / 2 - (i - value) * 2 * factor);
                ctx.lineTo(width * 0.9, height / 2 - (i - value) * 2 * factor);
                ctx.stroke();
            }
            else if (i % 5 === 0) {
                ctx.beginPath();
                ctx.moveTo(width * 0.3, height / 2 - (i - value) * 2 * factor);
                ctx.lineTo(width * 0.9, height / 2 - (i - value) * 2 * factor);
                ctx.stroke();
            }
        }
        ctx.clearRect(width * 0.1, height / 2 - 25, width * 0.8, 50); //Value on PFD
        ctx.font = "20px Arial";
        ctx.strokeText(value + " m", width * 0.1, height / 2 + 12);


    }
}