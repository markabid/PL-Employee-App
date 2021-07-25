import { Paper, TableBody, TableCell, TableRow, Toolbar, InputAdornment } from "@material-ui/core";
import EmployeeForm from "./EmployeeForm";
import { makeStyles } from "@material-ui/core";
import useTable from "../../Components/useTable";
import * as EmployeeService from "../../Service/EmployeeService"
import { useState, useEffect } from "react";
import Input from "../../Components/Form Field/Input";
import { Search } from "@material-ui/icons";
import Button from "../../Components/Form Field/Button";
import AddIcon from '@material-ui/icons/Add';
import Modal from "../../Components/Modal";


const styles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchBar: {
        width: '30%'
    },
    createEmployeeBtn: {
        position: 'absolute',
        right: '10px'
    }
}));

const headerCells = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'phoneNumber', label: 'Phone Number' },
    { id: 'title', label: 'Title' },
    { id: 'department', label: 'Department' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State' },
    { id: 'buttons', label: 'Edit/Delete', disableSorting: true }
]

function Employees(){
    const classes = styles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(null)
    const [reloadEmployees, setReloadEmployees] = useState(0)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        EmployeeService.getAllEmployees().then((response)=>{
            setRecords(response.data);
    })}, [reloadEmployees]);

    const{
        TableContainer,
        TableHeader,
        TablePaging,
        pageSortRecords
    } = useTable(records, headerCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.lastName.toLowerCase().includes(target.value.toLowerCase()) 
                    || x.firstName.toLowerCase().includes(target.value.toLowerCase()) 
                    || x.email.toLowerCase().includes(target.value.toLowerCase())
                    || x.phoneNumber.toLowerCase().includes(target.value.toLowerCase())
                    || x.title.toLowerCase().includes(target.value.toLowerCase())
                    || x.department.toLowerCase().includes(target.value.toLowerCase())
                    || x.city.toLowerCase().includes(target.value.toLowerCase())
                    || x.state.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    const createEdit = (employee, resetForm) => {
        if (employee.id === 0){
            EmployeeService.createEmployee(employee).then((response)=>{
                setReloadEmployees(x => x+1)
            })
        }
        else{
            EmployeeService.updateEmployee(employee).then((response)=>{
                setReloadEmployees(x => x+1)
            })
        }
        resetForm()
        setRecordForEdit(null)
        setOpenModal(false)
    }

    const deleteEmployee = id => {
        EmployeeService.deleteEmployee(id).then((response)=>{
            setReloadEmployees(x => x+1)
        })
    }

    const openInModal = item => {
        setRecordForEdit(item)
        setOpenModal(true)
    }

    return(
        <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Input
                        label=""
                        className={classes.searchBar}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    ></Input>
                    <Button
                        text="Create Employee"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.createEmployeeBtn}
                        onClick={() => { setOpenModal(true); setRecordForEdit(null); }}
                    ></Button>
                </Toolbar>
                <TableContainer>
                    <TableHeader></TableHeader>
                    <TableBody>
                        {
                            pageSortRecords().map(item => 
                                (<TableRow key={item.id}>
                                    <TableCell>{item.firstName}</TableCell>
                                    <TableCell>{item.lastName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.phoneNumber}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>{item.city}</TableCell>
                                    <TableCell>{item.state}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            text="Edit"
                                            onClick={() => { openInModal(item) }}
                                        ></Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            text="Delete"
                                            onClick={() => { deleteEmployee(item.id) }}
                                        ></Button>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TableContainer>
                <TablePaging></TablePaging>
            </Paper>
            <Modal
                title="Create a New Employee"
                openModal={openModal}
                setOpenModal={setOpenModal}>
                <EmployeeForm
                    createEdit={createEdit}
                    recordForEdit={recordForEdit}
                ></EmployeeForm>
            </Modal>
        </>
    )
}

export default Employees;