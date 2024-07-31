import React, { useEffect } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';
import { Container, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import request from '../utils/requests';
export default function Success() {
    const navigate = useNavigate();
    useEffect(()=>{
      request("POST", "cart/clear",)
      .then((resp) => {

      })
      .catch((err) => {
          console.log(err);
      })
    },[])
  return (
   <Container>
    <Stack style={{alignItems:"center"}}>
        <CheckCircleIcon color='success' sx={{ fontSize: 80 }}/>
        <h3>Your order has been placed</h3>
        <p>You can view your orders by following the link below</p>
        <Button variant='contained' color='success' style={{textTransform:"none"}} onClick={()=>{navigate("/orders")}}>Orders</Button>
    </Stack>
   </Container>
  )
}
