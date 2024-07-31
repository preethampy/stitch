import React, { useEffect, useState } from 'react'
import { Container, Stack, Row, Col, Card as BCard } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import store from '../app/store';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthDetails } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Root(props) {
    const {count} = useSelector(state => state.cart);
    const favCount = useSelector(state => state.fav);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return <>
        <Stack className='m-3' direction='horizontal' style={{ justifyContent: "space-between" }}>
            <Link className='lobster-regular' style={{ textDecoration: "none", color: "black", fontSize:28 }} to={"/shop"}>Stitch</Link>
            <div>
                <Stack direction='horizontal' gap={"3"}>
                    <Link style={{ textDecoration: "none", color: "black" }} to={"/orders"}>Orders</Link>
                    {/* <Link style={{ textDecoration: "none", color: "black" }} to={"/project"}>About</Link> */}
                    <Link style={{ textDecoration: "none", color: "black" }} to={"/favorites"}>
                        <Badge badgeContent={favCount.count} color="warning" componentsProps={{badge:{style:{backgroundColor:"black"}}}}> 
                            <FavoriteIcon color="error" />
                        </Badge>
                    </Link>
                    <Link style={{ textDecoration: "none", color: "black" }} to={"/cart"}>
                        <Badge badgeContent={count} color="warning" componentsProps={{badge:{style:{backgroundColor:"black"}}}}>
                            <ShoppingCartIcon  />
                        </Badge>
                    </Link>
                    <Link style={{ textDecoration: "none", color: "black" }} onClick={()=>{
                        dispatch(setAuthDetails({ jwt: null, name: null }))
                        localStorage.removeItem("jwt");
                        localStorage.removeItem("name");
                        navigate("/login")
                    }}><LogoutIcon /></Link>
                </Stack>
            </div>
        </Stack>
        <Container>
            {props.children}
        </Container>
    </>
}
