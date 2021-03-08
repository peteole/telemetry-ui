import React from "react";
import { Component, RefObject } from "react";
import { Gauge } from "../gauge/Gauge";
import "./ArtificialHorizon.css"
type ArtificialHorizonProps = {
    pitch: number,
    bank: number,
    height: number,
    width: number,
    heading: number,
    altitude: number,
    speed: number
}
export class ArtificialHorizon extends Component<ArtificialHorizonProps, {}>{
    canvasRef: RefObject<HTMLCanvasElement>
    headingRef: RefObject<Gauge>
    altitudeRef: RefObject<Gauge>
    speedRef: RefObject<Gauge>
    static defaultProps = {
        height: 500,
        width: 600
    }
    constructor(props: ArtificialHorizonProps) {
        super(props)
        this.canvasRef = React.createRef<HTMLCanvasElement>()
        this.headingRef = React.createRef<Gauge>()
        this.altitudeRef = React.createRef<Gauge>()
        this.speedRef = React.createRef<Gauge>()
    }
    render() {
        return (
            <div className="ah-container" style={{ height: this.props.height, width: this.props.width }}>
                <canvas className="ah-canvas" ref={this.canvasRef} height={this.props.height} width={this.props.width} />
                <Gauge className="heading-gauge" ref={this.headingRef} height={this.props.height * 0.1} orientation={"horizontal"} width={this.props.width} value={this.props.heading} />
                <Gauge className="alt-gauge" ref={this.altitudeRef} height={this.props.height} orientation={"verticalR"} width={this.props.width * 0.1} value={this.props.altitude} />
                <Gauge className="speed-gauge" ref={this.speedRef} height={this.props.height} orientation={"verticalL"} width={this.props.width * 0.13} value={this.props.speed} />
            </div>
        )
    }
    componentDidMount() {
        this.componentDidUpdate()
    }
    componentDidUpdate() {
        const ctx = this.canvasRef.current?.getContext("2d")

        if (!ctx)
            return
        //render artificial horizon here. Access pitch and bank using this.props.pitch.

        const pitch = this.props.pitch
        const bank = this.props.bank
        const factor = 8
        const width = this.props.width
        const height = this.props.height
        var fwidth = 2.5 * width
        var fheight = factor * height
        //horizon
        ctx.translate(width / 2, height / 2);
        ctx.rotate(-bank * Math.PI / 180);
        ctx.translate(0, factor * pitch);
        ctx.fillStyle = "brown";
        ctx.fillRect(-fwidth / 2, 0, fwidth, fheight / 2);
        ctx.fillStyle = "blue";
        ctx.fillRect(-fwidth / 2, -fheight / 2, fwidth, fheight / 2);
        for (let i = -60; i <= 60; i = i + 10) {
            ctx.lineWidth = 1;
            ctx.moveTo(-50, factor * i);
            ctx.lineTo(50, factor * i);
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
        ctx.font = "30px Arial";
        ctx.strokeText("10", -85, -10 * factor + 10);
        ctx.strokeText("10", 50, -10 * factor + 10);
        ctx.strokeText("10", -85, 10 * factor + 10);
        ctx.strokeText("10", 50, 10 * factor + 10);
        ctx.strokeText("20", -85, -20 * factor + 10);
        ctx.strokeText("20", 50, -20 * factor + 10);
        ctx.strokeText("20", -85, 20 * factor + 10);
        ctx.strokeText("20", 50, 20 * factor + 10);


        ctx.translate(0, -factor * pitch);
        /**scale bank */
        ctx.rotate(30 * Math.PI / 180);
        for (let i = -30; i <= 30; i = i + 10) {
            ctx.beginPath();
            ctx.moveTo(0, -height / 2.5);
            ctx.lineTo(0, -height / 2.35);
            if (i === 0) {
                ctx.lineTo(0, -height / 2.25);
            }
            ctx.stroke();
            ctx.rotate(-10 * Math.PI / 180);
        }
        ctx.rotate(40 * Math.PI / 180);

        ctx.rotate(bank * Math.PI / 180);
        ctx.translate(-width / 2, -height / 2);

        //circle
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, height / 2.5, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();
        /**triangle marker for bank */
        ctx.translate(width / 2, height / 2);
        ctx.beginPath();
        ctx.moveTo(0, -height / 2.5);
        ctx.lineTo(-8, -height / 2.3);
        ctx.lineTo(8, -height / 2.3);
        ctx.lineTo(0, -height / 2.5);
        ctx.strokeStyle = "yellow";
        ctx.stroke();
        ctx.translate(-width / 2, -height / 2);

        ctx.beginPath();
        ctx.rect(width / 2 - 5, height / 2 - 5, 10, 10);
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

    }
}