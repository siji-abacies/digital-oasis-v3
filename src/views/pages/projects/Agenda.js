// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// ** Table Data & Columns
// import { data, columns } from '../data'

// ** Add New Modal Component
// import AddNewModal from './AddNewModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, MoreVertical, Send, PlayCircle, Edit, Archive, Trash, XCircle, Folder } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import Select, { components } from 'react-select'
import { selectThemeColors, getToken } from '@utils'

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

import Avatar from '@components/avatar'
import Flatpickr from 'react-flatpickr'

import Repeater from '@components/repeater'
import { SlideDown } from 'react-slidedown'
import AddAgenda from './components/AddAgenda'
import EditAgendaModal from './modal/EditAgendaModal'
import Teleprompter from './components/Teleprompter'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// ** Bootstrap Checkbox Component
// const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
//   <div className='custom-control custom-checkbox'>
//     <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
//     <label className='custom-control-label' onClick={onClick} />
//   </div>
// ))

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const data = [
  {
    responsive_id: '',
    id: 1,
    avatar: '10.jpg',
    name: "Pre Show 1",
    description: "Lemon drops ice cream wafer gummies dragée. Chocolate bar liquorice cheesecake cookie chupa chups marshmallow oat cake biscuit.",
    email: 'kocrevy0@thetimes.co.uk',
    city: 'Krasnosilka',
    start_time: '09/23/2016 10AM',
    salary: '$23896.35',
    age: '61',
    experience: '1 Year',
    status: 2,
    group:'Group 1',
    length: '30 Mins', 
    back_room: 'Green Room', 
    stage: 'Stage 1'
  },
  {
    responsive_id: '',
    id: 1,
    avatar: '10.jpg',
    name: "Pre Show 1",
    description: "Lemon drops ice cream wafer gummies dragée. Chocolate bar liquorice cheesecake cookie chupa chups marshmallow oat cake biscuit.",
    email: 'kocrevy0@thetimes.co.uk',
    city: 'Krasnosilka',
    start_time: '09/23/2016 10AM',
    salary: '$23896.35',
    age: '61',
    experience: '1 Year',
    status: 2,
    group:'Group 1',
    length: '30 Mins', 
    back_room: 'Green Room', 
    stage: 'Stage 1'
  },
  {
    responsive_id: '',
    id: 1,
    avatar: '10.jpg',
    name: "Pre Show 1",
    description: "Lemon drops ice cream wafer gummies dragée. Chocolate bar liquorice cheesecake cookie chupa chups marshmallow oat cake biscuit.",
    email: 'kocrevy0@thetimes.co.uk',
    city: 'Krasnosilka',
    start_time: '09/23/2016 10AM',
    salary: '$23896.35',
    age: '61',
    experience: '1 Year',
    status: 2,
    group:'Group 1',
    length: '30 Mins', 
    back_room: 'Green Room', 
    stage: 'Stage 1'
  },
  {
    responsive_id: '',
    id: 1,
    avatar: '10.jpg',
    name: "Pre Show 1",
    description: "Lemon drops ice cream wafer gummies dragée. Chocolate bar liquorice cheesecake cookie chupa chups marshmallow oat cake biscuit.",
    email: 'kocrevy0@thetimes.co.uk',
    city: 'Krasnosilka',
    start_time: '09/23/2016 10AM',
    salary: '$23896.35',
    age: '61',
    experience: '1 Year',
    status: 2,
    group:'Group 1',
    length: '30 Mins', 
    back_room: 'Green Room', 
    stage: 'Stage 1'
  }
]

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Rejected', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
}

const stage = [
  { value: '1', label: 'Room 1' },
  { value: '2', label: 'Room 2' },
  { value: '3', label: 'Room 3' },
  { value: '4', label: 'Room 4' },
  { value: '5', label: 'Room 5' }
]

const DataTableWithButtons = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const [show, setShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [teleShow, setTeleShow] = useState(false)
  
  const [setPrevilege, setShowPrevilege] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(7)

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)
  const [picker, setPicker] = useState(new Date())
  const [basic, setBasic] = useState(new Date())
  const [count, setCount] = useState(1)
  const [data, setData] = useState([])
  const [presenters, setPresenters] = useState([])

  const listAgenda = () => {
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/project/agenda/paginated_list/${id}?time_zone=Asia/Kolkata&page=1&per_page=10`,
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

  // ** Table Common Column
  const columns = [
    {
      name: 'Item Name',
      selector: 'name',
      sortable: true,
      width: '150px'
      // minWidth: '30px'
    },
    {
      name: 'Item Description',
      selector: 'description',
      sortable: true,
      // minWidth: '250px'
      width: '150px'
    },
    {
      name: 'Start Time',
      selector: 'start_time',
      sortable: true,
      // minWidth: '150px'
      width: '150px'
    },
    {
      name: 'Length',
      selector: 'length',
      sortable: true,
      // minWidth: '150px'
      width: '80px'
    },
    {
      name: 'Back Room',
      selector: 'back_room',
      sortable: true,
      // minWidth: '150px'
      width: '150px'
    },
    {
      name: 'Stage',
      selector: 'stage',
      sortable: true,
      // minWidth: '150px'
      width: '150px'
    },
    {
      name: 'Actions',
      width: '150px',
      allowOverflow: true,
      cell: row => {
        return (
          <div className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                  <Send size={15} />
                  <span className='align-middle ml-50'>Send Mail</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => setEditShow(true)}>
                  <Edit size={15} />
                  <span className='align-middle ml-50'>Edit</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => handleConfirmCancel(row)}>
                  <Trash size={15} />
                  <span className='align-middle ml-50'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
              <PlayCircle size={18} style={{marginRight: '3px'}}/>
              <XCircle size={18} style={{marginRight: '3px'}}></XCircle>
              <Folder size={18} />
            </UncontrolledDropdown>

          </div>
        )
      }
    }
  ]

 // ** Get data on mount
 useEffect(() => {
   listAgenda()
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
      updatedData = data.filter(item => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase())

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

  const getPresenters = () => {
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/project/presenter/get_all/${id}`,
      headers: { 
        Authorization: `Token ${getToken()}`
      }
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        
        setPresenters(response.data.data)
        // setAllowContent(true)
        // setCreator(response.data.data.creator)
      } else if (response.data.status === 401) {
        history.push('/login')
      } else if (response.data.status === 404) {
        // setAllowContent(true)
      }
      // console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
      // history.push('/login')
    })
  }

  const addItem = () => {
    getPresenters()
    setShow(true)
  }

  const teleprompter = () => {
    // getTeleprompter()
    setTeleShow(true)
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Schedules</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            
            <Button className='ml-2' color='primary' onClick={() => teleprompter()}>
              <Plus size={15} />
              <span className='align-middle ml-50'>Add/Edit Teleprompter</span>
            </Button>
            <Button className='ml-2' color='primary' onClick={() => addItem()}>
              <Plus size={15} />
              <span className='align-middle ml-50'>Add Item</span>
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
      <AddAgenda show={show} setShow={setShow}/>
      <EditAgendaModal show={editShow} setShow={setEditShow}></EditAgendaModal>
      <Teleprompter show={teleShow} setShow={setTeleShow}/>
      
    </Fragment>
  )
}

export default DataTableWithButtons
