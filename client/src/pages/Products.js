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

const useStyles = makeStyles(theme => ({
  root: {
    width: 100,
    margin: theme.spacing(3),
    justifyContent: "center",
    alignItems: "center",
    overflowX: "auto",
    overflowY: "auto"
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));

const createProduct = (id, name, qty, sku) => ({
    product_id: id, 
    product_name: name,
    qty: qty,
    sku: sku,
    isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
  return (
    <TableCell align="left">
        {row[name].toString()}
    </TableCell>
  );
};

class Products extends Component{
    constructor(){
        super();
        this.state = {
            products: [],
            editModal: {
                status: false,
                id: 0
            },
            curProduct: {},
            newQty: 0
        };
    }
    componentDidMount(){
        fetch('/products')
            .then(res => {
                console.log(res);
                return res.json()
             })
            .then(rows => { 
                var prod = [];
                console.log(rows);
                rows.forEach(row => {
                    console.log(row);
                    prod.push(createProduct(row.product_id, row.product_name, row.qty, row.sku));
                });
                this.setState({ products: prod });
             });
    }
    
    render(){
      const { classes } = this.props;
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
                            <Card elevation={8} minWidth='30vw'>
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
                                            Edit Product Details
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" component="h2">
                                                Product ID
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Input disabled value={this.state.editModal.id}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" component="h2">
                                                Product Name
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Input disabled value={this.state.curProduct.product_name}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" component="h2">
                                                Quantity
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Input defaultValue={this.state.curProduct.qty} onChange={e => this.setState({newQty: parseInt(e.target.value)})}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" component="h2">
                                                SKU
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Input disabled value={this.state.curProduct.sku}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button size='small' color='primary' onClick={() => {
                                                const requestOptions = {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ product_id: this.state.curProduct.product_id, quantity: this.state.newQty })
                                                };
                                                fetch('/update_products', requestOptions)
                                                this.setState({editModal: {id: 0, status: false}, curProduct: {}, newQty: 0});
                                                window.location.reload();
                                            }}>Update Values</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button size='small' color='primary' onClick={() => { this.setState({editModal: {id: 0, status: false}, curProduct: {}, newQty: 0})}}>Cancel</Button>
                                        </Grid>
                                    </Grid>
                                </div>
                                </CardContent>
                                {/* <CardActions>
                                </CardActions> */}
                            </CardActionArea>
                            </Card>
                        </div>
                </Modal>
            <Table aria-label="caption table">
              <caption>List of all Products, Quantity is Editable</caption>
              <TableHead>
                <TableRow>
                  <TableCell align="left"><b>Product ID</b></TableCell>
                  <TableCell align="left"><b>Product Name</b></TableCell>
                  <TableCell align="left"><b>Quantity</b></TableCell>
                  <TableCell align="left"><b>SKU</b></TableCell>
                  <TableCell align="left"><b>Edit</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { this.state.products.map(row => (
                  <TableRow key={row.product_id}>
                    <CustomTableCell {...{ row, name: "product_id" }} />
                    <CustomTableCell {...{ row, name: "product_name" }} />
                    <CustomTableCell {...{ row, name: "qty" }} />
                    <CustomTableCell {...{ row, name: "sku" }} />
                    <TableCell align="left"><IconButton onClick={() => {
                        console.log(row.product_id);
                        this.setState({ editModal: { status: true, id: row.product_id }, curProduct: row });
                    }}><EditIcon /></IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        );
    }
}

export default withStyles(useStyles)(Products);