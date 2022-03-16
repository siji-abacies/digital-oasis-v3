import { Fragment, useState, forwardRef, useEffect } from 'react'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Input,
    Label,
    Button,
    Modal, 
    ModalBody, 
    ModalHeader, 
    ModalFooter,
    Form, 
    FormGroup, 
  CustomInput

  } from 'reactstrap'
import { Plus, Trash, X } from 'react-feather'

import { useForm, Controller } from 'react-hook-form'
import Select, { components } from 'react-select'
import Flatpickr from 'react-flatpickr'
import { selectThemeColors, getToken } from '@utils'
import Repeater from '@components/repeater'
import { SlideDown } from 'react-slidedown'

import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { toast, Slide } from 'react-toastify'

const AddNewModal = ({ show, setShow, presenters, users, listAgenda, ToastContent }) => {
  const { id } = useParams()
  const [basic, setBasic] = useState('00:30')
  const [rooms, setRooms] = useState([])
  const [inputFields, setInputFields] = useState([{ key: '', value: '' }])
  const [teleprompter, setTeleprompter] = useState([])
  const [invalid, setInvalid] = useState('')
  const [invalid_members, setInvalidMembers] = useState('')
  const [invalid_presenters, setInvalidPresenters] = useState('')
  const [invalid_tele, setInvalidTele] = useState('')
  const [invalid_pre_stage, setInvalidPreStage] = useState('')
  const [invalid_post_stage, setInvalidPostStage] = useState('')
  const [invalid_stage, setInvalidStage] = useState('')
  const [picker, setPicker] = useState(new Date())
  const [colorPkr, setColorPkr] = useState('colorPkrClose')
  const [count, setCount] = useState(1)

  //Increase Repeater count
  const increaseCount = () => {
    setCount(count + 1)
    const values = [...inputFields]
    values.push({ key: '', value: '' })
    setInputFields(values)
  }

  //Delete repeater form
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
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()
    
  // get Room list
  const listRooms = () => {
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/project/room/full_list/${id}`,
      headers: { 
        Authorization: `Token ${getToken()}`
      }
    }
      
    axios(config)
    .then(function (response) {
      // console.log(response)
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
      } else if (response.data.status === 401) {
        history.push('/login')
      }
    })
    .catch(function (error) {
      console.log(error)
      // history.push('/login')
    })
  }

  //Get telepromter list
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
      // console.log(response)
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
    listRooms()
    listTeleprompter()
  }, [])

  const setRunTime = (e) => {
    const r = new Date(e)
    const time = moment(r).format('HH:mm')
    setBasic(time)
  }

  const setStartTime = (e) => {
    setPicker(e[0])
  }

  const onSubmit = data => {
    console.log(data)
    let add_members = []
    let add_presenter = []
    const teleprompter =  data.teleprompter
    let telep_val = ''
    let pre_stage_val = ''
    let post_stage_val = ''
    let stage_val = ''

    if (data.users !== undefined) {
      setInvalidMembers('')
      //add members
      add_members = data.users.map(({value, label}) => {
        return {
          id : value,
          name: label
        }
      })
    } else {
      setInvalidMembers('invalid_members')
    }

    if (data.presenters !== undefined) {
      setInvalidPresenters('')
      //add presenters
      const presenters =  data.presenters
      console.log(presenters)
      add_presenter = presenters.map(({value, label}) => {
        return {
          id : value,
          name: label
        }
      })
    } else {
      setInvalidPresenters('invalid_presenters')
    }
    
    if (teleprompter !== undefined) {
      setInvalidTele('')
      telep_val = teleprompter.value
    } else {
      setInvalidTele('invalid_tele')
    }

    if (data.pre_stage_room !== undefined) {
      setInvalidPreStage('')
      pre_stage_val = data.pre_stage_room.value
    } else {
      setInvalidPreStage('invalid_pre_stage')
    }

    if (data.post_stage_room !== undefined) {
      setInvalidPostStage('')
      post_stage_val = data.post_stage_room.value
    } else {
      setInvalidPostStage('invalid_post_stage')
    }

    if (data.stage_room !== undefined) {
      setInvalidStage('')
      stage_val = data.stage_room.value
    } else {
      setInvalidStage('invalid_stage')
    }

    if (data.pre_stage_room !== undefined || data.post_stage_room !== undefined || data.stage_room !== undefined) {
      
      console.log(inputFields)
      console.log(data.run_time)
      const time = basic.split(':')
      const r_time = parseInt(time[0] * 60) + parseInt(time[1])
      console.log(time, r_time)

      let formated_time = JSON.stringify(picker)
      console.log(formated_time)
      formated_time = formated_time.slice(1, 20)
      console.log(formated_time)

      const d = {
        name: data.item_name,
        start_at: formated_time,
        description: data.item_description, 
        run_time_expected: r_time, 
        // run_time_expected: data.run_time, 
        pre_stage_id: pre_stage_val, 
        post_stage_id: post_stage_val, 
        stage_id: stage_val,
        custom_fields: inputFields, 
        teleprompter_id: telep_val, 
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
          listAgenda(1, 10)
          setShow(false)
          setCount(1)
          toast.success(
          <ToastContent message='Agenda Successfully Added' />,
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
                    data-enable-time
                    id='date-time-picker' 
                    // minDate='today'
                    name='start_at'
                    innerRef={register({ required: true })}
                    invalid={errors.start_at && true}
                    className={`form-control ${invalid}`} 
                    options={{
                      altFormat: "d/m/Y h:i K",
                      altInput: true,
                      minDate: "today"
                    }}
                    onClose={(event) => setStartTime(event)}
                    // onClose={(event) => setRunTime(event)}
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
                    className={`form-control ${invalid}`}
                    options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: 'H:i', 
                      // altFormat: "i",
                      // altInput: true,
                      time_24hr: true
                    }}
                    onClose={(event) => setRunTime(event)}
                    // onChange={() => setRunTime()}
                    // onselect={() => setRunTime()}
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
                  className={invalid_pre_stage}
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
                  className={invalid_post_stage}
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
                  className={invalid_stage}
                  classNamePrefix='select'  
                  theme={selectThemeColors} 
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
                className={invalid_members}
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
                className={invalid_presenters}
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
                  className={invalid_tele}
                  classNamePrefix='select'  
                   
                  theme={selectThemeColors}
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
                    reset()
                    setCount(1)
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