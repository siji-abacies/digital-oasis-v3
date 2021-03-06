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
  // import ReactColorPicker from '@super-effective/react-color-picker'
  import Repeater from '@components/repeater'
  import { SlideDown } from 'react-slidedown'

  import 'uppy/dist/uppy.css'
  import '@uppy/status-bar/dist/style.css'
  import { yupResolver } from '@hookform/resolvers/yup'
  import { useParams } from 'react-router-dom'
  import axios from 'axios'
  import { toast, Slide } from 'react-toastify'
  const AddNewModal = ({ show, setShow, getPresenters, ToastContent, rowsPerPage}) => {
  const { id } = useParams()

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
  const [isoRecord, setIsoRecord] = useState(true)
  const [hdRecord, sethdRecord] = useState(false)
  const [sendMail, setSendMail] = useState(true)
  const [password_protected_state, setPasswordProtected] = useState('')    

  const [inputFields, setInputFields] = useState([{ key: '', value: '' }])

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

  // const showColorPicker = () => {
  //   const picker1 = colorPkr === 'colorPkrClose' ? 'colorPkrShow' : 'colorPkrClose'
  //   setColorPkr(picker1)
  // }

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
            
    const onSubmit = data => {
      console.log(inputFields)
      console.log(data)
      const d = {
        first_name: data.firstName,
        last_name: data.lastName,
        company: data.company, 
        email: data.email, 
        iso_recording: isoRecord, 
        hd_local_recording: hdRecord,
        send_email: sendMail, 
        custom_fields: inputFields, 
        is_password_protected: data.password_protected, 
        password: data.password
      }
      console.log(d)

      const config = {
        method: 'post',
        url: `https://digital-oasis-dev.herokuapp.com/v3/project/presenter/${id}`,
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
          getPresenters(1, rowsPerPage)
          // getProjectMembers()
          setShow(false)
          console.log(ToastContent)
          toast.success(
          <ToastContent message='Presenter Successfully Added' />,
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
          <h1 className='mb-1'>Add New Presenter</h1>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className='gy-1 pt-75'>
            <Col md={6} xs={12}>
              <Label className='form-label' for='firstName'>
                First Name
              </Label>
                <Input
                  type='text'
                  id='firstName'
                  name='firstName'
                  placeholder='John' 
                  innerRef={register({ required: true })}
                  invalid={errors.firstName && true}
                />
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='lastName'>
                Last Name
              </Label>
                <Input
                  type='text'
                  id='lastName'
                  name='lastName'
                  placeholder='Doe' 
                  innerRef={register({ required: true })}
                  invalid={errors.lastName && true}
                />
            </Col>
            
            <Col md={12} xs={12}>
              <Label className='form-label' for='billing-email'>
                Email
              </Label>
                <Input
                  type='text'
                  id='email'
                  name='email'
                  placeholder='Doe' 
                  innerRef={register({ required: false })}
                  invalid={errors.email && true}
                />
            </Col>
            
            <Col md={4} xs={12} className='mt-1 mb-1'>
              <CustomInput inline name='iso_record' type='checkbox' id='iso_record' label='ISO Record'
                innerRef={register({ required: false })} 
                invalid={errors.iso_record && true} 
                defaultChecked={isoRecord}  
                onChange={e => setIsoRecord(e.target.checked)} />

            </Col>
            <Col md={5} xs={12} className='mt-1'>
              <CustomInput inline name='hd_record' type='checkbox' id='hd_record' label='High Quality Local Record'
                innerRef={register({ required: false })} 
                invalid={errors.hd_record && true} 
                defaultChecked={hdRecord}  
                onChange={e => sethdRecord(e.target.checked)} 
              />
            
            </Col>
            <Col md={3} xs={12} className='mt-1'>
              <CustomInput inline type='checkbox' id='send_email' name='send_email' label='Send Email' 
              innerRef={register({ required: false })} 
                defaultChecked={sendMail}  
                onChange={e => setSendMail(e.target.checked)}/>

            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='company'>
                Company
              </Label>
              <Input
                  type='text'
                  id='company'
                  name='company'
                  placeholder='Worldstage' 
                  innerRef={register({ required: false })}
                  invalid={errors.company && true}
              />
              
            </Col>
            
            <Col md={4} xs={12} className='mt-1 mb-1'>
              <CustomInput inline name='password_protected' type='checkbox' id='password_protected' label='Password Protected'
                innerRef={register({ required: false })} 
                invalid={errors.password_protected && true} 
                defaultChecked 
                onChange={e => setPasswordProtected(e.target.checked)} 
              />

            </Col>
            <Col md={12} xs={12}>
              <Label className='form-label' for='password'>
                Password
              </Label>
              <Input
                  type={password_protected_state === false ? "text" : "password"}
                  // type='text'
                  id='password'
                  name='password'
                  placeholder='' 
                  innerRef={register({ required: false })}
                  invalid={errors.password && true}
              />
              
            </Col>
            <Col md={12} xs={12} className='mt-1'>
              <Label >Upload Image</Label>
              <DragDrop uppy={uppy} />
            </Col>

            <Col md={12} xs={12} style={{marginTop:'10px'}}>
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
                              <Input className='form-control' type='text' id={`animation-item-name-${i}`} name='name' placeholder='TNC' value={inputFields.key} onChange={event => handleInputChange(i, event)} />
                            </FormGroup>
                          </Col>
                          <Col md={5}>
                            <FormGroup>
                              <Label for={`animation-cost-${i}`}>Value</Label>
                              <Input className='form-control' type='text' id={`animation-cost-${i}`} name='value' placeholder='Manager' value={inputFields.value} onChange={event => handleInputChange(i, event)}/>
                            </FormGroup>
                          </Col>
                          
                          <Col md={2}>
                            <Button.Ripple color='danger' className='text-nowrap px-1' onClick={deleteForm} outline>
                              <X size={14} className='mr-50' />
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