import React from "react";
import { Component, RefObject } from "react";

type GaugeProps = {
    value: number,
    orientation: "horizontal" | "verticalL" | "verticalR"
    height: number,
    width: number,
    className: string | undefined
}
export class Gauge extends Component<GaugeProps, {}>{
    canvasRef: RefObject<HTMLCanvasElement>

    constructor(props: GaugeProps) {
        super(props)
        this.canvasRef = React.createRef<HTMLCanvasElement>()
    }
    render() {
        const mystyle: React.CSSProperties = {

            fontFamily: "Arial"
        };
        return (
            <div className={this.props.className}>
                <canvas height={this.props.height} width={this.props.width} ref={this.canvasRef} style={mystyle} />

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
            case "verticalL":
                this.renderVerticallyL();
                break;
            case "verticalR":
                this.renderVerticallyR();
                break;
        }
    }
    renderHorizontally() {

        const ctx = this.canvasRef.current?.getContext("2d")

        if (!ctx)
            return
        //render gauge here. Access value using this.props.value.
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
                if (j < 0) { j = j + 360 }

                ctx.strokeText(j.toString(), width / 2 + (i - value) * 2 * factor - 14, height * 0.8);
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
        ctx.fillStyle="black";
        ctx.fillRect(width * 0.5 - 25, 3, 50, height*0.9); //Value on PFD
        ctx.strokeStyle = "white";
        ctx.beginPath();

        ctx.rect(width * 0.5 - 25, 3, 50, height*0.9);
        ctx.stroke();
        ctx.font = "20px Arial";
        ctx.strokeText(value.toString(), width * 0.5 - 17, height * 0.8);



    }
    renderVerticallyL() {
        const ctx = this.canvasRef.current?.getContext("2d")

        if (!ctx)
            return
        //render gauge here. Access value using this.props.value.
        const value = this.props.value

        const factor = 10
        const width = this.props.width
        const height = this.props.height


        /**value band */
        for (let i = (value - 10); i <= (value + 10); i++) {
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
        ctx.fillStyle = "black";
        ctx.fillRect(width * 0.01, height / 2 - 25, width * 0.9, 50); //Value on PFD
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.rect(width * 0.01, height / 2 - 25, width * 0.9, 50);
        ctx.stroke();
        ctx.font = "20px Arial";
        ctx.strokeText(value + " m/s", width * 0.1, height / 2 + 12);


    }
    renderVerticallyR() {
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
        ctx.fillStyle = "black";
        ctx.fillRect(width * 0.01, height / 2 - 25, width * 0.99, 50); //Value on PFD
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.rect(width * 0.01, height / 2 - 25, width * 0.99, 50);
        ctx.stroke();
        ctx.font = "20px Arial";
        
        ctx.strokeText(value + " m", width * 0.1, height / 2 + 12);


    }
}