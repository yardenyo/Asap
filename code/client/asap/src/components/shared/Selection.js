import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import style from './Selection.module.css';

/**
 *
 * @param props
 * @returns {JSX.Element}
 * props should be :
 * 1) Title - select box label
 * 2) ID - unique
 * 2) Items - selection options
 */

const Selection = ({ id, title, options, contextSetter, contextGetter, contextPropName }) => {
    const OnSelection = event => {
        const choice = event.target.value;
        contextSetter({ [contextPropName]: choice });
    };
    // console.log(contextGetter[contextPropName]);
    return (
        <div className={style.container}>
            <div>
                <InputLabel className={style.container_label} id="demo-simple-select-autowidth-label">
                    {title}
                </InputLabel>
            </div>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id={id}
                    autoWidth
                    onChange={OnSelection}
                    value={contextGetter[contextPropName]}
                >
                    {options?.map(option => (
                        <MenuItem className={style.menuItem} key={option.toString()} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default Selection;
