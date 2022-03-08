// ** React Imports
import { Link, useHistory } from 'react-router-dom'

import { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"

// ** Utils
import { getToken, selectThemeColors } from '@utils'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, MoreVertical, Edit, Archive, Trash, X, User, UserCheck, UserX, Database, Settings } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import Select, { components } from 'react-select'

import {
  Card,
  CardHeader,
  CardTitle,
  Button, 
  UncontrolledDropdown, 
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col, 
  Badge
} from 'reactstrap'

import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

import Avatar from '@components/avatar'
import Flatpickr from 'react-flatpickr'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import thumbnailGenerator from '@uppy/thumbnail-generator'

import AddUserModal from './components/AddUserModal'
import EditUserModal from './components/EditUserModal'

import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const MySwal = withReactContent(Swal)

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const status = {
  active: { title: 'Active', color: 'light-success' },
  pending: { title: 'Pending', color: 'light-warning' }
  // true: { title: 'Active', color: 'light-success' },
  // false: { title: 'InActive', color: 'light-warning' }
}

const DataTableWithButtons = () => { 
  const history = useHistory()

  const token = getToken()
  const [userCountList, setUserCountList] = useState([])
  const [userList, setUserList] = useState([])
  const [userData, setUserData] = useState([])
  
  const dispatch = useDispatch()

  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const [show, setShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [setPrevilege, setShowPrevilege] = useState(false)

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)
  const [picker, setPicker] = useState(new Date())
  const [count, setCount] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)

  const increaseCount = () => {
    setCount(count + 1)
  }

  const getUserCount = () => {
    const config = {
      method: 'get',
      url: 'https://digital-oasis-dev.herokuapp.com/v3/user/get_count',
      headers: { 
        Authorization: `Token ${token}`
      }
      // data : data
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        
        setUserCountList(response.data.data)
        console.log(response.data.data)
        // console.log(userCountList)
      } else if (response.data.status === 401) {
        history.push('/login')
      }
      console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
      history.push('/login')
    })
  }

  const getUserList = (page) => {
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/admin/list_users?page=${page}&per_page=10`,
      headers: { 
        Authorization: `Token ${token}`
      }
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        
        setUserList(response.data)
      } else if (response.data.status === 401) {
        history.push('/login')
      }
      // console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
      history.push('/login')
    })
  }

  // ** Get data on mount
  useEffect(() => {
    getUserCount()
    getUserList(1)
    
  }, [dispatch])
  
  // ** Function to handle per page
  const handlePerPage = e => {
    // dispatch(
    //   getData({
    //     page: currentPage,
    //     perPage: parseInt(e.target.value),
    //     q: searchValue
    //   })
    // )
    setRowsPerPage(parseInt(e.target.value))
  }

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    
  })
  
  const handleConfirmCancel = (row) => {
    // console.log(row)
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
  
        // const token = "eyJhbGciOiJIUzUxMiIsImlhdCI6MTY0NDM4MDg0MywiZXhwIjoxNjQ0OTg1NjQzfQ.eyJpZCI6NywidXNlcl9yb2xlIjoxfQ.IyzNMBX9p9vXn5mas5emwjzMgF2i6sVi7R74_A6RSqrSHB38SduYb2ub73zNh8jqTMCjHp-c_kJmm15USqomMA"
  
        axios({ 
          method: 'delete',
          url: `https://digital-oasis-dev.herokuapp.com/v3/admin/delete_user/${row.id}`,
          headers: { 
                      ContentType : 'application/json', 
                      Authorization: `Token ${token}` 
                    }
          
        })
        .then(response => {
          console.log(response)
          if (response.data.status === 200) {
            getUserList(1)
            getUserCount()
            MySwal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'User has been deleted.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            })
            
          } else if (response.data.status > 200 && response.data.status > 299) {
            // this.showToast("warning", response.data.message)
          } else throw response.data
        })
        .catch(error => {
          console.log(error)
          if (error && error.status === 401) {
              // this.setState({areaLoading: false})  
              // this.showToast("error", error.message)
              // localStorage.removeItem('authProject');
          }
          if (error) {
              // this.setState({areaLoading: false})  
              // this.showToast("error", error.message)
          } else {
              // this.setState({areaLoading: false})  
              // this.showToast("error", error.message)
          }
        })
  
        
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'User Delete Cancelled',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  const role = {
    1: { title: 'System Admin', color: 'light-success' },
    2: { title: 'Crew', color: 'light-warning' },
    3: { title: 'Client', color: 'light-primary' }
  }

  // ** Renders Role Columns
  const renderRole = row => {
    const roleObj = {
      
      1: {
        title: 'System Admin',
        class: 'text-success',
        icon: Database
      },
      3: {
        title: 'Client',
        class: 'text-primary',
        icon: User
      },
      2: {
        title: 'Crew',
        class: 'text-warning',
        icon: Settings
      }
    }

    const Icon = roleObj[row.user_role] ? roleObj[row.user_role].icon : Edit2

    return (
      <span className='text-truncate text-capitalize align-middle'>
        <Icon size={18} className={`${roleObj[row.user_role] ? roleObj[row.user_role].class : ''} mr-50`} />
        {roleObj[row.user_role].title}
      </span>
    )
  }

  const getUserData = row => {
    setUserData(row)
    setEditShow(true)
    //     setEditShow(true)
    // console.log("test")
    // cons/ole.log(row)
    // const config = {
    //   method: 'get',
    //   url: `https://digital-oasis-dev.herokuapp.com/v3/user/get_for_edit/${row.id}`,
    //   headers: { 
    //     Authorization: `Token ${token}`
    //   }
    //   // data : data
    // }
    
    // axios(config)
    // .then(function (response) {
    //   console.log(response)
    //   if (response.data.message === 'Success') {
    //     setUserData(response.data.data)
    //     setEditShow(true)
    //     // setUserList(response.data)
    //     // console.log(response.data.data)
    //     // console.log(userCountList)
    //   }
    //   console.log(JSON.stringify(response.data))
    // })
    // .catch(function (error) {
    //   console.log(error)
    // })
  }

  // ** Table Common Column
  const columns = [
  {
    name: 'Name',
    selector: 'first_name',
    sortable: true,
    minWidth: '300px',
    cell: row => (
      <div className='d-flex align-items-center'>
        {row.avatar === null ? (
          <Avatar color={`light-${states[row.is_active]}`} content={row.first_name + row.last_name} initials />
        ) : (
          <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
        )}
        <div className='user-info text-truncate ml-1'>
          <span className='d-block font-weight-bold text-truncate'>{row.first_name}&nbsp;{row.last_name}</span>
          <small>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Role',
    selector: 'user_role',
    sortable: true,
    minWidth: '250px',
    cell: row => renderRole(row)
  },
  {
    name: 'Status',
    selector: 'registered',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      console.log(row)
      let active = 'pending'
      console.log(active, status[`${active}`].color)

      if (row.registered === true && row.invited === true) {
        active = 'active'
      } else {
        active = 'pending'
      }
      console.log(active, status[`${active}`].color)
      
      return (
        <Badge color={status[`${active}`].color} pill>
          {status[`${active}`].title}
        </Badge>
      )
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
                  <DropdownItem className='w-100' onClick={() => getUserData(row)}>Edit</DropdownItem>
                  {/* <DropdownItem className='w-100' onClick={() => setEditShow(true)}>Edit</DropdownItem> */}
                  <DropdownItem className='w-100' onClick={() => handleConfirmCancel(row)} >Delete</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }
]
  

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true,
    restrictions: { maxNumberOfFiles: 1 }
    // restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ['image/*'] }
  })

  // uppy.use(Uppy.Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
  // /user/edit_user_details/<user_id>
  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    const arr = previewArr
    arr.push(preview)
    setPreviewArr([...arr])
  })

  uppy.on('complete', (result) => {
    console.log(result)
    const img = result.successful
    const d = img[0].data
    console.log(img[0].data)
    // const encode_img = JSON.stringify(img[0].data)
    // console.log(encode_img)

    const token = "eyJhbGciOiJIUzUxMiIsImlhdCI6MTY0NDM4MDg0MywiZXhwIjoxNjQ0OTg1NjQzfQ.eyJpZCI6NywidXNlcl9yb2xlIjoxfQ.IyzNMBX9p9vXn5mas5emwjzMgF2i6sVi7R74_A6RSqrSHB38SduYb2ub73zNh8jqTMCjHp-c_kJmm15USqomMA"

    const formData = new FormData()
    formData.append('file', img[0].data)

    const body1 = {
      file: img[0].data
      // file: d
    }

    // console.log(formData)
    // console.log(body1)
    // console.log(body1.file)
    // const config = {
    //   method: 'put',
    //   url: `https://w-call-demo02.herokuapp.com/user/edit_user_details/7`,
    //   headers: { 
    //     // AccessControlAllowOrigin: '*',
    //     // ContentType: 'application/json',
    //     ContentType: 'multipart/form-data',
    //     Authorization: `Token ${token}`
    //   }
    //   // data: body1.file
    //   // file: body1
    //   // body1
      
    // }

    // axios(config, formData)
    // .then(function (response) {
    //   console.log(response)
    //   // data = response.data
    //   // setUserData(data)
    //   // handleModal()
    // })
    // .catch(function (error) {
    //   console.log(error)
    // })


    console.log('successful files:', result.successful)
    console.log('failed files:', result.failed)
  })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    const status = {
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

    if (value.length) {
      
      updatedData = userList.data.filter(item => {
        console.log(item)
        const startsWith =
          item.first_name.startsWith(value) ||
          item.last_name.startsWith(value) ||
          item.email.startsWith(value) 

        const includes =
          item.first_name.includes(value) ||
          item.last_name.includes(value) ||
          item.email.includes(value)

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
    getUserList(page.selected + 1)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / 10 : userList.pagination.total / 10 || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      pageLinkClassName='page-link'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  const userRoles = [
    { value: '1', label: 'System Admin', color: '#00B8D9', isFixed: true },
    { value: '2', label: 'Client', color: '#0052CC', isFixed: true },
    { value: '3', label: 'Crew', color: '#5243AA', isFixed: true }
  ]

  const users = [
    { value: '1', label: 'Stella Ganderton', color: '#00B8D9', isFixed: true },
    { value: '2', label: 'Harmonia Nisius', color: '#0052CC', isFixed: true },
    { value: '3', label: 'Genevra Honeywood', color: '#5243AA', isFixed: true }
  ]

  return (
    <Fragment>
      <Row>
        {/* Stats With Icons Horizontal */}
        <Col lg='4' sm='6'>
          <StatsHorizontal icon={<User size={21} />} color='primary' stats={ (userCountList && userCountList.total) || '0'} statTitle='Total Users' />
        </Col>
        <Col lg='4' sm='6'>
          <StatsHorizontal icon={<UserCheck size={21} />} color='success' stats={ (userCountList && userCountList.active) || '0'} statTitle='Active Users' />
        </Col>
        <Col lg='4' sm='6'>
          <StatsHorizontal icon={<UserX size={21} />} color='warning' stats={ (userCountList && userCountList.pending) || '0'} statTitle='Pending Users' />
        </Col>
        {/* Stats With Icons Horizontal */}
      </Row>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>User List</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            
            <Button className='ml-2' color='primary' onClick={() => setShow(true)}>
              <Plus size={15} />
              <span className='align-middle ml-50'>Add New User</span>
            </Button>
            
          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col sm='6'>
            <div className='d-flex align-items-center mt-1 mb-1'>
              <Label for='sort-select'>show</Label>
              <Input
                className='dataTable-select'
                type='select'
                id='sort-select'
                value={rowsPerPage}
                onChange={e => handlePerPage(e)}
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              {/* <Label for='sort-select'>entries</Label> */}
            </div>
          </Col>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          selectableRows
          columns={columns}
          paginationPerPage={10}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : userList.data}
          selectableRowsComponent={BootstrapCheckbox}
        />
      </Card>
      <AddUserModal 
        show={show} 
        setShow={setShow} 
        userList={getUserList} 
        userCount={getUserCount}
      />
      <EditUserModal 
        show={editShow} 
        setShow={setEditShow} 
        userData={userData} 
        userList={getUserList} 
        userCount={getUserCount}
      />
    </Fragment>
  )
}

export default DataTableWithButtons
