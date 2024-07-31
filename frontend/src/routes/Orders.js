import React, { useEffect, useState } from 'react'
import request from '../utils/requests'
import { Link } from 'react-router-dom';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Grid, Button, Chip } from '@mui/material'
import Box from '@mui/material/Box';
import moment from 'moment';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Container, Stack } from 'react-bootstrap';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        request("post", "pay/get")
            .then((resp) => {
                console.log(resp.data)
                setOrders(resp.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    function GroupOrder({ item, index }) {
        return (
            <Grid container style={{ justifyContent: "center" }}>
                <Grid className='rounded shadow p-3' xs={12} sm={12} md={12} lg={8} xl={8}>
                    <Typography component="div" variant="subtitle2">
                        Order
                        <Typography component="div" variant="overline">
                            #{item._id}
                        </Typography>
                    </Typography>
                    {item.items.map((prod, index) => {
                        return <Box sx={{ display: 'flex' }} className="p-2">
                            <CardMedia
                                component="img"
                                sx={{ width: 100, objectFit: "contain" }}
                                image={prod.image}
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="subtitle1">
                                        {prod.title}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" component="div">
                                        {prod.category}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" component="div">
                                        x 1
                                    </Typography>
                                    <Typography variant="subtitle2" color="black" component="div">
                                        {prod.price}$
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Box>
                    })}
                    <Divider />
                    <div>
                        <Stack direction='horizontal' gap={"2"} style={{ justifyContent: "space-between" }}>
                            <Stack className='p-2'>
                                <Stack direction='horizontal' gap={"2"} className='p-2'>
                                    <Typography variant="subtitle2" color="black" component="div">
                                        Payment:
                                    </Typography>
                                    <Typography variant="subtitle2" color="black" component="div">
                                        {item.paymentStatus ? <Chip label="Paid" color='success' /> : item.failed ? <Chip label="Failed" color='error' /> : item.cancelled ? <Chip label="Cancelled" color='error' /> : <Chip label="Pending" color='warning' />}
                                    </Typography>
                                </Stack>
                                <Stack direction='horizontal' gap={"2"} className='p-2'>
                                    <Typography variant="subtitle2" color="black" component="div">
                                        Ordered on:
                                    </Typography>
                                    <Typography variant="subtitle2" color="black" component="div">
                                    { moment(new Date(item.createAt)).format('YYYY-MM-DD hh:mm A')}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack direction='horizontal' gap={"2"} className='p-2'>
                                <Typography variant="subtitle1" color="black" component="div">
                                    Total:
                                </Typography>
                                <Typography variant="subtitle1" color="black" component="div" fontWeight={"bolder"}>
                                    {item.amount/100}$
                                </Typography>
                            </Stack>
                        </Stack>
                    </div>
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            {orders.length == 0 &&
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                    <p>No orders yet !</p>
                </div>
            }
            {orders.length !== 0 &&
                <Stack gap={"5"}>
                    {orders.map((item, index) => (
                        <GroupOrder item={item} index={index} />
                    ))}
                </Stack>
            }
        </>
    )
}
