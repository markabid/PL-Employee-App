import { Button as MaterialButton } from "@material-ui/core"

function Button(props){
    const {text, size, color, variant, type, onClick, ...otherProps} = props;

    return(
        <MaterialButton 
            variant={variant} 
            size={size} 
            color={color} 
            type={type || "button"} 
            onClick={onClick}
            {...otherProps}>
            {text}
        </MaterialButton>
    )
}

export default Button;