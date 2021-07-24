import { FormControl, InputLabel, MenuItem, Select as MaterialSelect } from "@material-ui/core";

function Select(props){
    const {name, label, value, onChange, options} = props;

    return(
        <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MaterialSelect 
                label={label} 
                name={name} 
                value={value} 
                onChange={onChange}>
                {
                    options.map(
                        item => (<MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>)
                    )
                }
            </MaterialSelect>
        </FormControl>
    )
}

export default Select;