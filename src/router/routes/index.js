import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Digital Oasis'

// ** Default Route
const DefaultRoute = '/projects'

// ** Merge Routes
const Routes = [
  {
    path: '/login',
    component: lazy(() => import('../../views/pages/auth/Login')),
    layout: 'BlankLayout'
  }, 
  {
    path: '/privacy-policy',
    component: lazy(() => import('../../views/pages/auth/PrivacyPolicy')),
    layout: 'BlankLayout'
  },
  {
    path: '/register/:token',
    component: lazy(() => import('../../views/pages/auth/Register')),
    layout: 'BlankLayout'
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/pages/auth/ForgotPassword')),
    layout: 'BlankLayout'
  },
  {
    path: '/reset-password/:token',
    component: lazy(() => import('../../views/pages/auth/ResetPassword')),
    layout: 'BlankLayout'
  },
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/users',
    component: lazy(() => import('../../views/pages/users/Users')),
    meta: {
      authRoute: true,
      publicRoute: false
    }
  }, 
  {
    path: '/tag-management',
    component: lazy(() => import('../../views/pages/tags/Tags')),
    meta: {
      authRoute: true,
      publicRoute: false
    }
  }, 
  {
    path: '/settings',
    component: lazy(() => import('../../views/pages/settings/Settings')),
    meta: {
      authRoute: true,
      publicRoute: false
    }
  },
  {
    path: '/profile',
    component: lazy(() => import('../../views/pages/users/UserProfile'))
  },
  {
    path: '/projects',
    component: lazy(() => import('../../views/pages/projects/Projects'))
  },
  {
    path: '/project-view',
    component: lazy(() => import('../../views/pages/projects/ProjectView'))
  },
  {
    path: '/project-list',
    component: lazy(() => import('../../views/pages/projects/Projects'))
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
