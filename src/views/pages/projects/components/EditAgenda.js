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

import { useParams } from 'react-router-dom'
import axios from 'axios'
  const AddNewModal = ({ show, setShow, presenters, users, ItemData }) => {
    const { id } = useParams()
  const [basic, setBasic] = useState(new Date())
  const [rooms, setRooms] = useState([])
  const [inputFields, setInputFields] = useState([{ key: '', value: '' }])
  const [teleprompter, setTeleprompter] = useState([])
  
  const userRoles = [
    { value: '1', label: 'System Admin', color: '#00B8D9', isFixed: true },
    { value: '2', label: 'Client', color: '#0052CC', isFixed: true },
    { value: '3', label: 'Crew', color: '#5243AA', isFixed: true }
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

  let post_stage = []
  let pre_stage = []
  let stage = []
  let teleprompter_default = []
  if (ItemData.length !== 0) {
    post_stage = ItemData.post_stage
    pre_stage = ItemData.pre_stage
    stage = ItemData.stage
    teleprompter_default = ItemData.teleprompter
    // console.log(a)
    post_stage = post_stage.map(({id, name}) => {
      return {
        value: id,
        label: name
      }
    })
    pre_stage = pre_stage.map(({id, name}) => {
      return {
        value: id,
        label: name
      }
    })
    stage = stage.map(({id, name}) => {
      return {
        value: id,
        label: name
      }
    })
    teleprompter_default = teleprompter_default.map(({id, name}) => {
      return {
        value: id,
        label: name
      }
    })
    // console.log(teleprompter_default)
  }

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

    const listTeleprompter = () => {
      const config = {
        method: 'get',
        url: `https://digital-oasis-dev.herokuapp.com/v3/project/teleprompter/for_assigning/${id}`,
        headers: { 
          Authorization: `Token ${getToken()}`
        }
      }
      
      axios(config)
      .then(function (response) {
        console.log(response)
        if (response.data.status === 200) {
          const data = response.data.data
          const teleprom = []
          data.forEach(element => {
            teleprom.push({
              value: element.id,
              label: element.name
            })
          })
          setTeleprompter(teleprom)
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
      listTeleprompter()
    }, [ItemData])

    const onSubmit = data => {
      console.log(inputFields)

      let formated_time = JSON.stringify(data.start_at)
      console.log(formated_time)
      formated_time = formated_time.slice(2, 21)
      console.log(formated_time)

      // let formated_run_time = JSON.stringify(data.run_time)
      // console.log(formated_run_time)
      // formated_run_time = formated_time.slice(1, 20)
      // console.log(formated_run_time)

      console.log(data)
      console.log(data.users)
      let add_members = []
      add_members = data.users.map(({value, label}) => {
        return {
          id : value,
          name: label
        }
      })
      let add_presenter = []
      const presenters =  data.presenters
      console.log(presenters)
      add_presenter = presenters.map(({value, label}) => {
        return {
          id : value,
          name: label
        }
      })

      // let teleprompters = []
      const teleprompter =  data.teleprompter
      console.log(teleprompter.value)
      // let teleprompters = ''
      // teleprompters = teleprompter.map(({value}) => {
      //   teleprompters = value
      // })

      // console.log(t)
      // console.log(teleprompter.slice(1, ))
      console.log(add_members)
      // {"name": "Agendaname", "start_at": "2021-11-01T12:12:12", "description": "Description**", "run_time_expected": 30, "pre_stage_id": 1, "post_stage_id": 2, "stage_id": 5, "custom_fields": [{'key': 'New Title', 'value': 'Val'}], 'teleprompter_id': 1, 'add_members': [{}], 'add_presenters': []}
      const d = {
        name: data.item_name,
        start_at: formated_time,
        description: data.item_description, 
        run_time_expected: 30, 
        // run_time_expected: data.run_time, 
        pre_stage_id: data.pre_stage_room.value, 
        post_stage_id: data.post_stage_room.value, 
        stage_id: data.stage_room.value,
        custom_fields: [], 
        teleprompter_id: teleprompter.value, 
        add_users: add_members, 
        add_presenters: add_presenter
      }
      console.log(d)

      const config = {
        method: 'post',
        url: `https://digital-oasis-dev.herokuapp.com/v3/project/agenda/${id}`,
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
        // listTeleprompter()
        // setShowList('show-list')
        // setShowItem('hide-add-item')
        // setSingleItem([])
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
                  defaultValue={ItemData.name}
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
                  defaultValue={ItemData.description}
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
                    data-enable-time
                    id='date-time-picker'
                    // id='date-time-picker'
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
                    data-enable-time
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
                  defaultValue={pre_stage}
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
                  defaultValue={stage}
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
                  defaultValue={post_stage}
                />
              </FormGroup>
            </Col>
            <Col className='mb-1' md='12' sm='12'>
              <Label>Add Users</Label>
              <Controller
                isClearable 
                as={Select}
                id='react-select'
                control={control}
                name='users'
                options={users}
                // className={invalid}
                classNamePrefix='select'  
                isMulti 
                theme={selectThemeColors}
              />
              
              {/* <Select
                isClearable={false}
                theme={selectThemeColors}
                // defaultValue={[users[2], users[3]]}
                isMulti
                name='users'
                options={users}
                className='react-select'
                classNamePrefix='select'
              /> */}
            </Col>
            <Col className='mb-1' md='12' sm='12'>
              <Label>Add Presenters</Label>
              <Controller
                isClearable 
                as={Select}
                id='react-select'
                control={control}
                name='presenters'
                options={presenters}
                // className={invalid}
                classNamePrefix='select'  
                isMulti 
                theme={selectThemeColors}
              />
              {/* <Select
                isClearable={false}
                theme={selectThemeColors}
                // defaultValue={[users[2]]}
                isMulti
                name='colors'
                options={presenters}
                className='react-select'
                classNamePrefix='select'
              /> */}
            </Col>
            <Col md={4} xs={12} className='mb-1'>
                <CustomInput inline type='checkbox' id='exampleCustomCheckbox' label='Add Teleprompter' defaultChecked />
              </Col>
            <Col md={12} xs={12}>
              <FormGroup>
                <Label className='form-label' for='teleprompter'>
                  Select Teleprompter
                </Label>
                <Controller
                  isClearable 
                  as={Select}
                  id='react-select'
                  control={control}
                  name='teleprompter'
                  options={teleprompter}
                  // className={invalid}
                  classNamePrefix='select'  
                  defaultValue={teleprompter_default}
                  theme={selectThemeColors}
                />
                {/* <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  // defaultValue={[users[2]]}
                  // isMulti
                  name='teleprompter'
                  options={teleprompter}
                  className='react-select'
                  classNamePrefix='select'
                /> */}
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