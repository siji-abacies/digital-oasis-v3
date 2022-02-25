// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
// import { getUser } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
// import UserTabs from './Tabs'
import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'

import axios from 'axios'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UserView = () => {
  // ** Store Vars
  const store = useSelector(state => state.users)
  const [selectedUser, setSelectedUser] = useState([])

//   const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    console.log("test ")

    const token = "eyJhbGciOiJIUzUxMiIsImlhdCI6MTY0NDM4MDg0MywiZXhwIjoxNjQ0OTg1NjQzfQ.eyJpZCI6NywidXNlcl9yb2xlIjoxfQ.IyzNMBX9p9vXn5mas5emwjzMgF2i6sVi7R74_A6RSqrSHB38SduYb2ub73zNh8jqTMCjHp-c_kJmm15USqomMA"

    // const pg = currentPage 
    // console.log(pg)
    let data = []
    const config = {
      method: 'get',
      url: `https://w-call-demo02.herokuapp.com/user/my_profile`,
      headers: { 
        Authorization: `Token ${token}` 
      }
    }

    axios(config)
    .then(function (response) {
      console.log(response.data)
      data = response.data.data
      setSelectedUser(response.data.data)
    })
    .catch(function (error) {
      console.log(error)
    })


    // dispatch(getUser(parseInt(id)))
  }, [])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  console.log(selectedUser)
  return selectedUser.length !== 0 ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard  selectedUser={selectedUser}/>
          
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          {/* <UserTabs active={active} toggleTab={toggleTab} /> */}
        </Col>
      </Row>
    </div>
    ) : (
    <Alert color='danger'>
    <h4 className='alert-heading'>User not found</h4>
        <div className='alert-body'>
        {/* User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link> */}
       </div>
    </Alert>
    )
  

//   store.selectedUser !== null && store.selectedUser !== undefined ? (
    // <div className='app-user-view'>
    //   <Row>
    //     <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
    //       <UserInfoCard  />
    //       <PlanCard />
    //     </Col>
    //     <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
    //       {/* <UserTabs active={active} toggleTab={toggleTab} /> */}
    //     </Col>
    //   </Row>
    // </div>
//   ) : (
//     <Alert color='danger'>
//       <h4 className='alert-heading'>User not found</h4>
//       <div className='alert-body'>
//         User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
//       </div>
//     </Alert>
//   )
}
export default UserView
