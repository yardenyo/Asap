import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import style from './Selection.module.css'

/**
 *
 * @param props
 * @returns {JSX.Element}
 * props should be :
 * 1) Title - select box label
 * 2) ID - unique  
 * 2) Items - selection options
 */

const Selection = ({id, title, options}) => {

    const [userChoice,setUserChoice] = React.useState('');

    const OnSelection = (event) => {
        const choice = event.target.value;
        setUserChoice(choice);
    }
    let dummyValue = 0;
    const addValueToNewItem = () => {
        dummyValue += 1;
        return dummyValue;
    }

    return  (<div className={style.container}>
    <div>
        <InputLabel className={style.container_label} id="demo-simple-select-autowidth-label">{title}</InputLabel>
    </div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select
                labelId="demo-simple-select-autowidth-label"
                id={id}
                autoWidth
                onChange={OnSelection}
                value={userChoice}
            >
            {
                options?.map(option => <MenuItem className={style.menuItem} key={option.toString()}
                                                value={addValueToNewItem()}>{option}</MenuItem>)
            }
            </Select>
            </FormControl>
    </div>)
};

export default Selection;