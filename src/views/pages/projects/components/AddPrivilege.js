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
    ListGroup,
    ListGroupItem
  } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import Select, { components } from 'react-select'
import { selectThemeColors, getToken } from '@utils'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { toast, Slide } from 'react-toastify'

import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import { useDispatch } from 'react-redux'
import Avatar from '@components/avatar'

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
  const [memberPrevileges, setMemberPrevileges] = useState([])
  const [inputData, setInputData] = useState([])

  const getUserFilterByRole = () => {
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

        setMemberPrevileges(response.data.data)
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
    getUserFilterByRole()
    
  }, [])

  const { register, errors, handleSubmit, control } = useForm()
      
  const onChangePrivilege = (index, e, selected_permissions, item_permi_grp) => {
    // console.log(selected_permissions)
    // console.log(e)
    const result = selected_permissions.filter(o1 => !e.some(o2 => o1.value === o2.value))
    const new_mem = e.filter(o1 => !selected_permissions.some(o2 => o1.value === o2.value))
    // console.log(result)
    // console.log(new_mem)
    
    // console.log(memberPrevileges)
    const mem_priv = memberPrevileges.map(({id}) => {
      return {
        project_member_id : id,
        remove_groups: [], 
        add_groups: []
      }
    })
    // console.log(mem_priv)
    mem_priv.forEach(element => {
      if (element.project_member_id === index) {
        result.forEach(elmt => { 
          element.remove_groups.push(elmt.value)
        })

        new_mem.forEach(elmt => {
          element.add_groups.push(elmt.value)
        })
      }
      
    })
    // console.log(mem_priv)
    if (inputData.length > 0) {
      // console.log(inputData, mem_priv)
      
      inputData.forEach(element => {
        if (mem_priv.some(prev => prev.project_member_id === element.project_member_id)) {
          const mem_data = mem_priv.filter((p) => p.project_member_id === element.project_member_id)
          const add_gp = mem_data[0].add_groups
          const rmv_gp = mem_data[0].remove_groups
          
          add_gp.forEach(add_el => {
            if (element.add_groups.some(el => el === add_el)) {

            } else {
              element.add_groups.push(add_el)
            }
          })
          
          rmv_gp.forEach(rmv_el => {
            if (element.remove_groups.some(el => el === rmv_el)) {

            } else {
              element.remove_groups.push(rmv_el)
            }
          })
        } else {
          console.log("no")
        }
        
      })
    } else {
      setInputData(mem_priv)
    }
    console.log(inputData)
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
      setShow(false)
      getProjectList(1, 10)
      setInputData([])
      getUserFilterByRole()

      toast.success(
      <ToastContent message='Privileges Updated' />,
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


  }

  // console.log(memberPrevileges)
  return (
    <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
      <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
      <ModalBody className='px-sm-5 pt-50 pb-5'>
        <div className='text-center mb-2'>
          <h1 className='mb-1'>Privilege Settings</h1>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <p className='fw-bolder pt-50 mt-2'>12 Members</p> */}
        {memberPrevileges.length > 0 && (
          <ListGroup flush className='mb-2'>
            
            {memberPrevileges.map((item, index) => {

              // console.log(memberPrevileges)
              const selected_p = []
              item.permission_groups.forEach(element => {
                selected_p.push({
                  value: element.permission_group_id,
                  label: element.name
                })
              })
              // console.log(selected_p)
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