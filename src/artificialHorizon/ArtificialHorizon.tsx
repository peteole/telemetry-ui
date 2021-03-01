import React from "react";
import { Component, RefObject } from "react";

type ArtificialHorizonProps = {
    pitch: number,
    bank: number
}
export class ArtificialHorizon extends Component<ArtificialHorizonProps, {}>{
    canvasRef: RefObject<HTMLCanvasElement>

    constructor(props: ArtificialHorizonProps) {
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
        //render artificial horizon here. Access pitch and bank using this.props.pitch.
        
        const pitch = this.props.pitch
        const bank = this.props.bank
        const factor = 5
        const width = 600
        const height = 400
        var fwidth = 2.5 * width
        var fheight = factor * height
        
        ctx.translate(width / 2, height / 2);
        ctx.rotate(-bank * Math.PI / 180);
        ctx.translate(0, factor * pitch);
        ctx.fillStyle = "brown";
        ctx.fillRect(-fwidth / 2, 0, fwidth, fheight / 2);
        ctx.fillStyle = "blue";
        ctx.fillRect(-fwidth / 2, -fheight / 2, fwidth, fheight / 2);
        for (let i = -60; i <= 60; i = i + 10) {
            ctx.lineWidth = 1;
            ctx.moveTo(-10 * factor, factor * i);
            ctx.lineTo(10 * factor, factor * i);
            ctx.strokeStyle = "white";
            ctx.stroke();
        }
        for (let i = -25; i <= 25; i = i + 10) {
            ctx.moveTo(-5 * factor, factor * i);
            ctx.lineTo(5 * factor, factor * i);
            ctx.stroke();
        }
        for (let i = -27.5; i <= 27.5; i = i + 5) {
            ctx.moveTo(-3 * factor, factor * i);
            ctx.lineTo(3 * factor, factor * i);
            ctx.stroke();
        }
        ctx.strokeText("10", -17 * factor, -8 * factor);
        ctx.strokeText("10", 10 * factor, -8 * factor);
        ctx.strokeText("10", -17 * factor, 12 * factor);
        ctx.strokeText("10", 10 * factor, 12 * factor);
        ctx.strokeText("20", -17 * factor, -18 * factor);
        ctx.strokeText("20", 10 * factor, -18 * factor);
        ctx.strokeText("20", -17 * factor, 22 * factor);
        ctx.strokeText("20", 10 * factor, 22 * factor);


        ctx.translate(0, -factor * pitch);
        /**scale bank */
        ctx.rotate(30 * Math.PI / 180);
        for (let i = -30; i <= 30; i = i + 10) {
            ctx.beginPath();
            ctx.moveTo(0, -height / 2.2);
            ctx.lineTo(0, -height / 2.1);
            if (i == 0) {
                ctx.lineTo(0, -height / 2.01);
            }
            ctx.stroke();
            ctx.rotate(-10 * Math.PI / 180);
        }
        ctx.rotate(40 * Math.PI / 180);

        ctx.rotate(bank * Math.PI / 180);
        ctx.translate(-width / 2, -height / 2);

        }
}