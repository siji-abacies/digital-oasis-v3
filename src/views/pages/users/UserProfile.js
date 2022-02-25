// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

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
  const history = useHistory()
  const token = localStorage.getItem('token')

  // ** Store Vars
  const store = useSelector(state => state.users)
  const [selectedUser, setSelectedUser] = useState([])

//   const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  const getUser = () => {
    const config = {
      method: 'get',
      url: 'https://digital-oasis-dev.herokuapp.com/v3/user/my_profile',
      headers: { 
        Authorization: `Token ${token}`
      }
      // data : data
    }
    
    axios(config)
    .then(function (response) {
      console.log(response)
      if (response.data.message === 'Success') {
        
        console.log(response.data)
        const data = response.data.data
        setSelectedUser(response.data.data)
      }
      console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
      history.push('/login')
    })
  }


  // ** Get suer on mount
  useEffect(() => {
   getUser()
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
          <UserInfoCard  selectedUser={selectedUser} getUser={getUser} />
          
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          {/* <UserTabs active={active} toggleTab={toggleTab} /> */}
        </Col>
      </Row>
    </div>
    ) : (
      <div className='app-user-view'></div>
    // <Alert color='danger'>
    // <h4 className='alert-heading'>User not found</h4>
    //     <div className='alert-body'>
    //     {/* User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link> */}
    //    </div>
    // </Alert>
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
