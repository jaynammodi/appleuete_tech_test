import React, {Component} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import { Card, CardActionArea, CardContent, Input } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@mui/material/Divider";

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

const createOrder = (order_id, customer_id, order_date, status, productids, products) => ({
    order_id: order_id, 
    customer_id: customer_id,
    order_date: order_date,
    status: status,
    productids: productids,
    products:  products,
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

class Orders extends Component{
    constructor(){
        super();
        this.state = { 
            orders: [],
            editModal: {
                status: false,
                id: 0
            },
            curOrder: {},
            newStatus: "",
            curProd: {},
            newQty: 0,
            newProds:[],
        };
    }
    componentDidMount(){
        fetch('/orders')
            .then(res => {
                console.log(res);
                return res.json()
             })
            .then(rows => { 
                var ord = [];
                console.log(rows);
                rows.forEach(row => {
                    console.log(row);
                    var prodids = [];
                    var prods = [];
                    row.products.forEach(prod => {
                        prodids.push(prod.product_id);
                        prods.push(prod);
                    });
                    ord.push(createOrder(row.order_id, row.customer_id, row.order_date, row.status, prodids, prods));
                });
                this.setState({ orders: ord });
             });
    }
    
    render(){
      const { classes } = this.props;
      var products_clone = this.state.curOrder.products;
        return (
            <Paper className={classes.root}>
                <Modal
                    open={this.state.editModal.status}
                    onClose={() => { this.setState({editModal: {id: 0, status: false}})}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}>
                            {(this.state.editModal.status) ? <>
                            <Card elevation={8} style={{overflow: 'scroll', maxHeight: '80%'}}>
                            <CardActionArea>
                                <CardContent>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '30vw',
                                }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Edit Order Details
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" component="h2">
                                                Order ID
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Input disabled value={this.state.editModal.id}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" component="h2">
                                                Customer ID
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Input disabled value={this.state.curOrder.customer_id}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" component="h2">
                                                Order Date
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Input disabled value={this.state.curOrder.order_date}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" component="h2">
                                                Status
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Select
                                                id="demo-simple-select"
                                                onChange={(e) => {
                                                    this.setState({newStatus: e.target.value});
                                                }}
                                                defaultValue={this.state.curOrder.status}
                                                label="Status"
                                                autoWidth
                                            >
                                                <MenuItem value='Pending'>Pending</MenuItem>
                                                <MenuItem value='Delivered'>Delivered</MenuItem>
                                                <MenuItem value='Cancelled'>Cancelled</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider light />
                                            <Typography variant="h6" component="h2">
                                                Product Details
                                            </Typography>
                                            <Divider light />
                                        </Grid>
                                        {this.state.curOrder.products.map(ordered_product => {
                                            return (
                                                <>
                                                <Grid item xs={6}>
                                                    <Typography variant="h6" component="h2">
                                                        Product ID
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Input disabled value={ordered_product.product_id}/>    
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="h6" component="h2">
                                                        SKU
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Input disabled value={ordered_product.sku}/>    
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="h6" component="h2">
                                                        Quantity
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Input defaultValue={ordered_product.qty} onChange={(e) => {
                                                        products_clone[this.state.curOrder.products.indexOf(ordered_product)].qty = e.target.value;
                                                        this.setState({newProds: products_clone});
                                                    }}/>    
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider light />
                                                </Grid>
                                                </>
                                            );
                                        })}
                                        <Grid item xs={6}>
                                            <Button size='small' color='primary' onClick={() => {
                                                const requestOptions = {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ order_id: this.state.curOrder.order_id, status: (this.state.newStatus !== "" ? this.state.newStatus : this.state.curOrder.status), products: (this.state.newProds.length !== 0 ? this.state.newProds : this.state.curOrder.products) })
                                                };
                                                fetch('/update_order', requestOptions)
                                                this.setState({editModal: {id: 0, status: false}, curOrder: {}, newQty: 0,  newStatus: "", curProd: {}, newProds:[]});
                                                window.location.reload();
                                            }}>Update Values</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button size='small' color='primary' onClick={() => { this.setState({editModal: {id: 0, status: false}, curOrder: {}, newQty: 0,  newStatus: "", curProd: {}, newProds:[]})}}>Cancel</Button>
                                        </Grid>
                                    </Grid>
                                </div>
                                </CardContent>
                                {/* <CardActions>
                                </CardActions> */}
                            </CardActionArea>
                            </Card>
                            </> : <></>}
                        </div>
                </Modal>
            <Table className={classes.table} aria-label="caption table">
              <caption>Open Edit Modal for more Information regarding the orders and to edit Order Status & Product Quantities</caption>
              <TableHead>
                <TableRow>
                    <TableCell align="left"><b>Order ID</b></TableCell>
                    <TableCell align="left"><b>Customer ID</b></TableCell>
                    <TableCell align="left"><b>Order Date</b></TableCell>
                    <TableCell align="left"><b>Status</b></TableCell>
                    <TableCell align="left"><b>Products</b></TableCell>
                    <TableCell align="left"><b>Edit</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { this.state.orders.map(row => (
                  <TableRow key={row.order_id}>
                    <CustomTableCell {...{ row, name: "order_id"} } />
                    <CustomTableCell {...{ row, name: "customer_id"} } />
                    <CustomTableCell {...{ row, name: "order_date"} } />
                    <CustomTableCell {...{ row, name: "status"} } />
                    <CustomTableCell {...{ row, name: "productids"} } />
                    <TableCell align="left"><IconButton onClick={() => {
                        console.log(row.products);
                        this.setState({ editModal: { status: true, id: row.order_id }, curOrder: row });
                    }}><EditIcon /></IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        );
    }
}

export default withStyles(useStyles)(Orders);