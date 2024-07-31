import { Container, Stack, Form, Button } from "react-bootstrap"
import toast, { Toaster } from 'react-hot-toast';
import request from "../utils/requests";
import { useDispatch } from "react-redux";
import { setAuthDetails } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../src/assets/bg.png';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault()
    const uname = e.target.username.value;
    const password = e.target.password.value;
    request("post", "users/register", {
      "username": uname,
      "password": password
    }).then((resp) => {
      toast.success("Signup success, redirecting to login now!");
      setTimeout(()=>{
        navigate("/login");
      },3000)
    }).catch((err) => {
      toast.error(err.response.data.error);
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
        <h3 className="" style={{ color: "" }}>Signup</h3>
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
            className=''
            style={{backgroundColor:""}}
            size="sm" type="password" name="password" placeholder="Password" />
          </Form.Group>
          <div style={{ textAlign: "center" }}>
            <Button
              size="sm"
              variant="primary"
              type="submit"
              className=""
              style={{ backgroundColor: "black", color: "white", borderColor: "black" }}>
              Signup
            </Button></div>
            <div style={{ textAlign: "center" }}>
              <Button onClick={()=>{navigate("/login");}} size="sm" style={{color:"black"}} variant="link">Login</Button>
              </div>
        </Form>
      </Stack>
    </div>
  </>
}