// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { Globe, Plus, Music } from 'react-feather'
import AvatarGroup from '@components/avatar-group'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import UserModule from './UserModule'
import PresenterModule from './PresenterModule'
import Room from './Room'
import Agenda from './Agenda'
import Avatar from '@components/avatar'

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
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink, Dropdown, 
  Media
} from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Projects = () => {

  const [active, setActive] = useState('1')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const toggle = tab => {
    setActive(tab)
  }

  const data = [
    {
      title: 'Vinnie Mostowy',
      img: require('@src/assets/images/portrait/small/avatar-s-5.jpg').default
    },
    {
      title: 'Elicia Rieske',
      img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default
    },
    {
      title: 'Julee Rossignol',
      img: require('@src/assets/images/portrait/small/avatar-s-10.jpg').default
    },
    {
      title: 'Darcey Nooner',
      img: require('@src/assets/images/portrait/small/avatar-s-11.jpg').default
    },
    {
      title: 'Jenny Looper',
      img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default
    }
  ]

  return (
    <Fragment>
      <Row>
        <Col md='12'>
          <Card className='card-browser-states' style={{border: '2px solid Orange'}}>
          <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
            <Media>
              <Avatar className='mr-1' color={`light-primary`} content={'Project Name'} initials  imgHeight={45} imgWidth={45}/>

              {/* <Avatar className='mr-1' img='http://localhost:3000/static/media/avatar-s-10.79a4ca26.jpg' imgHeight={40} imgWidth={40} /> */}
              <CardTitle  className='mb-0' tag='h4' style={{marginTop: '5px'}}><h2 className='project-view-color'>Project Name</h2></CardTitle>
            </Media>
            <div className='d-flex mt-md-0 mt-1'>
              
              <Button className='ml-2 upload-button' color='primary' >
                <Music size={15}/>
                <span className='align-middle ml-50'>Upload Audio</span>
              </Button>
              
            </div>
          </CardHeader>
            <CardBody>
              
              <div className='mt-1'>
                
                <Row>
                  <Col md='3'>
                    <p className='project-view-color'><strong>Created By:</strong> John Doe</p>
                    <p className='project-view-color'><strong>Job Number:</strong> #123DB</p>
                  </Col>
                  <Col md='3'>
                    <p className='project-view-color'><strong>Date:</strong> 14-02-2022</p>
                  </Col>
                  <Col md='6' style={{textAlign:'right'}}>
                    <p className='project-view-color' style={{lineHeight: '0.5rem'}}><strong>Rooms:</strong> 10</p>
                    <p className='project-view-color' style={{lineHeight: '0.5rem'}}><strong>Users:</strong> 10</p>
                    <p className='project-view-color' style={{lineHeight: '0.5rem'}}><strong>Presenters:</strong> 10</p>
                  </Col>
                
                
                <Col md={6}>
                <Media>
                  <Globe size={34} className='mr-2' color='#28C76F'/>
                  <Media className='my-auto' body>
                    <h4 className='mb-0 timezone-color'>Asia/Kolkata</h4>
                    <CardText className='font-small-3 mb-0 timezone-color'>Friday, February 10, 2022</CardText>
                  </Media>
                </Media>
                </Col>
                
                
                </Row>
                
                
              </div>
            
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md='12'>
          <Card className='card-browser-states'>
            
            <CardBody>
            <Nav pills>
              <NavItem>
                <NavLink
                  active={active === '1'}
                  onClick={() => {
                    toggle('1')
                  }}
                >
                  User Module
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '2'}
                  onClick={() => {
                    toggle('2')
                  }}
                >
                  Presenter Module
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '3'}
                  onClick={() => {
                    toggle('3')
                  }}
                >
                  Rooms
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '4'}
                  onClick={() => {
                    toggle('4')
                  }}
                >
                  Agenda
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === '5'}
                  onClick={() => {
                    toggle('5')
                  }}
                >
                  Control Room Config
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent className='py-50' activeTab={active}>
              <TabPane tabId='1'>
                <UserModule></UserModule>
                
              </TabPane>
              <TabPane tabId='2'>
                <PresenterModule></PresenterModule>
              </TabPane>
              <TabPane tabId='3'>
                <Room></Room>
              </TabPane>
              <TabPane tabId='4'>
                <Agenda></Agenda>
              </TabPane>
              <TabPane tabId='5'>
                <p>
                  Carrot cake dragée chocolate. Lemon drops ice cream wafer gummies dragée. Chocolate bar liquorice cheesecake
                  cookie chupa chups marshmallow oat cake biscuit. Dessert toffee fruitcake ice cream powder tootsie roll
                  cake.Chocolate bonbon chocolate chocolate cake halvah tootsie roll marshmallow. Brownie chocolate toffee
                  toffee jelly beans bonbon sesame snaps sugar plum candy canes.
                </p>
              </TabPane>
            </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
    </Fragment>
    
  )
}

export default Projects
