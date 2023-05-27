import React from 'react'
import Form from 'react-bootstrap/Form';
import { message } from 'antd'
import { Formik } from 'formik'
import { useMutation, useQueryClient } from 'react-query';
import validations from './validations'
import { updateUsers } from '../../../services/Api';

function AdminLecturerEdit({ modalData, handleCancel }) {
    const queryClient = useQueryClient()
    const updateMutation = useMutation(updateUsers, {
        onSuccess: () => {
            queryClient.refetchQueries("admin:users")
        }
    })

    const handleSubmit = (values) => {
        message.loading({ content: "Güncelleniyor", key: "user:update", duration: 3 })
        updateMutation.mutate({...values,id: modalData.id}, {
            onSuccess: () => {
                handleCancel()
               return message.success({ content: "Başarıyla Güncellendi", key: "user:update", duration: 3 })
            },
            onError: (data) => message.error({ content: `${data.response.data}`, key: "user:update", duration: 3 })
        })
    }

    return (
        <div>
            <Formik initialValues={{
                fullName: modalData.fullname,
                username: modalData.userName,
                email: modalData.email,
                password: "",
            }}
                validationSchema={validations}
                onSubmit={handleSubmit}
            >
                {
                    ({ errors, touched, handleChange, handleSubmit, handleBlur, values, isSubmitting }) => (
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mt-4 mb-3">
                                    <Form.Label>İsim</Form.Label>
                                    <Form.Control
                                        id='fullName'
                                        name='fullName'
                                        type="text"
                                        value={values.fullName}
                                        placeholder="İsim Giriniz"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.fullName && errors.fullName}
                                        isValid={!errors.fullName}
                                    />
                                    {touched.fullName && errors.fullName && <div className='text-danger'>{errors.fullName}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kullanıcı Adı</Form.Label>
                                    <Form.Control
                                        id='username'
                                        name='username'
                                        type="text"
                                        value={values.username}
                                        placeholder="Kullanıcı Adı Giriniz"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.username && errors.username}
                                        isValid={!errors.username}
                                    />
                                    {touched.username && errors.username && <div className='text-danger'>{errors.username}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        id='email'
                                        name='email'
                                        type="text"
                                        value={values.email}
                                        placeholder="Mail Giriniz"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && errors.email}
                                        isValid={!errors.email}
                                    />
                                    {touched.email && errors.email && <div className='text-danger'>{errors.email}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Şifre</Form.Label>
                                    <Form.Control
                                        id='password'
                                        name='password'
                                        type="password"
                                        value={values.password}
                                        placeholder="Şifre Giriniz"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.password && errors.password}
                                        isValid={touched.password && !errors.password}
                                    />
                                    {touched.password && errors.password && <div className='text-danger'>{errors.password}</div>}
                                </Form.Group>
                                <button type="submit" className='btn btn-light border'>Güncelle</button>
                            </Form>
                        </div>
                    )
                }
            </Formik>
        </div>
    )
}

export default AdminLecturerEdit