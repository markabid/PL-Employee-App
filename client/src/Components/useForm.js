import { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(initialValues){
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const handleInputChange = e => {
        const{name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const reset = () => {
        setValues(initialValues);
        setErrors({});
    }
    
    return {
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        reset
    }
}

const styles = makeStyles(theme => ({
    form: {  
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}));

export function Form(props) {
    const classes = styles();
    const {children, ...otherProps} = props;
    return(
        <form className={classes.form} {...otherProps}>
            {props.children}
        </form>
    )
}