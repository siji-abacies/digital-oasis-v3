// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Plus, MoreVertical, Send, PlayCircle, Edit, Archive, Trash, XCircle, Folder } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors, getToken } from '@utils'

import {
  Card,
  CardHeader,
  CardTitle,
  Button, 
  UncontrolledDropdown, 
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col
} from 'reactstrap'

import AddAgenda from './components/AddAgenda'
import EditAgenda from './components/EditAgenda'
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
  const [total, setTotal] = useState(10)

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)
  const [picker, setPicker] = useState(new Date())
  const [basic, setBasic] = useState(new Date())
  const [count, setCount] = useState(1)
  const [data, setData] = useState([])
  const [presenters, setPresenters] = useState([])
  const [users, setUsers] = useState([])
  const [allowContent, setAllowContent] = useState(false)
  const [dataForEdit, setDataForEdit] = useState([])
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
        setTotal(response.data.pagination.total)

        setAllowContent(true)
        // setCreator(response.data.data.creator)
      } else if (response.data.status === 401) {
        history.push('/login')
      } else if (response.data.status === 404) {
        setAllowContent(true)
      }
      // console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
      // history.push('/login')
    })
  }
  
  const getPresenters = () => {
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/project/members/filter_by_role/${id}?user_role=4`,
      headers: { 
        Authorization: `Token ${getToken()}`
      }
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        const data = response.data.data
          const r = []
          data.forEach(element => {
            r.push({
              value: element.id,
              label: element.name
            })
          })
        setPresenters(r)
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

  const getUsers = () => {
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/project/members/filter_by_role/${id}`,
      headers: { 
        Authorization: `Token ${getToken()}`
      }
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        const data = response.data.data
          const r = []
          data.forEach(element => {
            r.push({
              value: element.id,
              label: element.name
            })
          })
        setUsers(r)
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

  const getDataForEdit = (data) => {
    console.log(data)
    setDataForEdit(data)
    // setEditShow(true)
    // const config = {
    //   method: 'get',
    //   url: `https://digital-oasis-dev.herokuapp.com/v3/project/agenda/get_for_edit/${id}/${data.id}?time_zone=Asia/Kolkata`,
    //   headers: { 
    //     Authorization: `Token ${getToken()}`
    //   }
    // }
    
    // axios(config)
    // .then(function (response) {
    //   console.log(response)
    //   if (response.data.status === 200) {
        
    //     setDataForEdit(response.data.data)
    //     // setEditShow(true)
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

  const editItem = (data) => {
    getDataForEdit(data)
    getPresenters()
    getUsers()
    setEditShow(true)
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
  
        // const token = "eyJhbGciOiJIUzUxMiIsImlhdCI6MTY0NDM4MDg0MywiZXhwIjoxNjQ0OTg1NjQzfQ.eyJpZCI6NywidXNlcl9yb2xlIjoxfQ.IyzNMBX9p9vXn5mas5emwjzMgF2i6sVi7R74_A6RSqrSHB38SduYb2ub73zNh8jqTMCjHp-c_kJmm15USqomMA"
  
        axios({ 
          method: 'delete',
          url: `https://digital-oasis-dev.herokuapp.com/project/agenda/${id}/${row.id}`,
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

  const agendaActions = (state, row) => {
    let url = ''
    if (state === 'running') {
      // /project/agenda/state/<int:project_id>/<int:agenda_id>?started=running
      url = `project/agenda/state/${id}/${row.id}?started=running`
    } else {
      url = `/project/agenda/state/${id}/${row.id}?started=terminated`
    }
    const config = {
      method: 'post',
      url: `https://digital-oasis-dev.herokuapp.com/v3/${url}`,
      headers: { 
        Authorization: `Token ${getToken()}`
      }
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        // const data = response.data.data
        //   const r = []
        //   data.forEach(element => {
        //     r.push({
        //       value: element.id,
        //       label: element.name
        //     })
        //   })
        // setUsers(r)
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
      selector: 'start_at',
      sortable: true,
      // minWidth: '150px'
      width: '150px'
    },
    {
      name: 'Length',
      selector: 'run_time_expected',
      sortable: true,
      // minWidth: '150px'
      width: '80px'
    },
    {
      name: 'Back Room',
      selector: 'pre_stage[0].name',
      sortable: true,
      // minWidth: '150px'
      width: '150px'
    },
    {
      name: 'Stage',
      selector: 'stage[0].name',
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
                <DropdownItem className='w-100' onClick={() => editItem(row)}>
                  <Edit size={15} />
                  <span className='align-middle ml-50'>Edit</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => handleConfirmCancel(row)}>
                  <Trash size={15} />
                  <span className='align-middle ml-50'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
              <PlayCircle size={18} style={{marginRight: '3px'}} onClick={() => agendaActions('running', row)}/>
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
    listAgenda(1, e.target.value)
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
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.description.toLowerCase().startsWith(value.toLowerCase()) 

        const includes =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase()) 

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
    listAgenda(page.selected + 1, rowsPerPage)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / rowsPerPage : total / rowsPerPage || 1}
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

  // const users = [
  //   { value: '1', label: 'Stella Ganderton', color: '#00B8D9', isFixed: true },
  //   { value: '2', label: 'Harmonia Nisius', color: '#0052CC', isFixed: true },
  //   { value: '3', label: 'Genevra Honeywood', color: '#5243AA', isFixed: true }
  // ]

  const addItem = () => {
    getPresenters()
    getUsers()
    setShow(true)
  }

  const teleprompter = () => {
    // getTeleprompter()
    setTeleShow(true)
  }

  console.log(data)
  return (
    <Fragment>
      {allowContent && (
         <>
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
      <AddAgenda show={show} setShow={setShow} presenters={presenters} users={users} />
      <EditAgenda show={editShow} setShow={setEditShow} presenters={presenters} users={users} ItemData={dataForEdit}/>
      <Teleprompter show={teleShow} setShow={setTeleShow}/>
      </>
      )}
    </Fragment>
  )
}

export default DataTableWithButtons
