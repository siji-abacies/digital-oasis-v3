// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, MoreVertical, Edit, Archive, Trash, X, User, UserCheck, UserX, Database, Settings } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

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
  Badge,
  Modal, 
  ModalBody, 
  ModalHeader, 
  ModalFooter,
  Form, 
  FormGroup, 
  CustomInput
} from 'reactstrap'

import '@styles/react/libs/flatpickr/flatpickr.scss'

import AddNewModal from './AddNewModal'
import EditNewModal from './EditNewModal'
// import EditPresenterModal from './modal/EditPresenterModal'

import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { toast, Slide } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const ToastContent = ({ name = null, message = null }) => (
  <>
  {name !== null && (
  <Fragment>
      <div className='toastify-header'>
      <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
          <h6 className='toast-title fw-bold'>Welcome, {name}</h6>
      </div>
      </div>
      <div className='toastify-body'>
      <span>You have successfully logged in!</span>
      </div>
  </Fragment>
  )}
  {message !== null && (
  <Fragment>
      <div className='toastify-header'>
      <div className='title-wrapper'>
          {/* <Avatar size='sm' color='success' icon={<Coffee size={12} />} /> */}
          <h6 className='toast-title fw-bold'>{message}</h6>
      </div>
      </div>
      <div className='toastify-body'>
      {/* <span>You have successfully logged in as an user to Vuexy. Now you can start to explore. Enjoy!</span> */}
      </div>
  </Fragment>
  )}
  </>
)

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
  true: { title: 'Active', color: 'light-success' },
  false: { title: 'InActive', color: 'light-warning' }
}

const DataTableWithButtons = () => {
  const history = useHistory()
  const token = localStorage.getItem('token')
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

  const deleteForm = e => {
    e.preventDefault()
    const slideDownWrapper = e.target.closest('.react-slidedown'),
      form = e.target.closest('form')
    if (slideDownWrapper) {
      slideDownWrapper.remove()
    } else {
      form.remove()
    }
  }

  const PERMISSIONS = [
    { value: 1, label: 'Create Project'}, 
    { value: 2, label: 'Clock Manager'}, 
    { value: 3, label: 'Add Clients'}, 
    { value: 4, label: 'Add Presenters'}, 
    { value: 5, label: 'Add Crew'}, 
    { value: 6, label: 'Schedule Builder'}, 
    { value: 7, label: 'Room Builder'}, 
    { value: 8, label: 'Layout Editor'}, 
    { value: 9, label: 'Share Room'}, 
    { value: 10, label: 'Presenter'}, 
    { value: 11, label: 'MultiRoom'}, 
    { value: 12, label: 'System Startup'}, 
    { value: 13, label: 'System Shutdown'}, 
    { value: 14, label: 'IFB'}, 
    { value: 15, label: 'Agenda Control'} 
    
  ]
  
  const getUserList = (page) => {
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/permission/group/list_paginated_group?page=${page}&per_page=10`,
      headers: { 
        Authorization: `Token ${token}`
      }
      // data : data
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.message === 'Success') {
        
        setUserList(response.data)
        // console.log(response.data.data)
        // console.log(userCountList)
      }
      console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
      history.push('/login')
    })
  }

  // ** Get data on mount
  useEffect(() => {
    getUserList(1)
    // dispatch(
    //   getData({
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     q: searchValue
    //   })
    // )
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
    // defaultValues: {
    //   username: selectedUser.name,
    //   // lastName: selectedUser.fullName.split(' ')[1],
    //   // firstName: selectedUser.fullName.split(' ')[0]
    //   // username: 'Test',
    //   lastName: 'LastName',
    //   firstName: 'First name'
    // }
  })
  
  const handleConfirmCancel = (row) => {
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
          url: `https://digital-oasis-dev.herokuapp.com/v3/permission/group/${row.id}`,
          headers: { 
                      ContentType : 'application/json', 
                      Authorization: `Token ${token}` 
                    }
          
        })
        .then(response => {
          console.log(response)
          if (response.data.status === 200) {
            MySwal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            })
            getUserList(1)
            
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
          text: 'Group Delete Cancelled',
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
    // const roleObj = {
      
    //   1: {
    //     title: 'System Admin',
    //     class: 'text-success',
    //     icon: Database
    //   },
    //   3: {
    //     title: 'Client',
    //     class: 'text-primary',
    //     icon: User
    //   },
    //   2: {
    //     title: 'Crew',
    //     class: 'text-warning',
    //     icon: Settings
    //   }
    // }

    // const Icon = roleObj[row.user_role] ? roleObj[row.user_role].icon : Edit2
    const r = row.permissions.map(p => p.name)
    const reducedArray = row.permissions.reduce((id, gp) => `${id}${gp.name}, `, '')
    const abc = reducedArray.substring(0, reducedArray.length - 1)
    console.log(r, reducedArray)
    console.log(abc)
    return (
       
      <span className='text-truncate text-capitalize align-middle'>
        {reducedArray.slice(0, -1)}
     
      </span>
    )
  }

  const getUserData = row => {
    console.log(row)
    // console.log()
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
    name: 'Group Name',
    selector: 'name',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Privileges',
    sortable: true,
    minWidth: '250px', 
    selector: 'permissions[0].name',
    cell: row => renderRole(row)
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
              <DropdownItem className='w-100' onClick={() => getUserData(row)}>
                <Edit size={15} />
                <span className='align-middle ml-50'>Edit</span>
              </DropdownItem>
              <DropdownItem className='w-100' onClick={() => handleConfirmCancel(row)}>
                <Trash size={15} />
                <span className='align-middle ml-50'>Delete</span>
              </DropdownItem>

            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }
]

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
        const startsWith = 
          item.name.toLowerCase().startsWith(value)
          // status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.name.toLowerCase().includes(value)
          // PERMISSIONS[item.permissions[0]].label.includes(value)
          

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
      breakClassName='page-item'
      breakLinkClassName='page-link'
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
      <h1 className='mb-1'>Tag Management</h1>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Tag Group List</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            
            <Button className='ml-2' color='primary' onClick={() => setShow(true)}>
              <Plus size={15} />
              <span className='align-middle ml-50'>New Group</span>
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
          // selectableRows
          columns={columns}
          paginationPerPage={10}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : userList.data}
          // selectableRowsComponent={BootstrapCheckbox}
        />
      </Card>
      <AddNewModal show={show} setShow={setShow} userList={getUserList} permissions={PERMISSIONS} ToastContent={ToastContent}></AddNewModal>
      <EditNewModal show={editShow} setShow={setEditShow} userData={userData} userList={getUserList} permissions={PERMISSIONS} ToastContent={ToastContent}></EditNewModal>
      {/* <EditPresenterModal show={editShow} setShow={setEditShow}></EditPresenterModal> */}
      
     
      {/* <AddNewModal open={modal} handleModal={handleModal} /> */}
    </Fragment>
  )
}

export default DataTableWithButtons
