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
        const context = this.canvasRef.current?.getContext("2d")
        if (!context)
            return
        //render artificial horizon here. Access pitch and bank using this.props.pitch.
    }
}