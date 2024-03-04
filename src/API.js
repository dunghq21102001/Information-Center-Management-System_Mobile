import axios from "axios"

export default class API {
    static BASE_URL = 'https://kidproeduappservices.azurewebsites.net/api'

    static login(data) {
        return axios.post(`${this.BASE_URL}/User/Login`, data)
    }

    static changePass(data) {
        return axios.put(`${this.BASE_URL}/User/ChangePassword`, data)
    }

    static getEquipment() {
        return axios.get(`${this.BASE_URL}/Equipment/Equipments`)
    }
}