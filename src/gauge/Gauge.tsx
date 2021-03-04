import React from "react";
import { Component, RefObject } from "react";

type GaugeProps = {
    altitude: number,
    mhdg: number,
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
        const ctx = this.canvasRef.current?.getContext("2d")
        if (!ctx)
            return
        //render gauge horion here. Access value using this.props.value.
        const alt = this.props.altitude
        const altBias = 0
        const mhdg = this.props.mhdg

        const factor = 5
        const width = 600
        const height = 400
        var fwidth = 2.5 * width
        var fheight = factor * height

        //circle
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, height / 2.2, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();
        /**triangle marker for bank */
        ctx.translate(width / 2, height / 2);
        ctx.beginPath();
        ctx.moveTo(0, -height / 2.2);
        ctx.lineTo(-5, -height / 2.3);
        ctx.lineTo(5, -height / 2.3);
        ctx.lineTo(0, -height / 2.2);
        ctx.strokeStyle = "yellow";
        ctx.stroke();
        ctx.translate(-width / 2, -height / 2);

        ctx.beginPath();
        ctx.rect(width / 2 - factor, height / 2 - factor, 2 * factor, 2 * factor);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "yellow";
        ctx.stroke();
        /**aircraft symbol */
        ctx.beginPath();
        ctx.moveTo(-height / 2.3 + width / 2, height / 2);
        ctx.lineTo(-height / 4 + width / 2, height / 2);
        ctx.lineTo(-height / 4 + width / 2, height / 2 + 5 * factor);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(height / 2.3 + width / 2, height / 2);
        ctx.lineTo(height / 4 + width / 2, height / 2);
        ctx.lineTo(height / 4 + width / 2, height / 2 + 5 * factor);
        ctx.stroke();

        /**alt band */
        for (let i = (alt - altBias - 15); i <= (alt - altBias + 15); i++) {
            ctx.strokeStyle = "white";
            if (i % 10 == 0) {
                ctx.strokeText(i.toString(), width * 0.87, height / 2 + 12 - (i - alt + altBias) * 4 * factor);
            }
            else if (i % 5 == 0) {
                ctx.beginPath();
                ctx.moveTo(width * 0.87, height / 2 - (i - alt + altBias) * 4 * factor);
                ctx.lineTo(width * 0.95, height / 2 - (i - alt + altBias) * 4 * factor);
                ctx.stroke();
            }
        }
        ctx.clearRect(width * 0.83, height / 2 - 25, width * 0.17, 50); //Alt on PFD
        ctx.strokeText(alt - altBias + " m", width * 0.85, height / 2 + 12);

        ctx.clearRect(width * 0.5 - 30, height - 25, 60, 25); //HDG on PFD
        ctx.strokeText(mhdg.toString(), width * 0.5 - 25, height);
    }
}