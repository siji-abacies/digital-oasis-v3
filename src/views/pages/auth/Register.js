import { Fragment, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import axios from "axios"
import { useForm, Controller } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import classnames from 'classnames'
// import { validator } from 'validator'

const ToastContent = ({ message = null }) => (
  <>
  {message !== null && (
  <Fragment>
      <div className='toastify-header'>
      <div className='title-wrapper'>
          {/* <Avatar size='sm' color='success' icon={<Coffee size={12} />} /> */}
          <h6 className='toast-title fw-bold'>{message ? message : 'Link Expired'}</h6>
      </div>
      </div>
      <div className='toastify-body'>
      {/* <span>You have successfully logged in as an user to Vuexy. Now you can start to explore. Enjoy!</span> */}
      </div>
  </Fragment>
  )}
  </>
)

const Terms = () => {
  return (
    <Fragment>
      I agree to
      <a className='ml-25' href='/privacy-policy' target='_blank'>
        privacy policy & terms
      </a>
    </Fragment>
  )
}

const RegisterV1 = () => {
  const history = useHistory()
  const { token } = useParams()

  const [email, setEmail] = useState('')
  const [valErrors, setValErrors] = useState({})
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [terms, setTerms] = useState(false)

  const [showMessage, setshowMessage] = useState('hide-message')
  const [messageContent, setmessageContent] = useState()

  // const { first_name } = useParams()
  useEffect(() => {
    const url = window.location.href
    const sp = url.split('?')
    const sp1 = sp[1].split('&')
    const sp2 = sp1[0].split('=')
    const sp3 = sp1[1].split('=')
    const f_name = sp2[1]
    const l_name = sp3[1]
    setFirstname(f_name)
    setLastname(l_name)
  })
  
  // console.log(token, f_name, l_name)
  const RememberMe = () => {
    return (
      <Fragment>
        I agree to
        <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    )
  }
  const { register, errors, handleSubmit, control } = useForm()

  const validate = (value) => {
    console.log(value)

    const pass = value
    const regExp = new RegExp(
      "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
    )

    const test = regExp.test(pass)
    if (test) {
      setPassword(value)
      setshowMessage('hide-message')
    } else {
      setmessageContent('Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase')
      setshowMessage('show-message')
    }
  }
      
  const onSubmit = data => {
    console.log(data)

    if (data['register-firstname'] !== '' && data['register-lastname'] !== null && data['register-password'] !== null) {
      const d = {
        first_name: data['register-firstname'],
        last_name: data['register-lastname'], 
        password: data['register-password']
        // token: data.password
      }
      console.log(d)

      const config = {
        method: 'put',
        url: `https://digital-oasis-dev.herokuapp.com/v3/user/registration_from_invitation`,
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
          history.push('/login')
        } else if (response.data.status === 401) {
          toast.success(
            <ToastContent message='' />,
            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        } else if (response.data.status === 403) {
          toast.success(
            <ToastContent message={response.data.message} />,
            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        }
        // console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })

    }
    
    // toast.success(<SuccessToast data={data} />, { hideProgressBar: true })
  }


  const handleFirstnameChange = e => {
    const errs = valErrors
    if (errs.firstname) delete errs.firstname
    setFirstname(e.target.value)
    setValErrors(errs)
  }

  const handleLastnameChange = e => {
    const errs = valErrors
    if (errs.lastname) delete errs.lastname
    setLastname(e.target.value)
    setValErrors(errs)
  }

  const handleEmailChange = e => {
    const errs = valErrors
    if (errs.email) delete errs.email
    setEmail(e.target.value)
    setValErrors(errs)
  }

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <svg viewBox='0 0 139 95' version='1.1' height='28'>
                <defs>
                  <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                    <stop stopColor='#000000' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                  <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                    <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                </defs>
                <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                    <g id='Group' transform='translate(400.000000, 178.000000)'>
                      <path
                        d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                        id='Path'
                        className='text-primary'
                        style={{ fill: 'currentColor' }}
                      ></path>
                      <path
                        d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                        id='Path'
                        fill='url(#linearGradient-1)'
                        opacity='0.2'
                      ></path>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.049999997'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                      ></polygon>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.099999994'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                      ></polygon>
                      <polygon
                        id='Path-3'
                        fill='url(#linearGradient-2)'
                        opacity='0.099999994'
                        points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                      ></polygon>
                    </g>
                  </g>
                </g>
              </svg>
              <h2 className='brand-text text-primary ml-1'>Digital Oasis</h2>
            </Link>
            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                {/* <Input
                  hidden 
                  type='text'
                  defaultValue={token}
                  // placeholder='johndoe'
                  id='register-token'
                  name='token'
                  // onChange={handleFirstnameChange}
                  // className={classnames({ 'is-invalid': errors['register-firstname'] })}
                  // innerRef={register({ required: true, validate: value => value !== '' })}
                /> */}
              <FormGroup>
                <Label className='form-label' for='register-firstname'>
                  First Name
                </Label>
                <Input
                  autoFocus
                  type='text'
                  defaultValue={firstname}
                  placeholder='johndoe'
                  id='register-firstname'
                  name='register-firstname'
                  onChange={handleFirstnameChange}
                  className={classnames({ 'is-invalid': errors['register-firstname'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.firstname ? (
                  <small className='text-danger'>{valErrors.firstname}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-lastname'>
                  Last Name
                </Label>
                <Input
                  type='text'
                  defaultValue={lastname}
                  placeholder='johndoe'
                  id='register-lastname'
                  name='register-lastname'
                  onChange={handleLastnameChange}
                  className={classnames({ 'is-invalid': errors['register-lastname'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.lastname ? (
                  <small className='text-danger'>{valErrors.lastname}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <InputPasswordToggle
                  defaultValue={password}
                  id='register-password'
                  name='register-password'
                  className='input-group-merge'
                  // onChange={e => setPassword(e.target.value)}
                  onInput={(e) => validate(e.target.value)}
                  className={classnames({ 'is-invalid': errors['register-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <p className={showMessage} style={{fontSize: '12px'}}>{messageContent}</p>
              <FormGroup>
                <CustomInput
                  type='checkbox'
                  id='terms'
                  name='terms'
                  value='terms'
                  label={<Terms />}
                  className='custom-control-Primary'
                  innerRef={register({ required: true })}
                  onChange={e => setTerms(e.target.checked)}
                  invalid={errors.terms && true}
                />
              </FormGroup>
              <Button.Ripple type='submit' block color='primary'>
                Sign up
              </Button.Ripple>
            </Form>

            <p className='text-center mt-2'>
              <span className='mr-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Login instead</span>
              </Link>
            </p>
            
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default RegisterV1
