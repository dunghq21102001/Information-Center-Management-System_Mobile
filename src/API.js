import axios from "axios"
import axiosInstance from "./AxiosInstance";


export default class API {
    static BASE_URL = 'https://kidproeduservicesv2.azurewebsites.net/api'

    static login(data) {
        return axios.post(`${this.BASE_URL}/User/Login`, data)
    }

    static changePass(data) {
        return axios.put(`${this.BASE_URL}/User/ChangePassword`, data)
    }

    static getEquipment() {
        return axiosInstance.get(`${this.BASE_URL}/Equipment/Equipments`)
    }

    static getEquipmentById(id) {
        return axiosInstance.get(`${this.BASE_URL}/Equipment/${id}`)
    }

    static borrowEquipment(data) {
        return axiosInstance.post(`${this.BASE_URL}/Equipment/EquipmentBorrowedManagement`, data)
    }

    static returnEquipment(data) {
        return axiosInstance.post(`${this.BASE_URL}/Equipment/EquipmentReturnedManagement`, data)
    }

    static repairEquipment(data) {
        return axiosInstance.post(`${this.BASE_URL}/Equipment/EquipmentRepairManagement`, data)
    }

    static getTeacherList() {
        return axios.get(`${this.BASE_URL}/User/UserByRoleId/d5fa55c7-315d-4634-9c73-08dbbc3f3a53`)
    }

    static getEquipmentByStatus(status) {
        return axiosInstance.get(`${this.BASE_URL}/Equipment/EquipmentsByStatus/${status}`)
    }

    static logEquipmentById(id) {
        return axiosInstance.get(`${this.BASE_URL}/LogEquipment/LogEquipmentsByEquipment/${id}`)
    }
}