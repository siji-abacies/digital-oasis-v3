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
import { element } from 'prop-types'
import { inArray } from 'jquery'

// const PERMISSIONS = [
//   { value: 1, label: 'Create Project'}, 
//   { value: 2, label: 'Clock Manager'}, 
//   { value: 3, label: 'Add Clients'}, 
//   { value: 4, label: 'Add Presenters'}, 
//   { value: 5, label: 'Add Crew'}, 
//   { value: 6, label: 'Schedule Builder'}, 
//   { value: 7, label: 'Room Builder'}, 
//   { value: 8, label: 'Layout Editor'}, 
//   { value: 9, label: 'Share Room'}, 
//   { value: 10, label: 'Presenter'}, 
//   { value: 11, label: 'MultiRoom'}, 
//   { value: 12, label: 'System Startup'}, 
//   { value: 13, label: 'System Shutdown'}, 
//   { value: 14, label: 'IFB'}, 
//   { value: 15, label: 'Agenda Control'} 
  
// ]

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

const AddNewModal = ({ show, setShow, getProjectList, PERMISSIONS, ToastContent}) => {
  const history = useHistory()
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const { id } = useParams()
// console.log(memberPrevileges)
  const [memberPrevileges, setMemberPrevileges] = useState([])

  const [color, setColor] = useState('#3cd6bf')
  const [colorPkr, setColorPkr] = useState('colorPkrClose')
  const [inputData, setInputData] = useState([])
  const [permission_gid, setPermissionGID] = useState([])
  const showColorPicker = () => {
    const picker1 = colorPkr === 'colorPkrClose' ? 'colorPkrShow' : 'colorPkrClose'
    setColorPkr(picker1)
  }
  const [project_m_id, setProjectMID] = useState([])
  const [project_add_g, setProjectAddGroup] = useState([])
  const [selected_grp, setSelectedgroup] = useState([])
  

  // const onChangeRole = (updateRole) => {
  //   getUserFilterByRole(updateRole.value)
  // }

  const getUserFilterByRole = () => {
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

  useEffect(() => {
    getUserFilterByRole()
    
  }, [])

  const { register, errors, handleSubmit, control } = useForm()
      
  const onChangePrivilege = (index, e, selected_permissions, item_permi_grp) => {
    console.log(selected_permissions)
    console.log(e)
    console.log(inputData)
    console.log(item_permi_grp)
    const slt_values = []
    e.forEach(element => {
      slt_values.push(element.value)
      
    })
    // console.log(remove_group)
    const permission_values = []
    let d = []
    const grup = []
    const project_mg_id = []
    
    //if inputData exist pushing project manager_id 
    inputData.forEach(element => { 
      project_mg_id.push(element.project_member_id)
    })

    if (inputData.length > 0) {
      console.log('greaterthan 0')
      if (project_mg_id.find(element => element === index)) { 
        console.log('yes')
        inputData.forEach(e_value => { 
          // adding add_grops and remove_grp array to project manager
          if (e_value.project_member_id === index) {

            item_permi_grp.forEach(selected_val => { 

              if (selected_permissions.find(sper_element => sper_element.value !== selected_val.value)) { 
                e_value.remove_groups.push(selected_val.value)
              } else {
                console.log('check-no')
                e_value.add_groups.push(selected_val.value)
              }
              
            })
          console.log(inputData)   

          } else {
            console.log('no')
            e.forEach(element => {
              grup.push(element.value)
              d = {
               project_member_id: index, 
               remove_groups: [], 
               add_groups: grup
             }
             inputData.push(d)
            })
        
          }
        })

      }

    } else {
      console.log('lessthan 0')
      e.forEach(element => {
        grup.push(element.value)

         d = {
          project_member_id: index, 
          remove_groups:[], 
          add_groups: grup
        }
        project_mg_id.push(index)
        inputData.push(d)
      })

    }
    
    // [ { "project_member_id": id, "remove_groups": [group_id_1, group_id_2], "add_groups": [permission_group_id] } ]
  }
 
  const onSubmit = () => {
    console.log('onsubmit')
    console.log(inputData)
    
    const config = {
      method: 'post',
      url: `https://digital-oasis-dev.herokuapp.com/v3/project/members/privilege_groups/${id}`,
      headers: { 
        ContentType: 'application/json',
        Authorization: `Token ${getToken()}`
      }, 
      data : inputData
    }
      
    axios(config)
    .then(function (response) {
    console.log(response)
    if (response.data.status === 200) {
      // getProjectList(1)
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
      history.push('/login')
    })


  }

  // console.log(memberPrevileges)
    return (
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
      <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
      <ModalBody className='px-sm-5 pt-50 pb-5'>
        <div className='text-center mb-2'>
          <h1 className='mb-1'>Privilege Settings</h1>
        </div>
        {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
        <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <Form onSubmit={onSubmit}> */}
        {/* <p className='fw-bolder pt-50 mt-2'>12 Members</p> */}
        {memberPrevileges.length > 0 && (
          <ListGroup flush className='mb-2'>
            
            {memberPrevileges.map((item, index) => {

              console.log(memberPrevileges)
              const selected_p = []
              item.permission_groups.forEach(element => {
                selected_p.push({
                  value: element.permission_group_id,
                  label: element.name
                })
              //   setPermissionGID(element.permission_group_id)
              //   console.log(element.permission_group_id)
              // setSelectedgroup(selected_p)
              })
              console.log(selected_p)
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
                      <Select
                      isClearable={false}
                      theme={selectThemeColors}
                      defaultValue={selected_p}
                      isMulti
                      name='privileges'
                      id={`react-select_${item.id}`}
                      options={PERMISSIONS}
                      className='react-select mb-1'
                      classNamePrefix='select' 
                      onChange={event => {
                        onChangePrivilege(item.id, event, selected_p, item.permission_groups)
                      }}
                    />
                    </Col>
                    
                  </div>
                </ListGroupItem>
              ) 
             })}
          </ListGroup>
        )}
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