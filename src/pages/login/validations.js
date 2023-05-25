import * as yup from 'yup'

const validations = yup.object().shape({
    password: yup
    .string()
    .min(5,"Parolanız En Az 5 Karakter Olmalıdır")
    .required("Zorunlu Bir Alan"),
    userName: yup
    .string()
    .required("Zorunlu Bir Alan"),
})

export default validations;