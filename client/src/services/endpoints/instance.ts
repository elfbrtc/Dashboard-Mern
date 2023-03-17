import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000",
    timeout : 1200
});

export default instance