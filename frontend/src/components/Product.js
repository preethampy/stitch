import React, { act, useEffect, useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, LinearProgress } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Carousel, CarouselCaption, CarouselItem } from 'react-bootstrap';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material';
import { useTheme } from '@mui/material';

import request from '../utils/requests';
import { cartCount, cartMinusCount, cartPlusCount } from '../features/cartSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import { favCount } from '../features/favSlice';

export default function Product({ item, index, fetchAndSet, setSelectedProduct, selectedProduct, allProducts, setProducts }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(!open);
    };
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: 27,
            top: 22,
            borderRadius: 3,
            padding: '0 4px',
        },
    }));

    function handleFavorite(action, id) {
        request("POST", `users/${action}/favorite`, { id: id })
            .then((resp) => {
                fetchAndSet();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function addHandler(product) {
        request("POST", "cart/add", { item: product._id })
            .then((resp) => {
                var newProducts = [...allProducts];
                var final = newProducts.map((item, index) => {
                    if (product._id == item._id) {
                        item.inCart = true;
                        dispatch(cartPlusCount());
                        return item;
                    }
                    else {
                        return item;
                    }
                });
                setProducts(final);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function removeHandler(product) {
        request("POST", "cart/remove", { id: product._id })
            .then((resp) => {
                var newwProducts = [...allProducts];
                var final = newwProducts.map((item, index) => {
                    if (product._id == item._id) {
                        item.inCart = false;
                        dispatch(cartMinusCount());
                        return item;
                    }
                    else {
                        return item;
                    }
                });
                setProducts(final);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Grid xs={6} sm={6} md={4} lg={3} xl={3} key={index}>
            <StyledBadge badgeContent={item.tag} color={item.tag == "Sale" ? "primary" : item.tag == "Hot" ? "error" : "warning"} invisible={item.tag ? false : true} >
                <Card sx={{ maxWidth: 345, height: "auto" }}>
                    {item.isFavorite &&
                        <FavoriteIcon color='error' className='m-2' style={{ position: "absolute", cursor: "pointer" }} onClick={() => { handleFavorite("remove", item._id) }} />
                    }
                    {item.isFavorite == false &&
                        <FavoriteBorderIcon className='m-2' style={{ position: "absolute", cursor: "pointer" }} onClick={() => { handleFavorite("add", item._id) }} />
                    }
                    <CardMedia
                        sx={{ height: "auto", objectFit: "contain" }}
                        style={{ cursor: "pointer" }}
                        image={item.image}
                        component={"img"}
                        onClick={() => {
                            setSelectedProduct(item);
                            handleClose();
                        }}
                    />
                    <CardContent sx={{ height: 70 }}>
                        <Typography className='max-lines-head' gutterBottom variant="subtitle1" component="div">
                            {item.title}
                        </Typography>
                        <Typography className='max-lines' variant="body2" color="text.secondary">
                            {item.category}
                        </Typography>
                    </CardContent>
                    <Stack direction='horizontal' style={{ justifyContent: "space-between", width: "100%", height: 50, padding: 20, marginBottom: 10 }}>
                        <p className='m-0' style={{ fontWeight: "bold" }}>${item.price}</p>
                        {item.inCart &&
                            <Button
                                onClick={() => {
                                    removeHandler(item)
                                }}
                                size='small'
                                autoCapitalize={false}
                                variant='contained'
                                color='warning'
                                endIcon={<RemoveShoppingCartIcon />}>
                                Remove
                            </Button>
                        }
                        {!item.inCart &&
                            <Button
                                onClick={() => {
                                    addHandler(item)
                                }}
                                size='small'
                                autoCapitalize={false}
                                color='mydark'
                                variant='outlined'
                                endIcon={<AddShoppingCartIcon />}>
                                Add
                            </Button>
                        }
                    </Stack>
                </Card>
            </StyledBadge>
            {selectedProduct &&
                <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <CancelIcon style={{ alignSelf: "end" }} onClick={handleClose} />
                    <DialogTitle>
                        <Carousel>
                            {selectedProduct.images.map((img, index) => {
                                return <Carousel.Item>
                                    <CardMedia
                                        sx={{ height: "auto", objectFit: "contain" }}
                                        style={{ cursor: "pointer" }}
                                        image={img}
                                        component={"img"}
                                    />
                                </Carousel.Item>
                            })}
                        </Carousel>
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {selectedProduct.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {selectedProduct.description}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Stack direction='horizontal' gap={"3"} style={{ paddingRight: 15 }}>
                            <p className='m-0' style={{ fontWeight: "bold" }}>${selectedProduct.price}</p>
                            {selectedProduct.inCart &&
                                <Button
                                    onClick={() => { removeHandler(selectedProduct) }}
                                    size='small'
                                    autoCapitalize={false}
                                    variant='contained'
                                    color='warning'
                                    endIcon={<RemoveShoppingCartIcon />}>
                                    Remove
                                </Button>
                            }
                            {!selectedProduct.inCart &&
                                <Button
                                    onClick={() => { addHandler(selectedProduct) }}
                                    size='small'
                                    autoCapitalize={false}
                                    variant='outlined'
                                    endIcon={<AddShoppingCartIcon />}>
                                    Add
                                </Button>
                            }
                        </Stack>
                    </DialogActions>
                </Dialog>
            }
        </Grid>

    )
}
