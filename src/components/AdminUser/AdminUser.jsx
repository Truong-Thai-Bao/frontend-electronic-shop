import { Button, Form, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import ModalComponent from '../ModalComponent/ModalComponent'
import { getBase64 } from '../../utils'
import * as message from '../../components/Message/Message'
import { useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import { useIsFetching, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons' // Thêm PlusOutlined

const AdminUser = () => {
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    avatar: '',
    address: ''
  })

  const [form] = Form.useForm();
  const queryClient = useQueryClient()

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    return res
  }
  
  const { data: users, isLoading: isLoadingUsers } = useQuery({ 
      queryKey: ['users'], 
      queryFn: getAllUsers,
      enabled: !!user?.access_token 
  })

  const fetchGetDetailsUser = async (rowSelected) => {
    setIsLoadingUpdate(true)
    try {
        const res = await UserService.getDetailsUser(rowSelected, user?.access_token)
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                isAdmin: res?.data?.isAdmin,
                address: res?.data?.address,
                avatar: res.data?.avatar
            })
        }
    } catch (error) {
        console.error("Lỗi lấy chi tiết user:", error)
        message.error("Không thể lấy thông tin người dùng")
    } finally {
        setIsLoadingUpdate(false)
    }
  }

  const handleDetailsProduct = (id) => {
    if(!id) return; // Chặn nếu ID rỗng
    setRowSelected(id)
    setIsOpenDrawer(true)
    fetchGetDetailsUser(id)
  }

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id, token, ...rests } = data
      const res = UserService.updateUser(id, { ...rests }, token)
      return res
    },
  )

  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id, token } = data
      const res = UserService.deleteUser(id, token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids } = data
      const res = UserService.deleteManyUser(ids, token)
      return res
    },
  )

  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany

  const renderAction = (record) => {
    return (
      <div style={{display: 'flex', gap: '10px'}}>
        <DeleteOutlined 
            style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }} 
            onClick={() => { setRowSelected(record._id); setIsModalOpenDelete(true) }} 
        />
        <EditOutlined 
            style={{ color: 'orange', fontSize: '24px', cursor: 'pointer' }} 
            onClick={() => handleDetailsProduct(record._id)} // Truyền thẳng ID
        />
      </div>
    )
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      filters: [
        { text: 'True', value: true },
        { text: 'False', value: false }
      ],
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => renderAction(record) 
    },
  ];

  const dataTable = users?.data?.length > 0 ? users?.data?.map((user) => {
    return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' }
  }) : []

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
      queryClient.invalidateQueries(['users'])
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDeleted])

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      message.success()
      queryClient.invalidateQueries(['users'])
    } else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isSuccessDeletedMany])

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCloseDrawer()
      queryClient.invalidateQueries(['users'])
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: '', email: '', phone: '', isAdmin: false, avatar: '', address: ''
    })
    form.resetFields()
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const handleDeleteUser = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
        onSettled: () => queryClient.invalidateQueries(['users'])
    })
  }

  const handleDelteManyUsers = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
        onSettled: () => queryClient.invalidateQueries(['users'])
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview
    })
  }
  
  const onUpdateUser = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails }, {
        onSettled: () => queryClient.invalidateQueries(['users'])
    })
  }

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      

      <div style={{ marginTop: '20px' }}>
        <TableComponent 
            handleDelteMany={handleDelteManyUsers} 
            columns={columns} 
            isLoading={isLoadingUsers} 
            data={dataTable} 
        />
      </div>

      <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <InputComponent value={stateUserDetails['email']} onChange={handleOnchangeDetails} name="email" />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input your phone!' }]}>
              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
              <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
            </Form.Item>
            <Form.Item label="Avatar" name="avatar" rules={[{ required: true, message: 'Please input your image!' }]}>
              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button >Select File</Button>
                {stateUserDetails?.avatar && (
                  <img src={stateUserDetails?.avatar} style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover', marginLeft: '10px' }} alt="avatar" />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">Apply</Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa tài khoản này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminUser