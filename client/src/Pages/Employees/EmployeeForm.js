import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../Components/useForm";
import Input from "../../Components/Form Field/Input";
import Select from "../../Components/Form Field/Select";
import Button from "../../Components/Form Field/Button";
import * as EmployeeService from "../../Service/EmployeeService"
import { useEffect } from "react";

const initialValues = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    department: '',
    title: '',
    city: '',
    state: ''
}

function EmployeeForm(props){
    const { createEdit, recordForEdit } = props
    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        reset
    } = useForm(initialValues);

    const validateInput = () => {
        let temp = {};
        temp.firstName = values.firstName ? "" : "Please enter the first name";
        temp.lastName = values.lastName ? "" : "Please enter the last name";
        temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "Invalid Email";
        temp.phoneNumber = values.phoneNumber.length >= 10 ? "" : "Enter a 10 digit phone number";
        temp.title = values.title ? "" : "Please enter the employee title";
        temp.department = values.department ? "" : "Please enter the employee department";
        setErrors({...temp});

        return Object.values(temp).every(x => x === "")
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(validateInput()){
            createEdit(values, reset);
        }
    }

    useEffect(() => {
        if(recordForEdit){
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    return(
        <Form onSubmit={handleSubmit}>
            <Grid container> 
                <Grid item xs={6}>
                    <Input 
                        name="firstName" 
                        label="First Name" 
                        value={values.firstName} 
                        onChange={handleInputChange}
                        error={errors.firstName}
                    ></Input>
                    <Input 
                        name="lastName" 
                        label="Last Name" 
                        value={values.lastName} 
                        onChange={handleInputChange}
                        error={errors.lastName}
                    ></Input>
                    <Input 
                        name="email" 
                        label="Email Address" 
                        value={values.email} 
                        onChange={handleInputChange}
                        error={errors.email}
                    ></Input>
                    <Input 
                        name="phoneNumber" 
                        label="Phone Number" 
                        value={values.phoneNumber} 
                        onChange={handleInputChange}
                        error={errors.phoneNumber}
                    ></Input>
                </Grid>
                <Grid item xs={6}>
                    <Input 
                        name="title" 
                        label="Title" 
                        value={values.title} 
                        onChange={handleInputChange}
                        error={errors.title}
                    ></Input>
                    <Input 
                        name="department" 
                        label="Department" 
                        value={values.department} 
                        onChange={handleInputChange}
                        error={errors.department}
                    ></Input>
                    <Input 
                        name="city" 
                        label="City" 
                        value={values.city} 
                        onChange={handleInputChange}
                    ></Input>
                    <Select 
                        name="state" 
                        label="Select a State" 
                        value={values.state} 
                        onChange={handleInputChange} 
                        options={EmployeeService.getStatesObject()}
                    ></Select>
                </Grid>
                <Button 
                    color="primary" 
                    size="medium" 
                    text="Submit" 
                    variant="contained" 
                    type="submit"
                ></Button>
            </Grid>
        </Form>
    )
}

export default EmployeeForm;