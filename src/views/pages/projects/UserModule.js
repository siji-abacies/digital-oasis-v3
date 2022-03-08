// ** React Imports
import { Fragment, useState, useEffect, forwardRef } from 'react'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, MoreVertical, Edit, Archive, Trash } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import Select, { components } from 'react-select'
import { selectThemeColors, getToken} from '@utils'

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
  FormGroup
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '@components/avatar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AddMember from './components/AddMember'
import EditMember from './components/EditMember'
import AddPrivilege from './components/AddPrivilege'
import moment from 'moment'

import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
const MySwal = withReactContent(Swal)
// ** Bootstrap Checkbox Component
// const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
//   <div className='custom-control custom-checkbox'>
//     <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
//     <label className='custom-control-label' onClick={onClick} />
//   </div>
// ))

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const role = {
  1: {
    title: 'System Admin',
    class: 'text-success'
    // icon: Database
  },
  3: {
    title: 'Client',
    class: 'text-primary'
    // icon: User
  },
  2: {
    title: 'Crew',
    class: 'text-warning'
    // icon: Settings
  }
}

const DataTableWithButtons = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(7)

  const [show, setShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [setPrivilege, setShowPrivilege] = useState(false)
  const [dataforEdit, setDataForEdit] = useState([])
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const getDataForEdit = (data) => {
    console.log(data)
    setDataForEdit(data)
    setEditShow(true)
    // const config = {
    //   method: 'get',
    //   url: `https://digital-oasis-dev.herokuapp.com/v3/project/get_for_single_edit/${data.id}?time_zone=Asia/Kolkata`,
    //   headers: { 
    //     Authorization: `Token ${token}`
    //   }
    // }
    
    // axios(config)
    // .then(function (response) {
    //   console.log(response)
    //   if (response.data.status === 200) {
        
    //     setDataForEdit(response.data.data)
    //     setEditShow(true)
    //   } else if (response.data.status === 401) {
    //     history.push('/login')
    //   }
    //   // console.log(JSON.stringify(response.data))
    // })
    // .catch(function (error) {
    //   console.log(error)
    //   // history.push('/login')
    // })
  }
  
  const handleConfirmCancel = (item) => {
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
          url: `https://w-call-demo02.herokuapp.com/project/members/${id}?members=${item.id}`,
          headers: { 
                      ContentType : 'application/json', 
                      Authorization: `Token ${getToken()}` 
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
  
  // ** Table Common Column
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      minWidth: '250px',
      cell: row => (
        <div className='d-flex align-items-center'>
          {row.avatar === null ? (
            <Avatar color={`light-${states[row.status]}`} content={row.name} initials />
          ) : (
            <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
          )}
          <div className='user-info text-truncate ml-1'>
            <span className='d-block font-weight-bold text-truncate'>{row.name}</span>
            <small>{role[row.user_role].title}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      minWidth: '250px'
    },
    {
      name: 'Privilege Groups',
      selector: 'group',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Updated',
      selector: 'updated_at',
      sortable: true,
      minWidth: '150px',
      cell : row => (
        moment(row.updated_at).format("MM/D/yy")
      )
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
                <DropdownItem className='w-100' onClick={() => getDataForEdit(row)}>
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

  const getProjectMembers = () => {
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/project/members/paginated_list/${id}?time_zone=Asia/Kolkata`,
      headers: { 
        Authorization: `Token ${getToken()}`
      }
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        
        setData(response.data.data)
        // setCreator(response.data.data.creator)
      } else if (response.data.status === 401) {
        history.push('/login')
      }
      // console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
      // history.push('/login')
    })
  }

  // ** Get data on mount
  useEffect(() => {
    getProjectMembers()
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

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    console.log(data)
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
      updatedData = data.filter(item => {
        const startsWith =
          item.name.toLowerCase().startsWith(value) ||
          item.email.toLowerCase().startsWith(value)
          // item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          // status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.name.toLowerCase().includes(value) ||
          item.email.toLowerCase().includes(value) 
          // ||
          // item.post.toLowerCase().includes(value.toLowerCase()) ||
          // item.email.toLowerCase().includes(value.toLowerCase()) ||
          // item.age.toLowerCase().includes(value.toLowerCase()) ||
          // item.salary.toLowerCase().includes(value.toLowerCase()) ||
          // item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          // status[item.status].title.toLowerCase().includes(value.toLowerCase())

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
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / 7 : data.length / 7 || 1}
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

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>User List</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            
            <Button className='ml-2' color='primary' onClick={() => setShow(true)}>
              <Plus size={15} />
              <span className='align-middle ml-50'>Add Users</span>
            </Button>
            <Button className='ml-2' color='primary' onClick={() => setShowPrivilege(true)}>
              <Plus size={15} />
              <span className='align-middle ml-50'>Add Privilege</span>
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
          paginationPerPage={7}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : data}
          // selectableRowsComponent={BootstrapCheckbox}
        />
      </Card>
      <AddMember show={show} setShow={setShow} getProjectMembers={getProjectMembers} />
      <EditMember show={editShow} setShow={setEditShow} getProjectMembers={getProjectMembers} memberData={dataforEdit} role={role}/>
      <AddPrivilege show={setPrivilege} setShow={setShowPrivilege} getProjectMembers={getProjectMembers}/>
      
      {/* <AddNewModal open={modal} handleModal={handleModal} /> */}
    </Fragment>
  )
}

export default DataTableWithButtons
