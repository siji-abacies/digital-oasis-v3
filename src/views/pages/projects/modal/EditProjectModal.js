import { Fragment, useState, forwardRef, useEffect } from 'react'

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
    Modal, 
    ModalBody, 
    ModalHeader, 
    ModalFooter,
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
  
  import 'uppy/dist/uppy.css'
  import '@uppy/status-bar/dist/style.css'
  const AddNewModal = ({ show, setShow }) => {
    const type = [
        { value: '1', label: 'Live', color: '#00B8D9', isFixed: true },
        { value: '2', label: 'Stage', color: '#0052CC', isFixed: true },
        { value: '3', label: 'Test', color: '#5243AA', isFixed: true }
      ]

    // const [show, setShow] = useState(false)
    const [picker, setPicker] = useState(new Date())

  const [color, setColor] = useState('#3cd6bf')
  const [colorPkr, setColorPkr] = useState('colorPkrClose')

  const onColorChange = (updatedColor) => {
    setColor(updatedColor)
  }

  const showColorPicker = () => {
    const picker = colorPkr === 'colorPkrClose' ? 'colorPkrShow' : 'colorPkrClose'
    setColorPkr(picker)
  }

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true,
    restrictions: { maxNumberOfFiles: 1 }
    // restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ['image/*'] }
  })

  // uppy.use(Uppy.Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
  // /user/edit_user_details/<user_id>
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
    // const encode_img = JSON.stringify(img[0].data)
    // console.log(encode_img)

    const token = "eyJhbGciOiJIUzUxMiIsImlhdCI6MTY0NDM4MDg0MywiZXhwIjoxNjQ0OTg1NjQzfQ.eyJpZCI6NywidXNlcl9yb2xlIjoxfQ.IyzNMBX9p9vXn5mas5emwjzMgF2i6sVi7R74_A6RSqrSHB38SduYb2ub73zNh8jqTMCjHp-c_kJmm15USqomMA"

    const formData = new FormData()
    formData.append('file', img[0].data)

    const body1 = {
      file: img[0].data
      // file: d
    }

    // console.log(formData)
    // console.log(body1)
    // console.log(body1.file)
    // const config = {
    //   method: 'put',
    //   url: `https://w-call-demo02.herokuapp.com/user/edit_user_details/7`,
    //   headers: { 
    //     // AccessControlAllowOrigin: '*',
    //     // ContentType: 'application/json',
    //     ContentType: 'multipart/form-data',
    //     Authorization: `Token ${token}`
    //   }
    //   // data: body1.file
    //   // file: body1
    //   // body1
      
    // }

    // axios(config, formData)
    // .then(function (response) {
    //   console.log(response)
    //   // data = response.data
    //   // setUserData(data)
    //   // handleModal()
    // })
    // .catch(function (error) {
    //   console.log(error)
    // })


    console.log('successful files:', result.successful)
    console.log('failed files:', result.failed)
  })
    const {
        reset,
        control,
        setError,
        handleSubmit,
        formState: { errors }
      } = useForm({
        // defaultValues: {
        //   username: selectedUser.name,
        //   // lastName: selectedUser.fullName.split(' ')[1],
        //   // firstName: selectedUser.fullName.split(' ')[0]
        //   // username: 'Test',
        //   lastName: 'LastName',
        //   firstName: 'First name'
        // }
      })
      
    const onSubmit = data => {
        if (Object.values(data).every(field => field.length > 0)) {
          setShow(false)
        } else {
          for (const key in data) {
            if (data[key].length === 0) {
              setError(key, {
                type: 'manual'
              })
            }
          }
        }
      }

    return (
    <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit Project</h1>
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
                  // defaultValue={selectedUser.email}
                  placeholder='Project Name'
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
                  // defaultValue={selectedUser.email}
                  placeholder='Project Description'
                />
                </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup>
              <Label>Project Type</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                defaultValue={[type[2], type[3]]}
                // isMulti
                name='colors'
                options={type}
                className='react-select'
                classNamePrefix='select'
              />
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
                  // defaultValue={selectedUser.email}
                  placeholder='#123BB'
                />
                </FormGroup>
            </Col>
            <Col md={12} xs={12}>
              <FormGroup>
                <Label for='date-time-picker'>Build Date</Label>
                <Flatpickr
                  value={picker}
                  data-enable-time
                  id='date-time-picker'
                  className='form-control'
                  onChange={date => setPicker(date)}
                />
                </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label>Select Project Color</Label>
                <div className=''>
                  <Input
                    type='text'
                    id='color'
                    // defaultValue={color}
                    value={color}
                    // placeholder='Green Room'
                    onClick={showColorPicker}
                    toggle={showColorPicker}
                  />
                  
                  <div className={colorPkr} style={{ width: '400px', height: '400px', padding: '15px 5px', border: '1px solid #ccc', borderRadius: '10px'}}>
                    <ReactColorPicker color={color} onChange={onColorChange} />
                  </div>
                </div>
                
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