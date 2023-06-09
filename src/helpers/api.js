import axios from "axios";
import { endpoint } from "../config/variables";


let Api =  axios.create({
  baseURL: endpoint,
  withCredentials: true,
  headers: {
    'Content-Type':'application/json',
    'Accept': 'application/json'
  }
});

Api.defaults.withCredentials = true;

export default Api;