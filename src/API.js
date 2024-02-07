import axios from "axios"

export default class API {
    static BASE_URL = 'https://localhost:7221/api'

    static login(data) {
        return axios.post(`${this.BASE_URL}/User/Login`, data)
    }
}