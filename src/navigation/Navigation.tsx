import { Grid, Paper } from '@material-ui/core'
import React from 'react'
import "./Navigation.css"



type NavigationProps = {
    children: {
        horizon: React.ReactNode,
        settings: React.ReactNode
    }
}
export class Navigation extends React.Component<NavigationProps, {}>{
    render() {
        return (
            <div>
                <Grid container spacing={3} alignItems="center" alignContent="center">
                    <Grid item>
                        {this.props.children.horizon}
                    </Grid>

                    <Grid item >
                        <Paper className="settings-element">
                            {this.props.children.settings}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}