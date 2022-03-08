import { useState} from 'react'

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
    FormGroup
  } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import Select, { components } from 'react-select'
import Flatpickr from 'react-flatpickr'
import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { selectThemeColors } from '@utils'
import ReactColorPicker from '@super-effective/react-color-picker'
import axios from 'axios'
import classnames from 'classnames'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { toast, Slide } from 'react-toastify'

import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'

const AddNewModal = ({ show, setShow, type, getProjectList, ToastContent }) => {

  const history = useHistory()
  const token = localStorage.getItem('token')

  const [picker, setPicker] = useState(new Date())

  const [color, setColor] = useState('#3cd6bf')
  const [colorPkr, setColorPkr] = useState('colorPkrClose')

  const onColorChange = (updatedColor) => {
    setColor(updatedColor)
  }

  const showColorPicker = () => {
    const picker1 = colorPkr === 'colorPkrClose' ? 'colorPkrShow' : 'colorPkrClose'
    setColorPkr(picker1)
  }

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true,
    restrictions: { maxNumberOfFiles: 1 }
    // restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ['image/*'] }
  })

  // uppy.use(Uppy.Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    const arr = previewArr
    arr.push(preview)
    setPreviewArr([...arr])
  })

  uppy.on('complete', (result) => {
    console.log(result)
    const img = result.successful
    const d = img[0].data
    console.log(img[0].data)
    const formData = new FormData()
    formData.append('file', img[0].data)

    const body1 = {
      file: img[0].data
      // file: d
    }
    console.log('successful files:', result.successful)
    console.log('failed files:', result.failed)
  })

  const { register, errors, handleSubmit, control } = useForm()
      
  const onSubmit = data => {
    console.log(data)
    // console.log(data.build_date, moment(data.build_date[0]).format("Y-MM-D HH:mm:ss"))
    if (data.build_date !== undefined) {
      const d = {
        name: data.project_name,
        description: data.description,
        job_number: data.project_number, 
        color: data.color, 
        type_: parseInt(data.type), 
        build_at: moment(data.build_date[0]).format("Y-MM-D")
      }
      console.log(d)
      
      const config = {
        method: 'post',
        url: 'https://digital-oasis-dev.herokuapp.com/v3/project?time_zone=Asia/Kolkata',
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
        getProjectList(1)
        setShow(false)
        toast.success(
        <ToastContent message='Project Successfully Added' />,
          { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        } else if (response.data.status === 409) {
          toast.success(
          <ToastContent message={response.data.message} />,
            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        }
      })
      .catch(function (error) {
        console.log(error)
        // history.push('/login')
      })
    } else {
      // console.log($('#date-time-picker').next())
    }
  }

  return (
    <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Create New Project</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
            
              <Col md={12} xs={12}>
                <FormGroup>
                  <Label className='form-label' for='project_name'>
                    Project Name
                  </Label>
                  <Input
                    type='text'
                    id='project_name'
                    name='project_name'
                    placeholder='Project Name' 
                    innerRef={register({ required: true })}
                    invalid={errors.project_name && true}
                  />
                  </FormGroup>
              </Col>
              <Col md={12} xs={12}>
                <FormGroup>
                  <Label className='form-label' for='project_desc'>
                    Project Description
                  </Label>
                  <Input
                    type='text'
                    id='project_desc' 
                    name='description' 
                    placeholder='Project Description' 
                    innerRef={register({ required: false })}
                    invalid={errors.description && true}
                  />
                  </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label>Project Type</Label>
                  <Controller
                        as={Input}
                        type='select'
                        name='type'
                        id='type' 
                        control={control}
                        innerRef={register({ required: true })}

                        // invalid={data !== null && (data.status === undefined || data.status === null)}
                      >
                        <option value='1'>Live</option>
                        <option value='2'>Live To Tape</option>
                        <option value='3'>Record Only</option>
                    
                  </Controller>
                </FormGroup>
              </Col>
              <Col md={6} xs={12}>
                <FormGroup>
                  <Label className='form-label' for='project_number'>
                    Job Number
                  </Label>
                  <Input
                    type='text'
                    id='project_number'
                    name='project_number' 
                    innerRef={register({ required: true })}
                    invalid={errors.project_number && true}
                    placeholder='#123BB'
                  />
                  </FormGroup>
              </Col>
              <Col md={12} xs={12}>
                <FormGroup>
                  <Label for='date-time-picker'>Build Date</Label>
                  <Controller
                    as={Flatpickr}
                    control={control}
                    id='date-time-picker'
                    name='build_date' 
                    className='form-control' 
                    defaultValue={new Date()}
                    innerRef={register({ required: true })}
                    invalid={errors.build_date && true}
                    options={{
                      altFormat: "d/m/Y",
                      altInput: true
                      // dateFormat: "Y-m-d"
                    }} 
                    
                    // className={classnames('form-control', {
                    //   'is-invalid': data !== null && data.build_date === null
                    // })}
                  />
                  {/* <Flatpickr
                    value={picker}
                    data-enable-time
                    id='date-time-picker'
                    name='build_date'
                    className='form-control' 
                    options={{
                      altFormat: "d/m/Y",
                      altInput: true
                    }}
                    // innerRef={register({ required: true })}
                    // invalid={errors.build_date && true}
                    onChange={date => setPicker(date)}
                  /> */}
                  </FormGroup>
              </Col>
              <Col md={12} xs={12} className='mt-1'>
                <FormGroup>
                  <Label for='color'>Select Project Color</Label>
                  {/* <div className=''> */}
                    <Input
                      type='text'
                      id='color'
                      name='color' 
                      innerRef={register({ required: false })}
                      invalid={errors.color && true}
                      // defaultValue={color}
                      value={color}
                      // placeholder='Green Room'
                      onClick={showColorPicker}
                      toggle={showColorPicker}
                    />
                    
                    <div className={colorPkr} style={{ width: '400px', height: '400px', padding: '15px 5px', border: '1px solid #ccc', borderRadius: '10px'}}>
                      <ReactColorPicker color={color} onChange={onColorChange} />
                    </div>
                  {/* </div> */}
                  
                </FormGroup>
              </Col>
              <Col md={12} xs={12} className='mt-1'>
                <Label>Upload Logo</Label>
                <DragDrop uppy={uppy} />
              </Col>
              
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