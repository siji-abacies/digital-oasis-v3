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
  CardBody, 
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

// import '@styles/react/libs/flatpickr/flatpickr.scss'

// import 'uppy/dist/uppy.css'
// import '@uppy/status-bar/dist/style.css'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Styles
// import '@styles/react/apps/app-users.scss'
// import { toast, Slide } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import TimezoneSelect from 'react-timezone-select'
import {getToken} from '@utils'
import { Slide, toast } from 'react-toastify'

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
  const [selectedTimezone, setSelectedTimezone] = useState({})
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
  
  const getTimeZone = () => {
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/settings/time_zone`,
      headers: { 
        Authorization: `Token ${token}`
      }
      // data : data
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        setSelectedTimezone(response.data.data.zone)
        // setUserList(response.data)
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
    getTimeZone()
    // dispatch(
    //   getData({
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     q: searchValue
    //   })
    // )
  }, [dispatch])
  
  const { register, errors, handleSubmit, control } = useForm()
      
  const onSubmit = data => {
    // console.log(data)
    console.log(selectedTimezone)
    if (selectedTimezone && selectedTimezone.label !== undefined) {
      console.log(selectedTimezone.label)
      const label = selectedTimezone.label.split(' ')
      let val = label[0].slice(1, -1)
      val = val.replace('GMT', '')
      // console.log(label, val)
      const d = {
        zone: selectedTimezone.value,
        value: val
      }
      // {"zone": "Asia/Kolkata", "value": "+5:30"}
      console.log(d)
  
      const config = {
        method: 'put',
        url: 'https://digital-oasis-dev.herokuapp.com/v3/settings/time_zone',
        headers: { 
          ContentType: 'application/json',
          Authorization: `Token ${token}`
        }, 
        data : d
      }
        
      axios(config)
      .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        // getProjectList(1)
        // setShow(false)
        toast.success(
        <ToastContent message='Timezone Successfully Added' />,
          { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        } else if (response.data.status === 409) {
          toast.success(
          <ToastContent message={response.data.message} />,
            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        }
          // console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
        // history.push('/login')
      })
    }
    

  }

  return (
    <Fragment>
      <h1 className='mb-1'>Settings</h1>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Timezone Settings</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
          </div>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <TimezoneSelect
                    name='timezone'
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                    // control={control} 
                    innerRef={register({ required: false })}
                    invalid={errors.timezone && true}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color='primary' type='submit'>
                    <span className='align-middle ml-50'>Save</span>
            </Button>
          </Form>
        
        </CardBody>
       
      </Card>
     
      {/* <AddNewModal open={modal} handleModal={handleModal} /> */}
    </Fragment>
  )
}

export default DataTableWithButtons
