import axios from "axios"

export const fetchAdminUsers = async() => {
    const { data } = await axios.get(`https://localhost:7294/api/User`)
    return data
}

export const postAdminCreateUser = async(values) => {
    const { data } = await axios.post(`https://localhost:7294/api/Auth/CreateUser`,{...values,role:"User"})
    return data
}

export const deleteUsers = async(id) => {
    const { data } = await axios.delete(`https://localhost:7294/api/User?id=${id}`)
    return data
}

export const updateUsers = async(values) => {
    const { data } = await axios.put(`https://localhost:7294/api/User`,{...values,role:"User"})
    return data
}