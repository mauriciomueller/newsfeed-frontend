import axios from "axios"

export const backendApi = axios.create({
	baseURL: "http://localhost/api/v1/",
	withCredentials: true,
})