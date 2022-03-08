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
    FormGroup,
    ListGroup,
    ListGroupItem,
    UncontrolledAlert,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
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
import Avatar from '@components/avatar'

const PERMISSIONS = [
  { value: 1, label: 'Create Project'}, 
  { value: 2, label: 'Clock Manager'}, 
  { value: 3, label: 'Add Clients'}, 
  { value: 4, label: 'Add Presenters'}, 
  { value: 5, label: 'Add Crew'}, 
  { value: 6, label: 'Schedule Builder'}, 
  { value: 7, label: 'Room Builder'}, 
  { value: 8, label: 'Layout Editor'}, 
  { value: 9, label: 'Share Room'}, 
  { value: 10, label: 'Presenter'}, 
  { value: 11, label: 'MultiRoom'}, 
  { value: 12, label: 'System Startup'}, 
  { value: 13, label: 'System Shutdown'}, 
  { value: 14, label: 'IFB'}, 
  { value: 15, label: 'Agenda Control'} 
  
]

const userRoles = [
  { value: '1', label: 'System Admin', color: '#00B8D9', isFixed: true },
  { value: '2', label: 'Client', color: '#0052CC', isFixed: true },
  { value: '3', label: 'Crew', color: '#5243AA', isFixed: true }
]

const role = {
  1: { title: 'System Admin', color: 'light-success' },
  2: { title: 'Crew', color: 'light-warning' },
  3: { title: 'Client', color: 'light-primary' }
}

const AddNewModal = ({ show, setShow, type, getProjectList, ToastContent }) => {
  const history = useHistory()
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const { id } = useParams()

  const [memberPrevileges, setMemberPrevileges] = useState([])

  const [color, setColor] = useState('#3cd6bf')
  const [colorPkr, setColorPkr] = useState('colorPkrClose')
  const [inputData, setInputData] = useState([])
  const showColorPicker = () => {
    const picker1 = colorPkr === 'colorPkrClose' ? 'colorPkrShow' : 'colorPkrClose'
    setColorPkr(picker1)
  }
  const [project_m_id, setProjectMID] = useState([])
  const [project_add_g, setProjectAddGroup] = useState([])
  const getUserFilterByRole = (role) => {
    // /project/members/privilege_groups/<int:project_id>
    const config = {
      method: 'get',
      url: `https://digital-oasis-dev.herokuapp.com/v3/project/members/privilege_groups/${id}`,
      headers: { 
        Authorization: `Token ${getToken()}`
      }
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        // let mem_data = []
        // const member_data = response.data.data
        // mem_data = member_data.map(({id, name}) => {
        //   return {
        //     value: id,
        //     label: name
        //   }
        // })

        setMemberPrevileges(response.data.data)
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
      
  const onChangePrivilege = (index, e) => {
    // console.log(index, e)
    // const values = [...inputFields]
    // values.push({ key: '', value: '' })
    
    const permission_values = []
    e.forEach(element => {
      console.log(element.value)
      // permission_values.push(element.value)
      project_m_id.push(index)
      project_add_g.push(element.value)
      // prj_id.push(index)
    })
    
    const d = {
      project_member_id: project_m_id, 
      remove_groups: [], 
      add_groups: project_add_g
    }
    
    console.log(d)
    inputData.push(d)
    console.log(inputData)
    // [ { "project_member_id": id, "remove_groups": [group_id_1, group_id_2], "add_groups": [permission_group_id] } ]
  }
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(e.target.privileges)
  // }

  const onSubmit = data => {
    console.log(JSON.stringify(inputData))
    // console.log(data)
    // // [ { "project_member_id": id, "remove_groups": [group_id_1, group_id_2], "add_groups": [permission_group_id] } ]
    // if (data.members !== undefined) {
    //   let add_member = []
    //   const remove_member = []
    //   add_member = data.members.map(({value}) => {
    //     return value
    //   })
    //   console.log(add_member)

    //   // console.log("teee")
    //   // console.log(data.members)
    //   // const selectedMembers = data.members
    //   // selectedMembers.forEach(element => {
        
    //   // })
    // }
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
    
    // const config = {
    //   method: 'post',
    //   url: 'https://digital-oasis-dev.herokuapp.com/v3/project?time_zone=Asia/Kolkata',
    //   headers: { 
    //     ContentType: 'application/json',
    //     Authorization: `Token ${token}`
    //   }, 
    //   data : d
    // }
      
    // axios(config)
    // .then(function (response) {
    // console.log(response)
    // if (response.data.status === 200) {
    //   getProjectList(1)
    //   setShow(false)
    //   toast.success(
    //   <ToastContent message='Project Successfully Added' />,
    //     { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
    //   )
    //   } else if (response.data.status === 409) {
    //     toast.success(
    //     <ToastContent message={response.data.message} />,
    //       { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
    //     )
    //   }
    //     // console.log(JSON.stringify(response.data))
    // })
    // .catch(function (error) {
    //   console.log(error)
    //   // history.push('/login')
    // })


  }

    return (
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
      <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
      <ModalBody className='px-sm-5 pt-50 pb-5'>
        <div className='text-center mb-2'>
          <h1 className='mb-1'>Privilege Settings</h1>
        </div>
        {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
        {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
        <Form onSubmit={onSubmit}>
        {/* <p className='fw-bolder pt-50 mt-2'>12 Members</p> */}
          <ListGroup flush className='mb-2'>
            {memberPrevileges.map((item, index) => {
              return (
                <ListGroupItem key={item.id} className='d-flex align-items-start border-0 px-0'>
                  
                  <Avatar className='me-75' content={item.name} initials imgHeight={38} imgWidth={38} style={{marginRight: '0.75rem'}}/>
                  <div className='d-flex align-items-center justify-content-between w-100'>
                    <div className='me-1'>
                      <h5 className='mb-25'>{item.name}</h5>
                      <span>{role[item.user_role].title} </span>
                    </div>
                    <Col md='6'>
                      <input hidden value={item.id} name={`project_member_[${item.id}]`} ref={register} type="text" className={`form-control`} />
                      {/* <input name={`project_member_[${item.id}]`} ref={register} type="text" className={`form-control ${errors.tickets?.[i]?.name ? 'is-invalid' : '' }`} /> */}
                      {/* <Input
                        id='project_member'
                        name={`project_member_${item.id }`}
                        // innerRef={register(`test.${index}.project_member${item.id }`)}
                        value={item.id} 
                        // control={control} 
                        hidden
                      /> */}
{/*                       
                      <Controller
                        isClearable 
                        as={Select}
                        id={`react-select_${item.id}`}
                        // control={control}
                        // name='groups'
                        name={`groups_${item.id }`}
                        options={PERMISSIONS}
                        // innerRef={register(`test.${index}.groups_${item.id }`)}
                        // className={invalid}
                        // className={classnames('react-select', { 'is-invalid': data !== null && data.privileges === null })}
                        classNamePrefix='select'  isMulti 
                        theme={selectThemeColors}
                      /> */}

                    {/* <Controller isClearable 
                        as={Select} 
                        isMulti 
                        control={control} 
                        options={PERMISSIONS}
                        name={`privileges[${item.id}]`} ref={register} className={`form-control`} /> */}
                    <Select
                      isClearable={false}
                      theme={selectThemeColors}
                      // defaultValue={[userRoles[2], userRoles[3]]}
                      isMulti
                      name='privileges'
                      id={`react-select_${item.id}`}
                      options={PERMISSIONS}
                      className='react-select mb-1'
                      classNamePrefix='select' 
                      onChange={event => {
                        onChangePrivilege(item.id, event)
                      }}
                    />
                    </Col>
                    
                  </div>
                </ListGroupItem>
              ) 
             })}
          </ListGroup>
          {/* <Row className='gy-1 pt-75'>
            <Col className='mb-1' md='6' sm='12'>
              <Label><h4>Users</h4></Label>
              

              <Row className='mb-1'>
                <Avatar className='mr-1' color={`light-primary`} content={'Project Name'} initials  imgHeight={40} imgWidth={40}/>

                <Avatar className='mr-1' img='http://localhost:3000/static/media/avatar-s-10.79a4ca26.jpg' imgHeight={40} imgWidth={40} />
                <div className='profile-user-info'>
                  <h6 className='mb-0'>Bailie Coulman</h6>
                  <small className='text-muted'>System Admin</small>
                </div>
              
              </Row>
              <Row className='mb-1'>
                <Avatar className='mr-1' color={`light-primary`} content={'Project Name'} initials  imgHeight={40} imgWidth={40}/>

                <Avatar className='mr-1' img='http://localhost:3000/static/media/avatar-s-10.79a4ca26.jpg' imgHeight={40} imgWidth={40} />
                <div className='profile-user-info'>
                  <h6 className='mb-0'>Bailie Coulman</h6>
                  <small className='text-muted'>System Admin</small>
                </div>
              
              </Row>
              <Row className='mb-1'>
                <Avatar className='mr-1' color={`light-primary`} content={'Project Name'} initials  imgHeight={40} imgWidth={40}/>

                <Avatar className='mr-1' img='http://localhost:3000/static/media/avatar-s-10.79a4ca26.jpg' imgHeight={40} imgWidth={40} />
                <div className='profile-user-info'>
                  <h6 className='mb-0'>Bailie Coulman</h6>
                  <small className='text-muted'>System Admin</small>
                </div>
              
              </Row>
            </Col>
            <Col className='mb-1' md='6' sm='12'>
              <Label>Privileges</Label>
              <Select
              isClearable={false}
              theme={selectThemeColors}
              defaultValue={[userRoles[2], userRoles[3]]}
              isMulti
              name='colors'
              options={userRoles}
              className='react-select mb-1'
              classNamePrefix='select'
              />
            <Select
              isClearable={false}
              theme={selectThemeColors}
              defaultValue={[userRoles[2], userRoles[3]]}
              isMulti
              name='colors'
              options={userRoles}
              className='react-select mb-1'
              classNamePrefix='select'
            />
            <Select
              isClearable={false}
              theme={selectThemeColors}
              defaultValue={[userRoles[2], userRoles[3]]}
              isMulti
              name='colors'
              options={userRoles}
              className='react-select mb-1'
              classNamePrefix='select'
            />
            </Col>
          </Row> */}
          <Row>
            
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