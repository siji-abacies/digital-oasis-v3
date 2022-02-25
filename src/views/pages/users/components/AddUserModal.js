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
  // import { useForm } from 'react-hook-form'
  import classnames from 'classnames'
  
  import 'uppy/dist/uppy.css'
  import '@uppy/status-bar/dist/style.css'
import { date } from 'yup'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
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

  const AddNewModal = ({ show, setShow, userList, userCount }) => {
    const history = useHistory
  const token = localStorage.getItem('token')

    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [useremail, setUserEmail] = useState('')
    const [userrole, setUserRole] = useState('')
    const [company, setCompany] = useState('')
    const [title, setTitle] = useState('')

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
    // const {
    //     reset,
    //     control,
    //     setError,
    //     handleSubmit,
    //     formState: { errors }
    //   } = useForm({
    //     // defaultValues: {
    //     //   username: selectedUser.name,
    //     //   // lastName: selectedUser.fullName.split(' ')[1],
    //     //   // firstName: selectedUser.fullName.split(' ')[0]
    //     //   // username: 'Test',
    //     //   lastName: 'LastName',
    //     //   firstName: 'First name'
    //     // }
    //   })
      
    // const onSubmit = data => {
    //     // data.preventDefault()
    //     console.log(data)
    //     if (Object.values(data).every(field => field.length > 0)) {
          
    //       setShow(false)
    //     } else {
    //       for (const key in data) {
    //         if (data[key].length === 0) {
    //           setError(key, {
    //             type: 'manual'
    //           })
    //         }
    //       }
    //     }
    //   }
    const { register, errors, handleSubmit, control } = useForm()

    const onSubmit = data => {
      console.log(data)

      const d = {
        email: data.email,
        // password: "Abacies@Test@123"
        first_name: data.first_name,
        last_name: data.last_name, 
        // user_role: parseInt(data.user_role.value),
        user_role: parseInt(data.user_role),
        company: data.company, 
        title: data.title
      }
      console.log(d)

      const config = {
        method: 'post',
        url: 'https://digital-oasis-dev.herokuapp.com/v3/user/invite',
        headers: { 
          ContentType: 'application/json',
          Authorization: `Token ${token}`
        }, 
        data : d
      }
      
      axios(config)
      .then(function (response) {
        console.log(response)
        if (response.data.message === 'success') {
          userList(1)
          userCount()
          setShow(false)
          toast.success(
            <ToastContent message='User Successfully Added' />,
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
        history.push('/login')
      })

      // toast.success(<SuccessToast data={data} />, { hideProgressBar: true })
    }


    // const handleSubmit = event => {
    //   event.preventDefault()
    //   console.log(firstName, lastName, useremail, userrole, company, title)
    //   console.log("sumbit")
    // }

    return (
    <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Add New User</h1>
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
                  />
                </FormGroup>
              </Col>
              <Col md={12} xs={12}>
                <FormGroup>
                  <Label className='form-label' for='email'>Email</Label>
                  
                  <Input 
                    type='email' 
                    id='email'
                    name='email'
                    innerRef={register({ required: true, validate: value => value !== '' })}
                    invalid={errors.email && true}
                    placeholder='bruce.wayne@email.com'
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
                    control={control}
                    name='user_role'
                    options={role} 
                    innerRef={register({ required: true })} 
                    invalid={errors.user_role && true}
                    className={classnames('react-select', { 'is-invalid': data !== null && data.ReactSelect === null })}
                    classNamePrefix='select'
                    theme={selectThemeColors} 
                    defaultValue={role[0]}
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