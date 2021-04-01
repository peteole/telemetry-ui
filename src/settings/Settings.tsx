import { FormControl, FormHelperText, InputLabel, makeStyles, Select } from '@material-ui/core'
import { Divider, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { dataSources } from '../logic/Datasource';
import { Logic } from '../logic/logic'
import "./settings.css"
// const useStyles = makeStyles((theme) => ({
//     button: {
//         display: 'block',
//         marginTop: theme.spacing(2),
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 160,
//     },
// }));


type SettingsProps = {
    logic: Logic
}
export const Settings: React.FC<SettingsProps> = (props) => {
    const [value, selectValue] = React.useState<string>("")
    //const classes = useStyles()
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        props.logic.currentDataSource = dataSources.find((source) => source.matchesStringValue(event.target.value as string)) || null
        selectValue(event.target.value as string)
    }
    return (

        <Paper className="settings-grid-element">
            <Typography component="h1">Settings</Typography>
            <Divider />
            <FormControl className="settings-form">
                <InputLabel>Data source</InputLabel>
                <Select value={value} onChange={handleChange}>
                    {dataSources.map(source => source.getSelectOption())}
                </Select>
                <FormHelperText>Data source to use</FormHelperText>
                {props.logic.currentDataSource?.getSettings()}
            </FormControl>
        </Paper>
    )
}