import { Grid } from '@material-ui/core'
import React from 'react'
import "./Navigation.css"



type NavigationProps = {
    children: {
        horizon: React.ReactNode,
        settings: React.ReactNode,
        terminal: React.ReactNode
    }
}
export const Navigation: React.FC<NavigationProps> = (props) => (
    <div>
        <Grid container spacing={3} className="nav-grid" >
            <Grid item style={{ flexGrow: 0 }}>
                {props.children.horizon}
            </Grid>

            <Grid item>
                {props.children.settings}
            </Grid>

            <Grid item>
                {props.children.terminal}
            </Grid>
        </Grid>
    </div>
)
