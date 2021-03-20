import { Grid } from '@material-ui/core'
import React from 'react'
import "./Navigation.css"



type NavigationProps = {
    children: {
        horizon: React.ReactNode,
        settings: React.ReactNode
    }
}
export const Navigation: React.FC<NavigationProps> = (props) => (
    <div>
        <Grid container spacing={3} alignItems="center" alignContent="center">
            <Grid item>
                {props.children.horizon}
            </Grid>

            <Grid item xs={3}>
                {props.children.settings}
            </Grid>
        </Grid>
    </div>
)
