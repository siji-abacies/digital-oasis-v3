import { useEffect, useState} from 'react'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Input,
    Label,
    Button,
    Modal, 
    ModalBody, 
    ModalHeader, 
    Form, 
    FormGroup
  } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import Select, { components } from 'react-select'
import Flatpickr from 'react-flatpickr'
import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { selectThemeColors, getToken } from '@utils'
import ReactColorPicker from '@super-effective/react-color-picker'
import axios from 'axios'
import classnames from 'classnames'
import moment from 'moment'
import { useHistory, useParams } from 'react-router-dom'
import { toast, Slide } from 'react-toastify'

import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import { useDispatch } from 'react-redux'

const role = [
  { value: 1, label: 'System Admin'}, 
  { value: 2, label: 'Crew'}, 
  { value: 3, label: 'Client'}  
]

//  {}
  // 1: { title: 'System Admin', color: 'light-success' },
  // 2: { title: 'Crew', color: 'light-warning' },
  // 3: { title: 'Client', color: 'light-primary' }
// }

const AddNewModal = ({ show, setShow, getProjectMembers, ToastContent }) => {
  const history = useHistory()
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const { id } = useParams()

  const [members, setMembers] = useState([])

  const [color, setColor] = useState('#3cd6bf')
  const [colorPkr, setColorPkr] = useState('colorPkrClose')

  const showColorPicker = () => {
    const picker1 = colorPkr === 'colorPkrClose' ? 'colorPkrShow' : 'colorPkrClose'
    setColorPkr(picker1)
  }

  const getUserFilterByRole = (role) => {
    // /user/filter_by_role?user_role=2
    console.log(role)
    const r = role === undefined ?  1 : role
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/user/filter_by_role?user_role=${r}`,
      headers: { 
        Authorization: `Token ${getToken()}`
      }
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        let mem_data = []
        const member_data = response.data.data
        mem_data = member_data.map(({id, name, user_role}) => {
          return {
            value: id,
            label: name,
            role: user_role
          }
        })

        setMembers(mem_data)
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

  const onChangeRole = (updateRole) => {
    getUserFilterByRole(updateRole.value)
  }

  useEffect(() => {
    getUserFilterByRole(1)
    
  }, [dispatch])

  const { register, errors, handleSubmit, control } = useForm()
      
  const onSubmit = data => {
    console.log(data)
    if (data.members !== undefined) {
      console.log("teee")
      console.log(data.members)
      // {"remove_members": [user_id, user_id], "add_members": [{"id": user_id1, "user_role": 1}]}
      let add_member = []
      const remove_member = []
      console.log(data.members)
      // const member_data = response.data.data
      add_member = data.members.map(({value}) => {
          return value
      })
      console.log(add_member)

      const d = {
        add_members: add_member,
        remove_members : remove_member
      }

      const config = {
        method: 'post',
        url: `https://digital-oasis-dev.herokuapp.com/v3/project/members/add_remove/${id}`,
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
        getProjectMembers()
        setShow(false)
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

      // const selectedMembers = data.members
      // selectedMembers.forEach(element => {
        
      // })
    }
    // console.log(data.build_date, moment(data.build_date[0]).format("Y-MM-D HH:mm:ss"))
    // const d = {
    //   name: data.project_name,
    //   description: data.description,
    //   job_number: data.project_number, 
    //   color: data.color, 
    //   type_: parseInt(data.type), 
    //   build_at: moment(data.build_date[0]).format("Y-MM-D")
    // }
    // console.log(d)
      
  }

    return (
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
      <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
      <ModalBody className='px-sm-5 pt-50 pb-5'>
        <div className='text-center mb-2'>
          <h1 className='mb-1'>Add Users By Role</h1>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className='gy-1 pt-75'>
          <Col className='mb-1' md='12' sm='12'>
            <Label>Select User Role</Label>
              {/* <Controller
                as={Input}
                type='select'
                name='type'
                id='type' 
                control={control}
                innerRef={register({ required: true })}
                // onChange={onChangeRole}
                onChange={e => {
                  onChangeRole(e)
                }} 
                // invalid={data !== null && (data.status === undefined || data.status === null)}
              >
                <option value='1'>System Admin</option>
                <option value='2'>Crew</option>
                <option value='3'>Client</option>
                    
              </Controller> */}
            <Select
              isClearable={false}
              theme={selectThemeColors}
              // defaultValue={[userRoles[2], userRoles[3]]}
              // isMulti
              name='colors'
              options={role}
              className='react-select'
              classNamePrefix='select' 
              onChange={e => {
                onChangeRole(e)
              }} 
            />
          </Col>
          <Col className='mb-1' md='12' sm='12'>
            <Label>Add Users</Label>
            <Controller
                isClearable 
                as={Select}
                id='react-select'
                control={control}
                name='members'
                options={members}
                // className={invalid}
                // className={classnames('react-select', { 'is-invalid': data !== null && data.privileges === null })}
                classNamePrefix='select'  isMulti 
                theme={selectThemeColors}
              />
            {/* <Select
              isClearable={false}
              theme={selectThemeColors}
              // defaultValue={[users[2], users[3]]}
              isMulti
              name='colors'
              // options={users}
              className='react-select'
              classNamePrefix='select'
            /> */}
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
        </Form>
      </ModalBody>
      </Modal>

)
}

export default AddNewModal