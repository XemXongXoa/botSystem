import axios from "axios";

export function sendData(data){
    axios.post(process.env.BASE_URL+"/send", data)
}