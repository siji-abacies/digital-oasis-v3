// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, 
          Col, 
          Card, 
          Form, 
          CardBody, 
          CardText, 
          CardHeader, 
          CardTitle, 
          Button, 
          Badge, 
          Modal, 
          Input, 
          Label, 
          ModalBody, 
          ModalHeader, 
          ModalFooter, 
          FormGroup  } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'

import { Check, Briefcase, X, Edit2, Plus } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import Repeater from '@components/repeater'
import { SlideDown } from 'react-slidedown'

// ** Custom Components
import Avatar from '@components/avatar'

import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import axios from 'axios'
import XHRUpload from '@uppy/xhr-upload'
// ** Utils
import { selectThemeColors } from '@utils'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import { useHistory } from 'react-router-dom'

const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
}

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]

const countryOptions = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
]

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'dutch', label: 'Dutch' }
]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser, getUser }) => {
  const history = useHistory()
  console.log(selectedUser)
  const token = localStorage.getItem('token')
  let active = 'pending'

  if (selectedUser.registered === true && selectedUser.invited === true) {
    active = 'active'
  } else {
    active = 'pending'
  }

  const status = {
    1: { title: 'System Admin', color: 'light-primary' },
    2: { title: 'Crew', color: 'light-success' },
    3: { title: 'Client', color: 'light-danger' }
  }

  const is_active = {
    active: { title: 'Active', color: 'light-success' },
    pending: { title: 'Pending', color: 'light-warning' }
  }

  // ** State
  const [show, setShow] = useState(false)

  // ** Hook
  // const {
  //   reset,
  //   control,
  //   setError,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm()
  // {
  //   defaultValues: {
  //     first_name: selectedUser.first_name,
  //     last_name: selectedUser.last_name
  //     // username: selectedUser.name,
  //     // lastName: selectedUser.fullName.split(' ')[1],
  //     // firstName: selectedUser.fullName.split(' ')[0]
  //     // username: 'Test',
  //     // lastName: 'LastName',
  //     // firstName: 'First name'
  //   }
  // })

  const [modal, setModal] = useState(null)
  const [visibility, setVisibility] = useState(false)
  // const toggleModal = () => {
  //   if (modal !== id) {
  //     setModal(id)
  //   } else {
  //     setModal(null)
  //   }
  // }

  const [previewArr, setPreviewArr] = useState([])
  const [count, setCount] = useState(1)

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

  const renderPreview = () => {
    if (previewArr.length) {
      return previewArr.map((src, index) => <img key={index} className='rounded mt-2 mr-1' src={src} alt='avatar' />)
    } else {
      return null
    }
  }


  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const renderModal = () =>  {
    
    return (
      <div className={'theme-modal-primary'}>
        <Button.Ripple color='primary' key="Primary" outline>
          Primary
        </Button.Ripple>
        <Modal
          // isOpen={modal === item.id}
          // toggle={() => toggleModal(item.id)}
          className='modal-dialog-centered'
          modalClassName='modal-primary'
          // key={item.id}
        >
          {/* <ModalHeader toggle={() => toggleModal(item.id)}>{item.title}</ModalHeader> */}
          <ModalBody>
            Tart lemon drops macaroon oat cake chocolate toffee chocolate bar icing. Pudding jelly beans carrot cake
            pastry gummies cheesecake lollipop. I love cookie lollipop cake I love sweet gummi bears cupcake dessert.
          </ModalBody>
          <ModalFooter>
            <Button color='primary' >
              Accept
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
  
  // const editAvatar = () => {

  // }
  uppy.on('upload-success', (file, response) => {
    console.log(file.name, response.uploadURL)
    // const img = new Image()
    // img.width = 300
    // img.alt = file.id
    // img.src = response.uploadURL
    // document.body.appendChild(img)
  })
  // const token = "eyJhbGciOiJIUzUxMiIsImlhdCI6MTY0NDM4MDg0MywiZXhwIjoxNjQ0OTg1NjQzfQ.eyJpZCI6NywidXNlcl9yb2xlIjoxfQ.IyzNMBX9p9vXn5mas5emwjzMgF2i6sVi7R74_A6RSqrSHB38SduYb2ub73zNh8jqTMCjHp-c_kJmm15USqomMA"

  // const headerss = {
  //   Authorization:`Token ${token}`,
  //   // AccessControlAllowOrigin: '*',
  //   ContentType: 'application/x-www-form-urlencoded'
  // }

  // uppy.use(XHRUpload, {
  //   endpoint: `https://w-call-demo02.herokuapp.com/user/edit_user_details/7`,
  //   // formData: true,
  //   fieldName: 'file',
  //   method: 'put',
  //   headers: headerss
  // })

  uppy.on('complete', (result) => {
    console.log(result)
    const img = result.successful
    const d = img[0].data
    console.log(img[0].data)
    // const encode_img = JSON.stringify(img[0].data)
    // console.log(encode_img)

    // const token = "eyJhbGciOiJIUzUxMiIsImlhdCI6MTY0NDM4MDg0MywiZXhwIjoxNjQ0OTg1NjQzfQ.eyJpZCI6NywidXNlcl9yb2xlIjoxfQ.IyzNMBX9p9vXn5mas5emwjzMgF2i6sVi7R74_A6RSqrSHB38SduYb2ub73zNh8jqTMCjHp-c_kJmm15USqomMA"

    const formData = new FormData()
    formData.append('file', img[0].data)

    const body1 = {
      file: img[0].data
      // file: d
    }

    console.log(formData)
    console.log(body1)
    console.log(body1.file)
    const config = {
      method: 'put',
      url: `https://w-call-demo02.herokuapp.com/user/edit_user_details/7`,
      headers: { 
        // AccessControlAllowOrigin: '*',
        // ContentType: 'application/json',
        ContentType: 'multipart/form-data',
        Authorization: `Token ${token}`
      }
      // data: body1.file
      // file: body1
      // body1
      
    }

    axios(config, formData)
    .then(function (response) {
      console.log(response)
      // data = response.data
      // setUserData(data)
      // handleModal()
    })
    .catch(function (error) {
      console.log(error)
      history.push('/login')
    })


    console.log('successful files:', result.successful)
    console.log('failed files:', result.failed)
  })

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.avatar) {
      // if (selectedUser !== null && selectedUser.avatar.length) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser.avatar}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <>
        <Avatar
          initials
          color={color}
          className='rounded mt-3 mb-2'
          content={selectedUser.first_name + selectedUser.last_name}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px',
            position: 'relative'
          }}
        />
        <Button.Ripple className='btn-icon rounded-circle' color='flat-success'  onClick={() => setVisibility(!visibility)} style={{
            position: 'absolute',
            top: '26%',
            right: '32%'
          }}>
        <Edit2 size={12} />
        </Button.Ripple>

        <Modal isOpen={visibility} toggle={() => setVisibility(!visibility)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setVisibility(!visibility)}>Modal title</ModalHeader>
          <ModalBody>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'> Restrictions</CardTitle>
            </CardHeader>
            <CardBody>
              {/* <CardText>
                Use prop <code>restrictions</code> add upload restrictions like <code>maxNumberOfFiles</code> &
                <code>allowedFileTypes</code>. Refer this{' '}
                <a href='https://uppy.io/docs/uppy/#restrictions' target='_blank' rel='noopener noreferrer'>
                  link
                </a>{' '}
                for more info.
              </CardText> */}
              <DragDrop uppy={uppy} />
              {renderPreview()}
            </CardBody>
          </Card>
          </ModalBody>
        <ModalFooter>
          <Button color='primary'  outline>
          {/* <Button color='primary' onClick={() => setVisibility(!visibility)} outline> */}
            Submit
          </Button>
        </ModalFooter>
      </Modal>

        </>
      )
    }
  }
  const { register, errors, handleSubmit, control } = useForm()

  const onSubmit = data => {
    console.log(data)
    const d = {
      email: data.email,
      // password: "Abacies@Test@123"
      first_name: data.first_name,
      last_name: data.last_name, 
      // user_role: parseInt(data.user_role.value),
      // user_role: data.user_role,
      company: data.company, 
      title: data.title
    }
    console.log(d)
    const config = {
      method: 'put',
      url: `https://digital-oasis-dev.herokuapp.com/v3/user/edit_user_details/${selectedUser.id}`,
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
        // userList()
        // userCount()
        setShow(false)
        getUser()
        // setUserList(response.data)
        // console.log(response.data.data)
        // console.log(userCountList)
      }
      console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
    })


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

  const handleReset = () => {
    reset({
      username: selectedUser.username,
      lastName: selectedUser.fullName.split(' ')[1],
      firstName: selectedUser.fullName.split(' ')[0]
    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser.name}</h4>
                  {selectedUser !== null ? (
                   
                    <Badge color={status[selectedUser.user_role].color} className='text-capitalize'>
                      {status[selectedUser.user_role].title}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Name: </span>
                  <span>{selectedUser.first_name}&nbsp;{selectedUser.last_name}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Email: </span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Company: </span>
                  <span>{selectedUser.company}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Designation: </span>
                  <span>{selectedUser.title}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Status: </span>
                  <Badge className='text-capitalize' color={is_active[`${active}`].color}>
                    {is_active[`${active}`].title}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Role: </span>
                  <span>{status[selectedUser.user_role].title}</span>
                </li>
                
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>

            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <FormGroup>
                  <Label className='form-label' for='first_name'>First Name</Label>
                  <Input
                    id='first_name'
                    name='first_name'
                    innerRef={register({ required: true })}
                    invalid={errors.first_name && true}
                    placeholder='Bruce' 
                    defaultValue={selectedUser.first_name}
                  />
                </FormGroup>
              </Col>
              <Col md={6} xs={12}>
                <FormGroup>
                  <Label className='form-label' for='last_name'>Last Name</Label>
                  <Input
                    id='last_name'
                    name='last_name'
                    innerRef={register({ required: true })}
                    invalid={errors.last_name && true}
                    placeholder='Wayne' 
                    defaultValue={selectedUser.last_name}
                  />
                </FormGroup>
              </Col>
              
              <Col md={12} xs={12}>
                <FormGroup>
                  <Label className='form-label' for='email'>Email</Label>
                  <Input
                    id='email'
                    name='email'
                    innerRef={register({ required: true })}
                    invalid={errors.email && true}
                    placeholder='bruce.wayne@email.com' 
                    defaultValue={selectedUser.email}
                  />
                </FormGroup>
              </Col>
              <Col md={6} xs={12}>
                <FormGroup>
                  <Label className='form-label' for='company'>Company</Label>
                  <Input
                    id='company'
                    name='company'
                    innerRef={register({ required: false })}
                    invalid={errors.company && true}
                    placeholder='TNC' 
                    defaultValue={selectedUser.company}
                  />
                </FormGroup>
              </Col>
              <Col md={6} xs={12}>
              <FormGroup>
                  <Label className='form-label' for='title'>Title</Label>
                  <Input
                    id='title'
                    name='title'
                    innerRef={register({ required: false })}
                    invalid={errors.title && true}
                    placeholder='Manager' 
                    defaultValue={selectedUser.title}
                  />
                </FormGroup>
              </Col>
              {/* <Col md={12} xs={12} style={{marginTop:'10px'}}>
              <Repeater count={count}>
                {i => {
                  const Tag = i === 0 ? 'div' : SlideDown
                  return (
                    <Tag key={i}>
                      <Form>
                        <Row className='justify-content-between align-items-center'>
                          <Col md={5}>
                            <FormGroup>
                              <Label for={`animation-item-name-${i}`}>Key</Label>
                              <Input type='text' id={`animation-item-name-${i}`} placeholder='Designation' />
                            </FormGroup>
                          </Col>
                          <Col md={5}>
                            <FormGroup>
                              <Label for={`animation-cost-${i}`}>Value</Label>
                              <Input type='text' id={`animation-cost-${i}`} placeholder='Manager' />
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
              </Col> */}
              {/* <Button.Ripple className='btn-icon' color='primary' onClick={increaseCount} style={{marginTop:'10px', marginLeft:'15px'}}>
                <Plus size={14} />
                <span className='align-middle ml-25'>Add New</span>
              </Button.Ripple> */}

              
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary' style={{marginRight: '20px'}}>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
