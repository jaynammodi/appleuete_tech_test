import React, {Component} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles(theme => ({
  root: {
    width: 100,
    margin: theme.spacing(3),
    justifyContent: "center",
    alignItems: "center",
    overflowX: "auto",
    overflowY: "auto"
  },
  table: {
  },
  selectTableCell: {
  },
  tableCell: {
  },
  input: {
    width: 130,
    height: 40
  }
}));

const createCustomer = (id, name, address, phone, orders) => ({
    customer_id: id, 
    customer_name: name,
    customer_address: address,
    customer_phone: phone,
    orders: orders,
    isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  return (
    <TableCell align="left" className={classes.tableCell}>
        {row[name].toString()}
    </TableCell>
  );
};

class Customers extends Component{
    constructor(){
        super();
        this.state = {
            customers: []
        };
    }
    componentDidMount(){
        fetch('/api/customers')
            .then(res => {
                console.log(res);
                return res.json()
             })
            .then(rows => { 
                var cust = []
                console.log(rows);
                rows.forEach(row => {
                    console.log(row);
                    cust.push(createCustomer(row.customer_id, row.customer_name, row.customer_address, row.customer_phone, row.orders));
                });
                console.log(cust[0].orders.toString());
                this.setState({ customers: cust });
             });
    }

    
    render(){
      const { classes } = this.props;
        return (
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="caption table">
              <caption>A barbone structure table example with a caption</caption>
              <TableHead>
                <TableRow>
                  <TableCell align="left"><b>Customer ID</b></TableCell>
                  <TableCell align="left"><b>Customer Name</b></TableCell>
                  <TableCell align="left"><b>Address</b></TableCell>
                  <TableCell align="left"><b>Phone</b></TableCell>
                  <TableCell align="left"><b>Orders</b></TableCell>
                  <TableCell align="left"><b>More Info</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { this.state.customers.map(row => (
                  <TableRow key={row.customer_id}>
                    <CustomTableCell {...{ row, name: "customer_id" }} />
                    <CustomTableCell {...{ row, name: "customer_name" }} />
                    <CustomTableCell {...{ row, name: "customer_address" }} />
                    <CustomTableCell {...{ row, name: "customer_phone" }} />
                    <CustomTableCell {...{ row, name: "orders" }} />
                    <TableCell align="left">
                      <Link to={{ pathname: "/customer_orders?id=" + row.customer_id }}>
                          <InfoIcon/>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        );
    }
}

export default withStyles(useStyles)(Customers);