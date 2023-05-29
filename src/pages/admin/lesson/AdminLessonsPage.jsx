import React from 'react'
import { Table, Space, Popconfirm, message, Modal } from 'antd'
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { deleteLesson, fetchAdminLessons } from '../../../services/Api';
import AdminAddLesson from '../../../components/admin/lesson/AdminAddLesson';

function AdminLessonsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery("admin:lessons", fetchAdminLessons)
    const showModal = () => {
        setIsModalOpen(true);
    };

    const deleteMutation = useMutation(deleteLesson,
        {
            onSuccess: () => {
                queryClient.refetchQueries("admin:lessons")
            }
        }
    )

    const handleRemove = (record) => {
        deleteMutation.mutate(record.lessonId, {
            onSuccess: () => message.success({ content: "Ders Silindi", key: "admin:lesson:delete", duration: 3 }),
            onError: (error) => message.error({ content: `${error}`, key: "admin:lesson:delete", duration: 3 }),
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    if (isLoading) return <div className='d-flex h-75 justify-content-center align-items-center'><div className="spinner-border" /></div>

    if (error) return 'Hata: ' + error.message

    const lessons = data.data
    const columns = [
        {
            title: 'İsim',
            dataIndex: 'lecturerName',
            key: 'lecturerName',
        },
        {
            title: 'Dönem',
            dataIndex: 'periodName',
            key: 'periodName',
        },
        {
            title: 'Ders Kodu',
            dataIndex: 'lessonCode',
            key: 'lessonCode',
        },
        {
            title: 'Ders Adı',
            dataIndex: 'lessonName',
            key: 'lessonName',
        },
        {
            title: "Sil",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Dersi Sil"
                        description="Dersi silmek istediğinize emin misiniz?"
                        onConfirm={()=>handleRemove(record)}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <a href="#" className="text-decoration-none">Sil</a>
                    </Popconfirm>
                </Space>
            )
        }
    ]
    return (
        <div className='d-sm-flex flex-column p-3 p-sm-5 pt-sm-3'>
            <div className='text-center text-sm-end'>
                <button className='btn btn-primary mx-0 mx-sm-5' onClick={showModal} >Yeni Ders Ekle</button>
            </div>
            <Table className='mt-3 mx-0 mx-sm-5' dataSource={lessons} columns={columns} rowKey="lessonId" size="small" />
            <Modal title="Ders Ekleme" open={isModalOpen} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel} cancelText="Kapat">
                <AdminAddLesson handleCancel={handleCancel} />
            </Modal>
        </div>
    )
}

export default AdminLessonsPage