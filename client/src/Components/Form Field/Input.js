import { TextField } from "@material-ui/core";

function Input(props){
    const {name, label, value, error = null, onChange, ...otherProps} = props;
    return(
        <TextField 
            varient="outlined" 
            label={label} 
            name={name} 
            value={value} 
            onChange={onChange}
            {...otherProps}
            {...(error && {error: true, helperText: error})}

        ></TextField>
    )
}

export default Input;