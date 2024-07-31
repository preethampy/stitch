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
import Product from '../components/Product';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        fetchAndSet();
    }, []);

    async function fetchAndSet() {
        try {
            const productss = await request("POST", "products/get");
            const cart = await request("POST", "cart/get");
            const favs = await request("POST", "users/get/favorites");
            var productsData = productss.data;
            var favsData = favs.data.favorites;
            var cartData = cart.data;
            var cartCountNum = 0;
            var favCountNum = 0;
            productsData.forEach((item, index) => {
                const cartIndex = cartData.findIndex(i => i._id == item._id);
                if (cartIndex !== -1) {
                    item.inCart = true;
                    cartCountNum++;
                }
                else {
                    item.inCart = false;
                }

                if (favsData.indexOf(item._id) !== -1) {
                    item.isFavorite = true;
                    favCountNum++;
                }
                else {
                    item.isFavorite = false
                }
            });
            const cats = productsData.map((item, index) => item.category);
            const finalCats = [...new Set(cats)];
            setProducts(productsData);
            setCategories(finalCats);
            if(value == 0){
                setValue(finalCats[0]);
            }
            dispatch(cartCount({ count: cartCountNum }));
            dispatch(favCount({ count: favCountNum }));
            setIsReady(true);
        }
        catch (err) {
            console.log(err);
        }
    }

    if (isReady) {
        return <>
            <Tabs value={value} className='mb-3' variant='scrollable' onChange={handleChange} centered TabIndicatorProps={{ style: { backgroundColor: "black" } }} textColor='mydark' >
                {categories.map((cat, index) => {
                    return <Tab label={cat} value={cat} key={index} />
                })}
            </Tabs>
            <Grid container spacing={2}>
                {products.filter(i => i.category == value).map((item, index) => {
                    return <>
                        <Product
                            item={item}
                            index={index}
                            fetchAndSet={fetchAndSet}
                            setSelectedProduct={setSelectedProduct}
                            selectedProduct={selectedProduct}
                            allProducts={products}
                            setProducts={setProducts}
                        />
                    </>
                })}
            </Grid>
        </>
    }
    else {
        return (
            <Container style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                <LinearProgress />
            </Container>
        );

    }

}
