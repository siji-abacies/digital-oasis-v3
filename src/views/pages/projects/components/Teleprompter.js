import { Fragment, useState, forwardRef, useEffect } from 'react'

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
    Badge,
    UncontrolledDropdown, 
    CardText, 
    CardBody, 
    Modal, 
    ModalBody, 
    ModalHeader, 
    ModalFooter,
    Form, 
    FormGroup, 
    CustomInput

  } from 'reactstrap'
import { ChevronDown, Plus, MoreVertical, Edit, Trash, X, SkipBack, ArrowLeftCircle } from 'react-feather'

import { useForm, Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import { selectThemeColors, getToken } from '@utils'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import moment from 'moment'
// import { tz } from 'moment-timezone'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cleave from 'cleave.js/react'
import '@styles/react/libs/flatpickr/flatpickr.scss'
  
const MySwal = withReactContent(Swal)

const AddNewModal = ({ show, setShow }) => {
  const { id } = useParams()
  const [basic, setBasic] = useState(new Date())
  const [teleprompterList, setTeleprompter] = useState([])
  const [inputFields, setInputFields] = useState([{ key: '', value: '' }])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [picker, setPicker] = useState(new Date())
  const [invalid, setInvalid] = useState('')
  const [color, setColor] = useState('#3cd6bf')
  const [colorPkr, setColorPkr] = useState('colorPkrClose')
  const [count, setCount] = useState(1)
  const [showlist, setShowList] = useState('show-list')
  const [showitem, setShowItem] = useState('hide-add-item')
  const [singleItem, setSingleItem] = useState([])
  const options = { numeral: true, numeralThousandsGroupStyle: 'thousand' }
  const {
        reset,
        register,
        control,
        setError,
        handleSubmit,
        formState: { errors }
      } = useForm()
      
  const addTeleprompter = () => {
    setShowList('hide-list')
    setShowItem('show-add-item')
  }

  const goback = () => {
    reset()
    setShowList('show-list')
    setShowItem('hide-add-item')
    setSingleItem([])
  }

  const editTeleprompter = (row) => {
    setShowList('hide-list')
    setShowItem('show-add-item')
    setSingleItem(row)
    console.log(row)
    // const ex_date = moment(row.expiry_at).format('d/m/Y h:i K')
    const ex_date = moment(row.expiry_at, "YY-MM-DD HH:mm:ss").format("DD/MM/yyyy hh:mm A")
    console.log(ex_date)
    // d/m/Y h:i K
    console.log(moment(row.expiry_at).format('DD/MM/YY HH:mm:ss'))
        
    // console.log(row.expiry_at, moment(row.expiry_at, 'Y-MM-D HH:mm:ss').tz('Asia/Kolkata').format('Y-MM-D HH:mm:ss'))
        
    // /project/teleprompter/get_for_single_edit/<int:project_id>/<int:id_>
    // const config = {
    //   method: 'get',
    //   url: `https://digital-oasis-dev.herokuapp.com/v3/project/teleprompter/get_for_single_edit/${id}/${row.id}`,
    //   headers: { 
    //     Authorization: `Token ${getToken()}`
    //   }
    // }
        
    // axios(config)
    // .then(function (response) {
    //   console.log(response)
    //   if (response.data.status === 200) {
    //     // const data = response.data.data
    //     // const r = []
    //     // data.forEach(element => {
    //     //   r.push({
    //     //     value: element.id,
    //     //     label: element.name
    //     //   })
    //     // })
    //     setTeleprompter(response.data.data)
    //     // setCreator(response.data.data.creator)
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
        
        axios({ 
          method: 'delete',
          url: `https://digital-oasis-dev.herokuapp.com/v3/project/teleprompter/${id}/${row.id}`,
          headers: { 
            ContentType : 'application/json', 
            Authorization: `Token ${getToken()}` 
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

      
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      width: '150px'
      // minWidth: '30px'
    },
    {
      name: 'Expiry',
      selector: 'expiry_at',
      sortable: true,
      // minWidth: '250px'
      width: '150px'
    },
    {
      name: 'Allowed Users',
      selector: 'allowed_users',
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
                <DropdownItem className='w-100' onClick={() => editTeleprompter(row)}>
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

  const listTeleprompter = () => {
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/project/teleprompter/list_for_edit/${id}?time_zone=Asia/Kolkata`,
      headers: { 
        Authorization: `Token ${getToken()}`
      }
    }
      
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        setTeleprompter(response.data.data)
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
    listTeleprompter()
      
  }, [])

  const onSubmit = data => {
    console.log(singleItem)
    console.log(data)
    if (data.expiry_date !== undefined) {
      let utc_time = JSON.stringify(data.expiry_date)
      console.log(utc_time)
      utc_time = utc_time.slice(2, 21)
        
      console.log(data, utc_time)
      const d = { 
        name: data.name,
        expiry_at: utc_time,
        is_open: data.is_open, 
        is_password_protected: data.is_password_protected, 
        allowed_users: parseInt(data.users), 
        one_time_use: data.one_time_use, 
        password: data.password 
      }
      console.log(d)
  
      const url = singleItem.length !== 0 ? `project/teleprompter/${singleItem.id}/${id}` : `project/teleprompter/${id}`
      const _method = singleItem.length !== 0 ? 'put' : 'post'
      const config = {
        method: _method,
        url: `https://digital-oasis-dev.herokuapp.com/v3/${url}`,
        headers: { 
          ContentType: 'application/json',
          Authorization: `Token ${getToken()}`
        }, 
        data : d
      }
  
      console.log(config)
      axios(config)
      .then(function (response) {
        console.log(response)
        if (response.data.status === 200) {
          reset()
          listTeleprompter()
          setShowList('show-list')
          setShowItem('hide-add-item')
          setSingleItem([])
          // setShow(false)
          // toast.success(
          // <ToastContent message='Project Successfully Added' />,
          //   { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
          // )
          } else if (response.data.status === 409) {
            // toast.success(
            // <ToastContent message={response.data.message} />,
            //   { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
            // )
          }
            // console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
          // history.push('/login')
      })
    } else {
      setInvalid('invalid')
    }
    
  }

  return (
    <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
      <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
      <ModalBody className='px-sm-5 pt-50 pb-5'>
            
        <div className='text-center mb-2'>
          <h1 className='mb-1'>Teleprompter</h1>
        </div>
          
        <Card className={showlist}>
          <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>List </CardTitle>
            <div className='d-flex mt-md-0 mt-1'>
                
              <Button className='ml-2' color='primary' onClick={() => addTeleprompter()}>
                <Plus size={15} />
                <span className='align-middle ml-50'>Add</span>
              </Button>
                
            </div>
          </CardHeader>
          
            <DataTable
              noHeader
              pagination
              // selectableRows
              columns={columns}
              paginationPerPage={7}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              // paginationComponent={CustomPagination}
              data={searchValue.length ? filteredData : teleprompterList}
              // selectableRowsComponent={BootstrapCheckbox}
            />
        </Card> 
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className={`gy-1 pt-75 ${showitem}`}>
            <Col md={12} xs={12}>
              <FormGroup>
                <Label className='form-label' for='item_name'>
                  Name
                </Label>
                <Input
                  type='text'
                  id='name'
                  name='name'
                  defaultValue={singleItem !== [] ? singleItem.name : ''}
                  placeholder='Pre Show 1' 
                  innerRef={register({ required: true })}
                  invalid={errors.item_name && true}
                />
                </FormGroup>
            </Col>
            <Col md={12} xs={12}>
                <FormGroup>
                  <Label for='date-time-picker'>Expiry Date</Label>
                  <Controller
                    as={Flatpickr} 
                    data-enable-time
                    control={control}
                    id='date-time-picker'
                    name='expiry_date' 
                    className={`form-control ${invalid}`} 
                    // dateFormat='Y-m-d h:mm:ss'
                    // defaultValue={singleItem !== [] ? singleItem.expiry_at : new Date()}
                    // defaultValue={moment('2022-03-12 12:00:00', "YY-MM-DD HH:mm:ss").format("DD/MM/YYYY hh:mm A")}
                    // defaultValue={singleItem.expiry_at}
                    // defaultValue='2022-03-12 12:00:00'
                    innerRef={register({ required: true })}
                    invalid={errors.expiry_date && true}
                    options={{
                      // altFormat: "d/m/Y h:i K",
                      // altFormat: 'd/m/Y h:m:s',
                      // altFormat: 'Y-M-D H:m:s',
                      altInput: true,
                      minDate: "today"
                      // dateFormat: "Y-m-d"
                    }} 
                  />
                </FormGroup>
            </Col>
            <Col md={12} xs={12}>
              <FormGroup>
                <Label className='form-label' for='item_name'>
                  No of allowed users
                </Label>
                <Cleave 
                  className='form-control' 
                  placeholder='10' 
                  options={options} 
                  id='users' 
                  name='users' 
                  defaultValue={singleItem !== [] ? singleItem.allowed_users : ''}
                  innerRef={register({ required: true })}
                  invalid={errors.users && true} />
                {/* <Input
                  type='text'
                  id='users'
                  name='users'
                  defaultValue={singleItem !== [] ? singleItem.allowed_users : ''}
                  placeholder='10' 
                  innerRef={register({ required: true })}
                  invalid={errors.users && true}
                /> */}
                </FormGroup>
            </Col>
            <Row style={{marginLeft: '0.1em'}}>
              <Col md={4} xs={12} className='mt-1 mb-1'>
                <CustomInput inline name='is_open' type='checkbox' id='is_open' label='Is Open'
                  innerRef={register({ required: false })} 
                  invalid={errors.is_open && true} 
                  defaultChecked={singleItem !== [] ? singleItem.is_open : false}
                />
              </Col>
              <Col md={4} xs={12} className='mt-1 mb-1'>
                <CustomInput inline name='one_time_use' type='checkbox' id='one_time_use' label='One Time Use'
                  innerRef={register({ required: false })} 
                  invalid={errors.one_time_use && true} 
                  defaultChecked={singleItem !== [] ? singleItem.one_time_use : false}
                />
              </Col>
              <Col md={4} xs={12} className='mt-1 mb-1'>
                <CustomInput inline name='is_password_protected' type='checkbox' id='is_password_protected' label='Password Protected'
                  innerRef={register({ required: false })} 
                  invalid={errors.is_password_protected && true} 
                  defaultChecked={singleItem !== [] ? singleItem.is_password_protected : true}
                />
              </Col>
              <Col md={12} xs={12}>
              <Label className='form-label' for='password'>
                Password
              </Label>
              <Input
                  type='text'
                  id='password'
                  name='password'
                  placeholder='' 
                  innerRef={register({ required: false })}
                  invalid={errors.password && true} 
                  defaultValue={singleItem !== [] ? singleItem.password : ''}
              />
              
            </Col>
            
              
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='button' className='me-1' color='secondary' outline 
                  onClick={() => goback()} style={{marginRight: '20px'}}>
                  <ArrowLeftCircle size={15} /><span className='align-middle ml-50'>Back</span>
                </Button>
                <Button type='submit' className='me-1' color='primary' style={{marginRight: '20px'}}>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    reset()
                    setShow(false)
                    setShowList('show-list')
                    setShowItem('hide-add-item')
                    setSingleItem([])
                  }}
                >
                  Cancel
                </Button>
              </Col>

            </Row>
          </Row>
        </Form>
      </ModalBody>
    </Modal>

  )
}

export default AddNewModal