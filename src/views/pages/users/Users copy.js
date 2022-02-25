// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import axios from 'axios'
// ** Table Data & Columns
// import {  columns } from './data'

// ** Add New Modal Component
import AddNewModal from './AddNewModal'
import EditNewModal from './EditNewModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { 
    ChevronDown, 
    Share, 
    Printer, 
    FileText, 
    File, 
    Grid, 
    Copy, 
    Plus, 
    MoreVertical, 
    Archive, 
    Trash, 
    Edit, 
    Cpu,
    Server,
    Activity,
    AlertOctagon, 
    User,
    UserCheck,
    UserX} from 'react-feather'


// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
  Badge,
  UncontrolledDropdown, 
  Modal, 
    ModalBody, 
    ModalHeader, 
    Form, FormGroup
} from 'reactstrap'
import Select, { components } from 'react-select'
import { selectThemeColors } from '@utils'
import Flatpickr from 'react-flatpickr'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import Avatar from '@components/avatar'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const MySwal = withReactContent(Swal)

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))

const DataTableWithButtons = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [editmodal, setEditModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [userData, setUserData] = useState([])
  const [editData, setEditData] = useState([])
  const [show, setShow] = useState(false)
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  const handleEditModal = () => setEditModal(!editmodal)

  const status = {
    1: { title: 'Account Owner', color: 'light-primary' },
    2: { title: 'Admin', color: 'light-success' },
    3: { title: 'Event Manager', color: 'light-danger' },
    4: { title: 'Crew Member', color: 'light-warning' },
    5: { title: 'Client', color: 'light-info' },
    6: { title: 'Watch Only', color: 'light-info' },
    7: { title: 'Presenter', color: 'light-info' }
  }

  const type = [
    { value: '1', label: 'Live', color: '#00B8D9', isFixed: true },
    { value: '2', label: 'Stage', color: '#0052CC', isFixed: true },
    { value: '3', label: 'Test', color: '#5243AA', isFixed: true }
  ]

  const UserDetails = (data) => {
    console.log(data)
    setEditData(data)
    handleEditModal()
  }
  
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

        const token = "eyJhbGciOiJIUzUxMiIsImlhdCI6MTY0NDM4MDg0MywiZXhwIjoxNjQ0OTg1NjQzfQ.eyJpZCI6NywidXNlcl9yb2xlIjoxfQ.IyzNMBX9p9vXn5mas5emwjzMgF2i6sVi7R74_A6RSqrSHB38SduYb2ub73zNh8jqTMCjHp-c_kJmm15USqomMA"

        axios({ 
          method: 'delete',
          url: `https://w-call-demo02.herokuapp.com/admin/delete_user/${row.id}`,
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
  const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']


  const columns = [
    {
      name: 'Name',
      selector: 'full_name',
      sortable: true,
      minWidth: '300px',
      cell: row => (
        <div className='d-flex align-items-center'>
          {/* {row.avatar === '' ? ( */}
            <Avatar color={`light-primary`} content={row.name} initials />
            {/* <Avatar color={`light-${states[row.status]}`} content={row.name} initials /> */}
          {/* ) : ( */}
            {/* <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} /> */}
          {/* )} */}
          <div className='user-info text-truncate ml-1'>
            <span className='d-block font-weight-bold text-truncate'>{row.name}</span>
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
      cell: row => {
        return (
          <Badge color={status[row.user_role].color} pill>
            {status[row.user_role].title}
          </Badge>
        )
      }
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={status[row.user_role].color} pill>
            {status[row.user_role].title}
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
                  {/* <DropdownItem className='w-100' onClick={() => setEditShow(true)}>Edit</DropdownItem> */}
                  <DropdownItem className='w-100' onClick={() => handleConfirmCancel()} >Delete</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
          // <div className='d-flex'>
            
          //   <Trash size={15} onClick={() => handleConfirmCancel(row)} style={{marginRight: '5px'}}/>
            
          //   {/* <Edit size={15} onClick={handleEditModal} /> */}
          //   <Edit size={15} onClick={() => UserDetails(row)} />
          // </div>
        )
      }
    }
  ]

  const listUsers = (pg) => {
    const token = "eyJhbGciOiJIUzUxMiIsImlhdCI6MTY0NTAxMzc0OSwiZXhwIjoxNjQ1NjE4NTQ5fQ.eyJpZCI6NywidXNlcl9yb2xlIjoxfQ.TS8qZBmNV8v_i_Xhs6w72jibwq23QxGz4BIvO_fdOoBylgA2oqOj6TvOUf4lrAYUIu6MgLDx6s0WATZ_2v-eiA"

    let data = []
    axios({ 
      method: 'get',
      url: `https://w-call-demo02.herokuapp.com/admin/list_users?page=${pg}&per_page=10`,
      headers: { 
                  ContentType : 'application/json', 
                  Authorization: `Token ${token}` 
                }
    })
    .then(response => {
      if (response.data.status === 200) {
        data = response.data
        setUserData(data)
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

  }

  useEffect(() => {
    listUsers(1)
  }, [])


  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = userData.data.filter(item => {
        const startsWith =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) 

        const includes =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) 

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
    console.log(page)
    setCurrentPage(page.selected)
    listUsers(page.selected + 1)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / 10 : userData.pagination.total / 10 || 1}
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

  return (
    <Fragment>
      <Row>
        {/* Stats With Icons Horizontal */}
        <Col lg='4' sm='6'>
          <StatsHorizontal icon={<User size={21} />} color='primary' stats='21,459' statTitle='Total Users' />
        </Col>
        <Col lg='4' sm='6'>
          <StatsHorizontal icon={<UserCheck size={21} />} color='success' stats='18,229' statTitle='Active Users' />
        </Col>
        <Col lg='4' sm='6'>
          <StatsHorizontal icon={<UserX size={21} />} color='warning' stats='378' statTitle='Pending Users' />
        </Col>
        {/* Stats With Icons Horizontal */}
      </Row>

      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Users</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            {/* <UncontrolledButtonDropdown>
              <DropdownToggle color='secondary' caret outline>
                <Share size={15} />
                <span className='align-middle ml-50'>Export</span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className='w-100'>
                  <Printer size={15} />
                  <span className='align-middle ml-50'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                  <FileText size={15} />
                  <span className='align-middle ml-50'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid size={15} />
                  <span className='align-middle ml-50'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File size={15} />
                  <span className='align-middle ml-50'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy size={15} />
                  <span className='align-middle ml-50'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown> */}
            <Button className='ml-2' color='primary' onClick={() => setShow(true)}>
              <Plus size={15} />
              <span className='align-middle ml-50'>Add Record</span>
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
                // value={rowsPerPage}
                // onChange={e => handlePerPage(e)}
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
          data={searchValue.length ? filteredData : userData.data}
          selectableRowsComponent={BootstrapCheckbox}
        />
      </Card>
      
      <AddNewModal open={show} setShow={setShow}></AddNewModal>
      {/* <EditNewModal open={editmodal} handleModal={handleEditModal} editData={editData} status={status}/> */}

    </Fragment>
  )
}

export default DataTableWithButtons
