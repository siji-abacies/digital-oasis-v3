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
    UncontrolledButtonDropdown,
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
  import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, MoreVertical, Edit, Archive, Trash, X } from 'react-feather'

  import { useForm, Controller } from 'react-hook-form'
  import Select, { components } from 'react-select'
  import Flatpickr from 'react-flatpickr'
  import Uppy from '@uppy/core'
  import { DragDrop } from '@uppy/react'
  import thumbnailGenerator from '@uppy/thumbnail-generator'
  import { selectThemeColors, getToken } from '@utils'
  import ReactColorPicker from '@super-effective/react-color-picker'
  import Repeater from '@components/repeater'
  import { SlideDown } from 'react-slidedown'

  import 'uppy/dist/uppy.css'
  import '@uppy/status-bar/dist/style.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import moment from 'moment'

  const AddNewModal = ({ show, setShow }) => {
    const { id } = useParams()
  const [basic, setBasic] = useState(new Date())
  const [teleprompterList, setTeleprompter] = useState([])
  const [inputFields, setInputFields] = useState([{ key: '', value: '' }])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')

  const stage = [
    { value: '1', label: 'Room 1' },
    { value: '2', label: 'Room 2' },
    { value: '3', label: 'Room 3' },
    { value: '4', label: 'Room 4' },
    { value: '5', label: 'Room 5' }
  ]
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
  
    const type = [
        { value: '1', label: 'Live', color: '#00B8D9', isFixed: true },
        { value: '2', label: 'Stage', color: '#0052CC', isFixed: true },
        { value: '3', label: 'Test', color: '#5243AA', isFixed: true }
      ]

    // const [show, setShow] = useState(false)
    const [picker, setPicker] = useState(new Date())

  const [color, setColor] = useState('#3cd6bf')
  const [colorPkr, setColorPkr] = useState('colorPkrClose')
  const [count, setCount] = useState(1)
  const [showlist, setShowList] = useState('show-list')
  const [showitem, setShowItem] = useState('hide-add-item')

  const increaseCount = () => {
    setCount(count + 1)
    const values = [...inputFields]
    values.push({ key: '', value: '' })
    setInputFields(values)
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

  const onColorChange = (updatedColor) => {
    setColor(updatedColor)
  }

  const showColorPicker = () => {
    const picker = colorPkr === 'colorPkrClose' ? 'colorPkrShow' : 'colorPkrClose'
    setColorPkr(picker)
  }

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
    const {
        reset,
        register,
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
      
      const addTeleprompter = () => {
        setShowList('hide-list')
        setShowItem('show-add-item')
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
                    <DropdownItem className='w-100' onClick={() => editTeleprompter()}>
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
      // /project/room/full_list/<int:project_id>
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
          // const data = response.data.data
          // const r = []
          // data.forEach(element => {
          //   r.push({
          //     value: element.id,
          //     label: element.name
          //   })
          // })
          setTeleprompter(response.data.data)
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

    useEffect(() => {
      // console.log(memberData.user_role)
      listTeleprompter()
      
    }, [])

    const onSubmit = data => {
      // {/* {"expiry_at": "2021-12-30T12:10:20", "name": "Prompter1", "is_open": False, "is_password_protected": False, "allowed_users": 10, "one_time_use": False, "password": "Aewe12"} */}
      console.log(moment(data.expiry_date).format("Y-MM-D HH:mm:ss"))
      console.log(data)
      const d = { 
        name: data.name,
        expiry_at: moment(data.expiry_date).format("Y-MM-D HH:mm:ss"),
        is_open: data.is_open, 
        is_password_protected: data.is_password_protected, 
        allowed_users: data.users, 
        one_time_use: data.one_time_use, 
        password: data.password 
      }
      console.log(d)

      const config = {
        method: 'post',
        url: `https://digital-oasis-dev.herokuapp.com/v3/project/teleprompter/${id}`,
        headers: { 
          ContentType: 'application/json',
          Authorization: `Token ${getToken()}`
        }, 
        data : d
      }

      axios(config)
      .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        // getProjectMembers()
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


      // /project/agenda/<int:project_id></int:project_id>
      // {"name": "Agendaname", "start_at": "2021-11-01T12:12:12", "description": "Description**", "run_time_expected": 30, "pre_stage_id": 1, "post_stage_id": 2, "stage_id": 5, "custom_fields": [{'key': 'New Title', 'value': 'Val'}], 'teleprompter_id': 1, 'add_members': [{}], 'add_presenters': []}
        // if (Object.values(data).every(field => field.length > 0)) {
        //   setShow(false)
        // } else {
        //   for (const key in data) {
        //     if (data[key].length === 0) {
        //       setError(key, {
        //         type: 'manual'
        //       })
        //     }
        //   }
        // }
    }

    const handleInputChange = (index, event) => {
      const values = [...inputFields]
      console.log(event.target.name)
      if (event.target.name === "name") {
        values[index].key = event.target.value
      } else {
        values[index].value = event.target.value
      }
  
      setInputFields(values)
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
            <Row className='justify-content-end mx-0'>
              {/* <Col sm='6'>
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
                  
                </div>
              </Col> */}
              {/* <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
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
              </Col> */}
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
              // paginationComponent={CustomPagination}
              data={searchValue.length ? filteredData : teleprompterList}
              // selectableRowsComponent={BootstrapCheckbox}
            />
          </Card> 
          <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className={`gy-1 pt-75 ${showitem}`}>
          {/* {"expiry_at": "2021-12-30T12:10:20", "name": "Prompter1", "is_open": False, "is_password_protected": False, "allowed_users": 10, "one_time_use": False, "password": "Aewe12"} */}
            <Col md={12} xs={12}>
              <FormGroup>
                <Label className='form-label' for='item_name'>
                  Name
                </Label>
                <Input
                  type='text'
                  id='name'
                  name='name'
                  // defaultValue={selectedUser.email}
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
                    control={control}
                    id='date-time-picker'
                    name='expiry_date' 
                    className='form-control' 
                    defaultValue={new Date()}
                    innerRef={register({ required: true })}
                    invalid={errors.expiry_date && true}
                    options={{
                      altFormat: "d/m/Y h:i K",
                      altInput: true
                      // dateFormat: "Y-m-d"
                    }} 
                  />
                </FormGroup>
            </Col>
            <Col md={12} xs={12}>
              <FormGroup>
                <Label className='form-label' for='item_name'>
                  Name
                </Label>
                <Input
                  type='text'
                  id='users'
                  name='users'
                  // defaultValue={selectedUser.email}
                  placeholder='10' 
                  innerRef={register({ required: true })}
                  invalid={errors.users && true}
                />
                </FormGroup>
            </Col>
            <Row style={{marginLeft: '0.1em'}}>
              <Col md={4} xs={12} className='mt-1 mb-1'>
                <CustomInput inline name='is_open' type='checkbox' id='is_open' label='Is Open'
                  innerRef={register({ required: false })} 
                  invalid={errors.is_open && true} 
                  defaultChecked={false} 
                />
              </Col>
              <Col md={4} xs={12} className='mt-1 mb-1'>
                <CustomInput inline name='one_time_use' type='checkbox' id='one_time_use' label='One Time Use'
                  innerRef={register({ required: false })} 
                  invalid={errors.one_time_use && true} 
                  defaultChecked={false} 
                />
              </Col>
              <Col md={4} xs={12} className='mt-1 mb-1'>
                <CustomInput inline name='is_password_protected' type='checkbox' id='is_password_protected' label='Password Protected'
                  innerRef={register({ required: false })} 
                  invalid={errors.is_password_protected && true} 
                  defaultChecked={true} 
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
              />
              
            </Col>
            
              
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary' style={{marginRight: '20px'}}>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    // handleReset()
                    setShow(false)
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