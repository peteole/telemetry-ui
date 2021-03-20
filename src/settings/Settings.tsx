import { FormControl, FormHelperText, InputLabel, makeStyles, Select } from '@material-ui/core'
import { Divider, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { dataSources } from '../logic/Datasource';
import { Logic } from '../logic/logic'

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
    },
}));


type SettingsProps = {
    logic: Logic
}
export const Settings: React.FC<SettingsProps> = (props) => {
    const classes = useStyles()
    return (

        <Paper>
            <Typography component="h1">Settings</Typography>
            <Divider />
            <FormControl className={classes.formControl}>
                <InputLabel>Data source</InputLabel>
                <Select value="">
                    {dataSources.map(source => source.getSelectOption())}
                </Select>
                <FormHelperText>Data source to use</FormHelperText>
            </FormControl>
        </Paper>
    )
}