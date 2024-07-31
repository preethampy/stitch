import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthDetails } from "../features/authSlice";
import { backend } from "../config";
import { jwtDecode } from "jwt-decode";
import store from "../app/store";
import moment from "moment/moment";

export default function request(method, url, data) {
    console.log(method,url,data)
    const authDetails = store.getState()
    const decoded = authDetails.auth.jwt !== null ? jwtDecode(authDetails.auth.jwt) : null;
    return new Promise((resolve, reject) => {
        axios
            .request({
                url: backend + url,
                method: method,
                headers: authDetails.auth.jwt !== null ? {
                    'Authorization': `Bearer ${authDetails.auth.jwt}`
                } : {},
                data: data !== undefined ? data : {}
            }).then((resp) => {
                resolve(resp.data)
            }).catch((err) => {
                reject(err)
            })
    })
}