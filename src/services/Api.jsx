import axios from "axios"

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')
    config.headers.token = token
    config.headers.refreshToken = refreshToken
    config.headers.authorization = `Bearer ${token}`
    return config
}, function (error) {
    return Promise.reject(error);
});

export const fetchAdminUsers = async () => {
    const { data } = await axios.get(`https://localhost:7294/api/User`)
    return data
}

export const postAdminCreateUser = async (values) => {
    const { data } = await axios.post(`https://localhost:7294/api/Auth/CreateUser`, { ...values, role: "User" })
    return data
}

export const deleteUsers = async (id) => {
    const { data } = await axios.delete(`https://localhost:7294/api/User?id=${id}`)
    return data
}

export const updateUsers = async (values) => {
    const { data } = await axios.put(`https://localhost:7294/api/User`, { ...values, role: "User" })
    return data
}

export const fetchMe = async () => {
    const { data } = await axios.get(`https://localhost:7294/api/Auth/AuthMe`)
    return data
}

export const fetchLogin = async (input) => {
    const { data } = await axios.post(`https://localhost:7294/api/Auth/login`, input)
    return data
}