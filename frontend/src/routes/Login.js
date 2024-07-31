import { Container, Stack, Form, Button } from "react-bootstrap"
import toast, { Toaster } from 'react-hot-toast';
import request from "../utils/requests";
import { useDispatch } from "react-redux";
import { setAuthDetails } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../src/assets/bg.png';
import { Typography } from "@mui/material";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault()
    const uname = e.target.username.value;
    const password = e.target.password.value;
    request("post", "users/login", {
      "username": uname,
      "password": password
    }).then((resp) => {
      dispatch(setAuthDetails({ jwt: resp.data.jwt, name: resp.data.username }))
      localStorage.setItem("jwt", resp.data.jwt);
      localStorage.setItem("name", resp.data.username);
      navigate("/shop")
    }).catch((err) => {
      toast.error(err.response.data.message);
    })
  }
  return <>
  <div style={{
      backgroundImage: `url(${backgroundImage})`,
      width: '100%',
      height: '100vh',
      alignContent:"center"
    }}>
      <Toaster />
      <Stack className="shadow-lg p-3 mb-5 rounded " style={{
        width: "20%",
        minWidth: "300px",
        backgroundColor: "white",
        margin:"auto"
      }}>
        <h3 style={{ color: "" }}>Login</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="" style={{ color: "" }}>Username</Form.Label>
            <Form.Control
            className=''
            style={{backgroundColor:""}}
             size="sm" type="text" name="username" placeholder="Enter username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="" style={{ color: "" }}>Password</Form.Label>
            <Form.Control
            style={{backgroundColor:""}}
            className=''
            size="sm" type="password" name="password" placeholder="Password" />
          </Form.Group>
          <div style={{ textAlign: "center" }}>
            <Button
              size="sm"
              variant="primary"
              type="submit"
              className=""
              style={{ backgroundColor: "black", color: "white", borderColor: "black" }}>
              Login
            </Button></div>
            <div style={{ textAlign: "center" }}>
              <Button onClick={()=>{navigate("/signup");}} size="sm" style={{color:"black"}} variant="link">Signup</Button>
              </div>
        </Form>
      </Stack>
    </div>
  </>
}