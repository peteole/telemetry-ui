import { Paper } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Logic } from "../logic/logic";
import "./terminal.css"

type TerminalProps = {
    logic: Logic
}
export const Terminal: React.FC<TerminalProps> = (props) => {
    const [lines, setLines] = useState<string[]>([])
    props.logic.onMessage = (input) => {
        lines.push(input)
        setLines(lines)
    }
    const inputRef = useRef<HTMLInputElement>(null)
    const handleInput = () => {
        if (inputRef.current) {
            props.logic.sendMessage(inputRef.current.value)
            inputRef.current.value = ""
        }
    }
    return (
        <Paper className="terminal">
            <div className="terminal-output-container">
                {lines.map((line) => (
                    <p>{line}</p>
                ))}
            </div>
            <input ref={inputRef} onKeyPress={(event) => { if (event.key === "Enter") handleInput() }} />
        </Paper>
    )
}