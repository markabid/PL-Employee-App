import { Table, TableCell, TableRow, TableHead, TablePagination, makeStyles, TableSortLabel } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '700',
            color: theme.palette.primary.main,
        },
        '& tbody td': {
            fontWeight: '400',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        },
    },
}))

function useTable(records, headerCells, filterFn){
    const classes = useStyles();

    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const TableContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TableHeader = props => {

        const handleSort = cellId => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId)
        }

        return (<TableHead>
            <TableRow>
                {
                    headerCells.map(headerCell => (
                    <TableCell key={headerCell.id}
                        sortDirection={orderBy === headerCell.id ? order : false}>
                        {headerCell.disableSorting ? headerCell.label :           
                        <TableSortLabel
                            active={orderBy === headerCell.id}
                            direction={orderBy === headerCell.id ? order : 'asc'}                        
                            onClick = { () => {handleSort(headerCell.id)} }>
                            {headerCell.label}
                        </TableSortLabel>
                        }
                    </TableCell>))
                }
            </TableRow>
        </TableHead>)
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const TablePaging = () => (<TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={records ? records.length : 0 }
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
    ></TablePagination>)

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const pageSortRecords = () => {
        if(!records) return [];
        return stableSort(filterFn.fn(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }
    
    return {
        TableContainer,
        TableHeader,
        TablePaging,
        pageSortRecords
    }
}

export default useTable;