import { Fragment, useState, forwardRef, useEffect } from 'react'
import axios from "axios"

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
  import { useForm, Controller } from 'react-hook-form'
  import Select, { components } from 'react-select'
  import Flatpickr from 'react-flatpickr'
  import Uppy from '@uppy/core'
  import { DragDrop } from '@uppy/react'
  import thumbnailGenerator from '@uppy/thumbnail-generator'
  import { selectThemeColors } from '@utils'
  import ReactColorPicker from '@super-effective/react-color-picker'
  import { toast, Slide } from 'react-toastify'
  
  import 'uppy/dist/uppy.css'
  import '@uppy/status-bar/dist/style.css'
import { useHistory } from 'react-router-dom'
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

  const AddNewModal = ({ show, setShow, userData, userList, userCount }) => { 
    const history = useHistory()
    console.log(userData)
  const token = localStorage.getItem('token')

    const role = [
        { value: '1', label: 'System Admin', color: '#00B8D9', isFixed: true },
        { value: '2', label: 'Crew', color: '#0052CC', isFixed: true },
        { value: '3', label: 'Client', color: '#5243AA', isFixed: true }
      ]

    // const [show, setShow] = useState(false)
    const [picker, setPicker] = useState(new Date())

  const [color, setColor] = useState('#3cd6bf')
  const [colorPkr, setColorPkr] = useState('colorPkrClose')

  const onColorChange = (updatedColor) => {
    setColor(updatedColor)
  }

  const showColorPicker = () => {
    const picker = colorPkr === 'colorPkrClose' ? 'colorPkrShow' : 'colorPkrClose'
    setColorPkr(picker)
  }

  // const getUserData = () => {
  //   const config = {
  //     method: 'get',
  //     url: 'https://digital-oasis-dev.herokuapp.com/v3/user/get_for_edit/<int:id_>',
  //     headers: { 
  //       Authorization: `Token ${token}`
  //     }
  //     // data : data
  //   }
    
  //   axios(config)
  //   .then(function (response) {
  //     console.log(response)
  //     if (response.data.message === 'Success') {
        
  //       setUserList(response.data)
  //       // console.log(response.data.data)
  //       // console.log(userCountList)
  //     }
  //     console.log(JSON.stringify(response.data))
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   })
  // }

  // useEffect(() => {
  //   // getUserData() 
  // })

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
  const { register, errors, handleSubmit, control } = useForm()

      
  const onSubmit = data => {
    console.log(data)
    console.log(userData)

    const role = data.user_role
    const d = {}
    if (data.email !== userData.email) {
      d['email'] = data.email
    }
    if (data.first_name !== userData.first_name) {
      d['first_name'] = data.first_name
    }
    if (data.last_name !== userData.last_name) {
      d['last_name'] = data.last_name
    }
    if (parseInt(role) !== userData.user_role) {
      d['user_role'] = parseInt(role)
    }
    if (data.company !== userData.company) {
      d['company'] = data.company
    }
    if (data.title !== userData.title) {
      d['title'] = data.title
    }
    console.log(d)
    // obj["newKey"] = [];
    // const d = {
    //   email: data.email,
    //   // password: "Abacies@Test@123"
    //   first_name: data.first_name,
    //   last_name: data.last_name, 
    //   user_role: parseInt(data.user_role.value),
    //   // user_role: data.user_role,
    //   company: data.company, 
    //   title: data.title
    // }
    // console.log(d, userData.id)

    const config = {
      method: 'put',
      url: `https://digital-oasis-dev.herokuapp.com/v3/user/edit_user_details/${userData.id}`,
      headers: { 
        ContentType: 'application/json',
        Authorization: `Token ${token}`
      }, 
      data : d
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.message === 'Success') {
        userList(1)
        userCount()
        setShow(false)
        toast.success(
          <ToastContent message='User Successfully Updated' />,
          { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        const user = JSON.parse(localStorage.getItem('userData'))
        console.log(user['id'], user['user_role'])
        if (user['id'] === userData.id) {
          // localStorage.setItem('userData', JSON.stringify(user.data))
          user['user_role'] = parseInt(role)
          localStorage.setItem('userData', JSON.stringify(user))
        }
        console.log(user)
        // localStorage.getItem('token')
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

    // toast.success(<SuccessToast data={data} />, { hideProgressBar: true })
  }
    return (
    <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User</h1>
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
                    defaultValue={userData.first_name}
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
                    defaultValue={userData.last_name}
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
                    defaultValue={userData.email} readOnly
                  />
                </FormGroup>
              </Col>
              <Col md={12} xs={12}>
                <FormGroup>
                  <Label for='react-select'>User Role</Label>
                  <Controller
                    as={Input}
                    type='select'
                    name='user_role'
                    id='user_role' 
                    control={control}
                    defaultValue={userData.user_role}
                    innerRef={register({ required: false })}

                    // invalid={data !== null && (data.status === undefined || data.status === null)}
                  >
                    <option value='1'>System Admin</option>
                    <option value='2'>Crew</option>
                    <option value='3'>Client</option>
                  
                  </Controller>
                  {/* <Controller
                    isClearable
                    as={Select}
                    id='user_role' 
                    value={userData.user_role}
                    control={control}
                    name='user_role'
                    options={role}
                    // className={classnames('react-select', { 'is-invalid': data !== null && data.ReactSelect === null })}
                    classNamePrefix='select'
                    theme={selectThemeColors}
                  /> */}
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
                    defaultValue={userData.company}
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
                    defaultValue={userData.title}
                  />
                </FormGroup>
              </Col>
              {/* <Col md={6} xs={12} className=''> */}
                {/* <FormGroup> */}
                  {/* <input inline type="checkbox" id="checkbox" /> */}
                  {/* <CustomInput
                    inline
                    type='checkbox'
                    name='privilege'
                    id='privilege'
                    value='privilege'
                    label='Privilege'
                    defaultChecked
                  /> */}
                  {/* <CustomInput inline type='checkbox' id='exampleCustomCheckbox' name="privilege" label='Create Project Previlege' defaultChecked /> */}
                {/* </FormGroup>      */}
              {/* </Col> */}
              
            </Row>
            
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
          </Form>
        </ModalBody>
      </Modal>

)
}

export default AddNewModal