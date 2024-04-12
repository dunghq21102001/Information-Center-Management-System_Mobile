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

    static getEquipmentById(id) {
        return axios.get(`${this.BASE_URL}/Equipment/${id}`)
    }

    static borrowEquipment(data) {
        return axios.post(`${this.BASE_URL}/Equipment/EquipmentBorrowedManagement`, data)
    }

    static returnEquipment(data) {
        return axios.post(`${this.BASE_URL}/Equipment/EquipmentReturnedManagement`, data)
    }

    static getTeacherList() {
        return axios.get(`${this.BASE_URL}/User/UserByRoleId/d5fa55c7-315d-4634-9c73-08dbbc3f3a53`)
    }
}