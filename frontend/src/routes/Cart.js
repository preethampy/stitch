import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Grid, Button } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import request from '../utils/requests';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { loadStripe } from '@stripe/stripe-js';
import { Container, Spinner } from 'react-bootstrap';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DeleteIcon from '@mui/icons-material/Delete';

const stripePromise = loadStripe("pk_test_51PXRUjJoQl4SAJZlwkG45S1sVc6AgOp60reYt7PbtJvdLwr5BUiJHWCuqx4SHGnlTsrcn5UvgX0rbtYif3qNQGm400UJj3plRw");

export default function Cart() {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [options, setOptions] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchAndSetCart();
    }, []);

    function fetchAndSetCart() {
        request("POST", "cart/get")
            .then((data) => {
                setCart(data.data);
                setTotal(data.data.reduce((total, obj) => Number(obj.price) + total, 0));
            })
            .catch((err) => {
                console.log(err)
            });
    }

    function remove(id) {
        request("POST", "cart/remove", { id: id })
            .then((resp) => {
                fetchAndSetCart();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    function CartItem({ item, index }) {
        return (<TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 100, objectFit: "contain" }}
                        image={item.image}
                        alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {item.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {item.category}
                            </Typography>
                            <DeleteIcon onClick={() => { remove(item._id) }} style={{ cursor: "pointer" }} fontSize='small' color='error' />
                        </CardContent>
                    </Box>
                </Box>
            </TableCell>
            <TableCell align="right">{item.price}$</TableCell>
            <TableCell align="right">x 1</TableCell>
            <TableCell align="right">{item.price}$</TableCell>
        </TableRow>)
    }

    function handlePayment() {
        setIsLoading(true);
        request("POST", "pay/checkout")
            .then((resp) => {
                setOptions({ clientSecret: resp.link });
                window.open(resp.link, "_self");
                setIsLoading(false);
            })
            .catch((err) => {
                console.log("Error: ", err);
                setIsLoading(false);

            })
    }

    return (
        <>
            <Grid container spacing={2} style={{ justifyContent: "center" }}>
                <Grid xs={12} sm={12} md={12} lg={10} xl={10}>
                    {cart.length !== 0 &&
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Product</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }} align="right">Price</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }} align="right">Quantity</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }} align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.map((item, index) => (
                                        <CartItem item={item} index={index} />
                                    ))}
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                        </TableCell>
                                        <TableCell style={{ fontWeight: "bold" }} align="right">Total:</TableCell>
                                        <TableCell style={{ fontWeight: "bolder", fontSize: 20 }} align="right">{total}$</TableCell>
                                        <TableCell align="right">
                                            {!isLoading &&
                                                <Button color='mydark' style={{color:"white"}} load variant="contained" size='small' autoCapitalize='false' endIcon={<AttachMoneyIcon />} onClick={handlePayment}>
                                                    Pay
                                                </Button>}
                                            {isLoading &&
                                                <Spinner />
                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                    {cart.length == 0 &&
                        <div style={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%, -50%)", textAlign:"center"}}>
                            <ProductionQuantityLimitsIcon fontSize='large' />
                            <Typography component="div" variant="subtitle1">
                                Your cart is empty !
                            </Typography>
                        </div>
                    }
                </Grid>
            </Grid>
        </>)
}
