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
  const AddNewModal = ({ show, setShow }) => {
    const { id } = useParams()
  const [basic, setBasic] = useState(new Date())
  const [rooms, setRooms] = useState([])
  const [inputFields, setInputFields] = useState([{ key: '', value: '' }])

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
      
    const listRooms = () => {
      // /project/room/full_list/<int:project_id>
      const config = {
        method: 'get',
        url: `https://digital-oasis-dev.herokuapp.com/v3/project/room/full_list/${id}`,
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
          setRooms(r)
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
      listRooms()
      
    }, [])

    const onSubmit = data => {
      console.log(inputFields)

      console.log(data)
      const d = {
        name: data.name,
        start_at: data.start_at,
        description: data.description, 
        run_time_expected: data.run_time, 
        pre_stage_id: data.pre_stage_room.value, 
        post_stage_id: data.post_stage_room.value, 
        stage_id: data.stage_room.value,
        custom_fields: [], 
        // teleprompter_id: data.password_protected, 
        add_members: [], 
        add_presenters: []
      }
      console.log(d)

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
            <h1 className='mb-1'>Add New Agenda Item</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
            <Col md={12} xs={12}>
              <FormGroup>
                <Label className='form-label' for='item_name'>
                  Item Name
                </Label>
                <Input
                  type='text'
                  id='item_name'
                  name='item_name'
                  // defaultValue={selectedUser.email}
                  placeholder='Pre Show 1' 
                  innerRef={register({ required: true })}
                  invalid={errors.item_name && true}
                />
                </FormGroup>
            </Col>
            <Col md={12} xs={12}>
              <FormGroup>
                <Label className='form-label' for='item_description'>
                  Item Description
                </Label>
                <Input
                  type='text'
                  id='item_description'
                  name='item_description'
                  innerRef={register({ required: false })}
                  invalid={errors.item_description && true}
                  // defaultValue={selectedUser.email}
                  placeholder='Description'
                />
                </FormGroup>
            </Col>
            <Col md={6} xs={12}>
              <FormGroup>
                <Label for='date-time-picker'>Start Date Time</Label>
                  <Controller
                    as={Flatpickr}
                    control={control}
                    defaultValue={picker}
                    id='date-time-picker'
                    id='date-time-picker'
                    name='start_at'
                    innerRef={register({ required: true })}
                    invalid={errors.start_at && true}
                    className='form-control' 
                    options={{
                      altFormat: "d/m/Y h:i K",
                      altInput: true
                    }}
                    onChange={date => setPicker(date)}
                   
                  />
                
                </FormGroup>
            </Col>
            <Col md={6} xs={12}>
              <FormGroup>
                <Label for='date-time-picker'>Run Time</Label>
                  <Controller
                    as={Flatpickr}
                    control={control}
                    defaultValue={basic}
                    id='timepicker'
                    name="run_time"
                    innerRef={register({ required: true })}
                    invalid={errors.run_time && true}
                    className='form-control' 
                    options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: 'H:i', 
                      // altFormat: "i",
                      // altInput: true,
                      time_24hr: true
                    }}
                    onChange={date => setBasic(date)}
                   
                  />
                 
              </FormGroup>
            </Col>
            <Col md={4} xs={12}>
              <FormGroup>
                <Label for='date-time-picker'>Pre Stage Room</Label>
                
                <Controller
                  isClearable 
                  as={Select}
                  id='react-select'
                  control={control}
                  name='pre_stage_room'
                  options={rooms} 
                  classNamePrefix='select'  
                  theme={selectThemeColors} 
                />
              </FormGroup>
            </Col>
            <Col md={4} xs={12}>
              <FormGroup>
                <Label for='date-time-picker'>Stage</Label>
                <Controller
                  isClearable 
                  as={Select}
                  id='react-select-stage'
                  control={control}
                  name='stage_room'
                  options={rooms} 
                  classNamePrefix='select'  
                  theme={selectThemeColors} 
                />
              </FormGroup>
            </Col>
            <Col md={4} xs={12}>
              <FormGroup>
                <Label for='date-time-picker'>Post Stage Room</Label>
                <Controller
                  isClearable 
                  as={Select}
                  id='react-select-post-stage'
                  control={control}
                  name='post_stage_room'
                  options={rooms} 
                  classNamePrefix='select'  
                  theme={selectThemeColors} 
                />
              </FormGroup>
            </Col>
            <Col className='mb-1' md='12' sm='12'>
              <Label>Add Users</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                defaultValue={[users[2], users[3]]}
                isMulti
                name='colors'
                options={users}
                className='react-select'
                classNamePrefix='select'
              />
            </Col>
            <Col className='mb-1' md='12' sm='12'>
              <Label>Add Presenters</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                defaultValue={[users[2]]}
                isMulti
                name='colors'
                options={users}
                className='react-select'
                classNamePrefix='select'
              />
            </Col>
            <Col md={4} xs={12} className='mb-1'>
                <CustomInput inline type='checkbox' id='exampleCustomCheckbox' label='Add Teleprompter' defaultChecked />
              </Col>
            <Col md={12} xs={12}>
              <FormGroup>
                <Label className='form-label' for='teleprompter'>
                  Select Teleprompter
                </Label>
                <Input
                  type='text'
                  id='teleprompter'
                  // defaultValue={selectedUser.email}
                  placeholder='Lorem Ipsum'
                />
                </FormGroup>
            </Col>

            <Col md={12} xs={12} style={{marginTop:'15px'}}>
                <Label>Custom Fields</Label>
                <Repeater count={count}>
                  {i => {
                    const Tag = i === 0 ? 'div' : SlideDown
                    return (
                      <Tag key={i}>
                        <Form>
                          <Row className='justify-content-between align-items-center'>
                            <Col md={5}>
                              <FormGroup>
                                <Label for={`animation-item-name-${i}`}>Name</Label>
                                <Input type='text' id={`animation-item-name-${i}`} name='name' placeholder='TNC' value={inputFields.key} onChange={event => handleInputChange(i, event)} />
                              </FormGroup>
                            </Col>
                            <Col md={5}>
                              <FormGroup>
                                <Label for={`animation-cost-${i}`}>Value</Label>
                                <Input type='text' id={`animation-cost-${i}`} placeholder='Manager' value={inputFields.value} onChange={event => handleInputChange(i, event)} />
                              </FormGroup>
                            </Col>
                            
                            <Col md={2}>
                              <Button.Ripple color='danger' className='text-nowrap px-1' onClick={deleteForm} outline>
                                <Trash size={14} className='mr-50' />
                                <span>Delete</span>
                              </Button.Ripple>
                            </Col>
                            <Col sm={12}>
                              <hr />
                            </Col>
                          </Row>
                        </Form>
                      </Tag>
                    )
                  }}
                </Repeater>
              </Col>
              <Button.Ripple className='btn-icon' color='primary' onClick={increaseCount} style={{marginTop:'10px', marginLeft:'15px'}}>
                <Plus size={14} />
                <span className='align-middle ml-25'>Add New</span>
              </Button.Ripple>
              
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
          </Form>
        </ModalBody>
      </Modal>

)
}

export default AddNewModal