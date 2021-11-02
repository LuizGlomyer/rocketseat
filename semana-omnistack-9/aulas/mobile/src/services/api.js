import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.0.9:3333', // url do servidor do expo e porta do servidor local (no caso, o pc)
})

export default api;