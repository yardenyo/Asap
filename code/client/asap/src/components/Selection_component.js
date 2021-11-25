import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import style from './Selection_component.module.css'

/**
 *
 * @param props
 * @returns {JSX.Element}
 * props should be :
 * 1) Title - select box label
 * 2) Items - selection options
 */

const Selection_component = props => {
    const [get_user_choice,set_user_choice] = React.useState('');

    const selection_made = (event) => {
        const choice = event.target.value;
        set_user_choice(choice);
    }
    let dummy_value = 0;
    const add_value_to_new_item = () => {
        dummy_value += 1;
        return dummy_value;
    }

    return  (<div className={style.container}>
    <div>
        <InputLabel className={style.container_label} id="demo-simple-select-autowidth-label">{props.title}</InputLabel>
    </div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                onChange={selection_made}
                value={get_user_choice}
            >
            {
                props.options.map(option => <MenuItem className={style.menuItem} value={add_value_to_new_item()}>{option}</MenuItem>)
            }
            </Select>
            </FormControl>
    </div>)
};

export default Selection_component;