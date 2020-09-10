import Login from '../components/pages/Login'
import Sitemap from '../components/pages/Sitemap'
import Auth from '../components/pages/Auth'
import ForgotPassword from '../components/pages/ForgotPassword'
import ForgotQuestion from '../components/pages/ForgotQuestion'
import PasswordChange from '../components/pages/PasswordChange'
import Register from '../components/pages/Register'
import RegistrationSuccessful from '../components/pages/RegistrationSuccessful'
import Contact from '../components/pages/Contact'
import Dashboard from '../components/pages/Dashboard'

const routes = [
  { path: '/', component: Login, name: '@homepage' },
  { path: '/login', component: Login, name: '@login', meta: {title: 'Sign In'} },
  { path: '/logout', name: '@logout' },
  { path: '/sitemap', component: Sitemap, name: '@sitemap' },

  { path: '/auth',
    component: Auth,
    name: '@auth',
    children: [
      { path: 'forgotPassword', component: ForgotPassword, name: '@forgotPassword', meta: {title: 'Sign In'} },
      { path: 'forgotQuestion', component: ForgotQuestion, name: '@forgotQuestion', props: true, meta: {title: 'Sign In'} },
      { path: 'passwordChange', component: PasswordChange, name: '@passwordChange' }
    ]
  },

  { path: '/register', component: Register, name: '@register', meta: {title: 'Registration'} },
  { path: '/registrationSuccessful', component: RegistrationSuccessful, name: '@registrationsuccessful' },
  { path: '/contact', component: Contact, name: '@contact' },
  { path: '/dash/:id', component: Dashboard, name: '@dashboard', meta: {title: 'Dashboards'} }
]

export default routes
