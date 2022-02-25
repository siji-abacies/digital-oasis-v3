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
  import { selectThemeColors } from '@utils'
  import { toast, Slide } from 'react-toastify'
import { useHistory } from 'react-router-dom'

  const AddNewModal = ({ show, setShow, userData, userList, permissions, ToastContent }) => {
    const history = useHistory()
    const [invalid, setInvalid] = useState('')
    let p = []
    if (userData.length !== 0) {
      const a = userData.permissions
      console.log(a)
      p = a.map(({id, name}) => {
        return {
          value: id,
          label: name
        }
      })
    }
   
    const token = localStorage.getItem('token')
  
    const { register, errors, handleSubmit, control } = useForm()

      
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
            method: 'put',
            url: `https://digital-oasis-dev.herokuapp.com/v3/permission/group/${userData.id}`,
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
                <ToastContent message={'Group Updated'} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
              )
              userList(1)
              setShow(false)
            }
            console.log(JSON.stringify(response.data))
          })
          .catch(function (error) {
            console.log(error)
            history.push()
          })
      }
    }

    return (
    <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
      <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
      <ModalBody className='px-sm-5 pt-50 pb-5'>
        <div className='text-center mb-2'>
          <h1 className='mb-1'>Edit Group</h1>
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
                  defaultValue={userData.name}
                />
              </FormGroup>
            </Col>
              
            <Col md={12} xs={12}>
              <FormGroup>
                <Label for='react-select'>Select Previlege</Label>
                <Controller
                  isClearable
                  as={Select}
                  id='privileges'
                  control={control}
                  name='privileges'
                  options={permissions}
                  isMulti 
                  className={invalid}
                  classNamePrefix='select'
                  theme={selectThemeColors} 
                  defaultValue={p}
                />
              </FormGroup>
            </Col>
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