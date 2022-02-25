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
import '@styles/react/libs/react-select/_react-select.scss'
import { toast, Slide } from 'react-toastify'
import { useHistory } from 'react-router-dom'


const defaultValues = {
  privileges: null
}

  const AddNewModal = ({ show, setShow, userList, permissions, ToastContent }) => {
    const history = useHistory()
  const token = localStorage.getItem('token')
  const [data, setData] = useState(null)
  const [invalid, setInvalid] = useState('')
  
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [useremail, setUserEmail] = useState('')
    const [userrole, setUserRole] = useState('')
    const [company, setCompany] = useState('')
    const [title, setTitle] = useState('')

    const role = [
        { value: '1', label: 'Clock Manager', color: '#00B8D9', isFixed: true },
        { value: '2', label: 'Agenda Control', color: '#0052CC', isFixed: true }
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
    
    const { register, errors, handleSubmit, control } = useForm({ defaultValues })
    // const { handleSubmit, control } = useForm({ defaultValues })

    const onSubmit = data => {
      console.log(data)
      if (data.privileges === null || data.privileges.length === 0) {
        setInvalid('invalid')
      } else {
        setInvalid('')
        const permission = data.privileges.map(p => p.value)

        console.log(permission)

        const d = {
          name: data.group_name,
          permissions: permission
        }
        console.log(d)

        const config = {
          method: 'post',
          url: 'https://digital-oasis-dev.herokuapp.com/v3/permission/group',
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
            toast.success(
              <ToastContent message={'Group Successfully Added'} />,
              { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            setShow(false)
            userList(1)
          }
          console.log(JSON.stringify(response.data))
        })
        .catch(function (error) {
          console.log(error)
          history.push('/login')
        })

      }

      // toast.success(<SuccessToast data={data} />, { hideProgressBar: true })
    }


    // const handleSubmit = event => {
    //   event.preventDefault()
    //   console.log(firstName, lastName, useremail, userrole, company, title)
    //   console.log("sumbit")
    // }

    const colourOptions = [
      { value: 'ocean', label: 'Ocean' },
      { value: 'blue', label: 'Blue' },
      { value: 'purple', label: 'Purple' },
      { value: 'red', label: 'Red' },
      { value: 'orange', label: 'Orange' }
    ]

    return (
    <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Add New Group</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={12} xs={12}>
                <FormGroup>
                  <Label className='form-label' for='first_name'>Group Name</Label>
                  <Input
                    id='group_name'
                    name='group_name'
                    innerRef={register({ required: true })}
                    invalid={errors.group_name && true}
                    placeholder='Bruce'
                  />
                </FormGroup>
              </Col>
              
              <Col md={12} xs={12}>
                                           
                <FormGroup>
                  <Label for='react-select'>Select Privilege</Label>
                  
                  <Controller
                    isClearable 
                    as={Select}
                    id='react-select'
                    control={control}
                    name='privileges'
                    options={permissions}
                    className={invalid}
                    // className={classnames('react-select', { 'is-invalid': data !== null && data.privileges === null })}
                    classNamePrefix='select'  isMulti 
                    theme={selectThemeColors}
                  />
                  {/* <Input
                    isClearable
                    as={Select}
                    id='privileges'
                    control={control}
                    name='privileges'
                    options={permissions}
                    isMulti 
                    // innerRef={register({ required: true })}
                    // className={classnames('react-select', { 'is-invalid': privileges === null })}
                    classNamePrefix='select'
                    theme={selectThemeColors}
                  /> */}
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