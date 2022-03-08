// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { MoreVertical, Plus, Trash, Edit } from 'react-feather'
import AvatarGroup from '@components/avatar-group'
import { Link, useHistory } from 'react-router-dom'
import AddProject from './components/AddProject'
import EditProject from './components/EditProject'

// ** Utils
import { getToken, selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Button,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Badge,
  UncontrolledDropdown, 
  CardText, 
  CardBody, 
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap'

import { useForm } from 'react-hook-form'
import Select, { components } from 'react-select'
import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import thumbnailGenerator from '@uppy/thumbnail-generator'

import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import moment from 'moment'
import ReactPaginate from 'react-paginate'

const MySwal = withReactContent(Swal)
const type = {
  1: { value: '1', label: 'Live', color: '#00B8D9', isFixed: true },
  2: { value: '2', label: 'Live To Tape', color: '#0052CC', isFixed: true },
  3: { value: '3', label: 'Record Only', color: '#5243AA', isFixed: true }
}

  // { value: '1', label: 'Live', color: '#00B8D9', isFixed: true },
  // { value: '2', label: 'Live To Tape', color: '#0052CC', isFixed: true },
  // { value: '3', label: 'Record Only', color: '#5243AA', isFixed: true }
// ]

const ToastContent = ({ message = null }) => (
  
  
  <>
  {message !== null && (
  <Fragment>
      <div className='toastify-header'>
      <div className='title-wrapper'>
          {/* <Avatar size='sm' color='warning' icon={<Coffee size={12} />} /> */}
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

const Projects = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const token = getToken()
  const [projectList, setProjectList] = useState([])
  const [show, setShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  
  const [picker, setPicker] = useState(new Date())

  const [color, setColor] = useState('#3cd6bf')
  const [colorPkr, setColorPkr] = useState('colorPkrClose')
  const [dataforEdit, setDataForEdit] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const onColorChange = (updatedColor) => {
    setColor(updatedColor)
  }

  const showColorPicker = () => {
    const picker = colorPkr === 'colorPkrClose' ? 'colorPkrShow' : 'colorPkrClose'
    setColorPkr(picker)
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

  const getProjectList = (page) => {
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/project/dashboard?page=${page}&per_page=6`,
      headers: { 
        Authorization: `Token ${token}`
      }
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        
        setProjectList(response.data)
      } else if (response.data.status === 401) {
        history.push('/login')
      }
    })
    .catch(function (error) {
      console.log(error)
      // history.push('/login')
    })
  }

  useEffect(() => {
    getProjectList(1)
    
  }, [dispatch])

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
          url: `https://w-call-demo02.herokuapp.com/project/${item.id}`,
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

  const getDataForEdit = (data) => {
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/project/get_for_single_edit/${data.id}?time_zone=Asia/Kolkata`,
      headers: { 
        Authorization: `Token ${token}`
      }
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        
        setDataForEdit(response.data.data)
        setEditShow(true)
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

  const renderProjects = (projectList) => {
    console.log(projectList)
    if (projectList !== undefined && projectList.length > 0) {
      return projectList.map(item => {
        // console.log(item.created_at)
        return (
      <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
        <Card className='card-browser-states shadow-none' style={{border: `1px solid ${item.color}`}}>
          <CardHeader>
            <div>
              <CardTitle tag='h4'>{item.name}</CardTitle>
              <CardText className='font-small-2'>Created By {item.creator.name} At { moment(item.created_at).format("D MMM yy")}</CardText>
            </div>
            <UncontrolledDropdown className='chart-dropdown'>
              <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
                <MoreVertical size={18} className='cursor-pointer' />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className='w-100'  onClick={() => getDataForEdit(item)}>
                  <Edit size={15} />
                  <span className='align-middle ml-50'>Edit</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => handleConfirmCancel(item)}>
                  <Trash size={15} />
                  <span className='align-middle ml-50'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </CardHeader>
          <CardBody>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
            <Row>
              <Col md='6'>
                <h6 className='section-label'>TYPE</h6>
                <Badge className='mr-1' color='light-warning'>
                  {type[item.type_].label}
                </Badge>
              </Col>
              <Col md='6'>
              <h6 className='section-label'>Job number</h6>
                <Badge color='light-dark'>#{item.job_number}</Badge>
              </Col>
            </Row>
            {item.members.length > 0 ? (
              <Row className='mt-1'>
              <Col>
              <h6 className='section-label'>members</h6>
              <AvatarGroup data={item.members} />
              </Col>
            </Row>
            ) : ''}
            
            <Row className='mt-1'>
              <Col md="6">
                <div className='apply-job-package bg-light-secondary rounded' style={{textAlign: 'center', padding: '0.5rem'}}>
                  <div>
                    <Label>Last Updated</Label>
                    <h6 className=''>{ moment(item.updated_at).format("D MMM yy")}</h6>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className='apply-job-package bg-light-secondary rounded' style={{textAlign: 'center', padding: '0.5rem'}}>
                  <div>
                    <Label>Build Date</Label>
                    <h6 className=''>{ moment(item.build_at).format("D MMM yy")}</h6>
                  </div>
                </div>
              </Col>
            </Row>
            <Button.Ripple color='primary' block className='mt-1' tag={Link} to={`/project-view/${item.id}`}>
              open
            </Button.Ripple>
          
          </CardBody>
        </Card>
      </Col>
        )
      })
    }
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
    getProjectList(page.selected + 1)
  }

  console.log(projectList.pagination)
  return (
    <Fragment>
      <div>
        <Row className='mb-1'>
          <Col md={6}>
          <h3>Project List</h3>
          </Col>
          <Col md={6} style={{textAlign:'right'}} >
            <Button color='primary' onClick={() => setShow(true)}>
                    <Plus size={15} />
                    <span className='align-middle ml-50'>Add Project</span>
            </Button>
          </Col>
        </Row>
      </div>
      <Row>
        {renderProjects(projectList.data)}
        
      </Row>
      {projectList.data !== [] && projectList.pagination !== undefined &&
        <ReactPaginate 
          previousLabel=''
          nextLabel=''
          forcePage={currentPage}
          onPageChange={page => handlePagination(page)}
          pageCount={searchValue.length ? filteredData.length / 10 : projectList.pagination.total / 6 || 1}
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
          containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-center pr-1 mt-1'
        />
        }
      <AddProject
        show={show} 
        setShow={setShow} 
        type={type} 
        getProjectList={getProjectList} 
        ToastContent={ToastContent}
        
      />
      <EditProject
        show={editShow} 
        setShow={setEditShow} 
        projectData={dataforEdit} 
        getProjectList={getProjectList} 
        ToastContent={ToastContent}
      />

    </Fragment>
  )
}

export default Projects
