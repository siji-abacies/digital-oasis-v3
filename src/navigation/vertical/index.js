import { Users, Home, Tag, Settings } from 'react-feather'

export default [
  // {
  //   id: 'home',
  //   title: 'Home',
  //   icon: <Home size={20} />,
  //   navLink: '/home'
  // },
  {
    id: 'projects',
    title: 'Projects',
    icon: <Home size={20} />,
    navLink: '/projects'
  },
  {
    id: 'users',
    title: 'Users',
    icon: <Users size={20} />,
    navLink: '/users'
  }, 
  {
    id: 'tag-management',
    title: 'Tag Management',
    icon: <Tag size={20} />,
    navLink: '/tag-management'
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <Settings size={20} />,
    navLink: '/settings'
  }
]
