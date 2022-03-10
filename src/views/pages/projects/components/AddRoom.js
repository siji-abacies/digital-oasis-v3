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
    FormGroup, CustomInput
  } from 'reactstrap'
  import { useForm, Controller } from 'react-hook-form'
  import Select, { components } from 'react-select'
  import Flatpickr from 'react-flatpickr'
  import { selectThemeColors, getToken } from '@utils'
   import ReactColorPicker from '@super-effective/react-color-picker'
  
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'

  const AddNewModal = ({ show, setShow, roomList }) => {
    const { id } = useParams()

    const type = [
        { value: '1', label: 'Live', color: '#00B8D9', isFixed: true },
        { value: '2', label: 'Stage', color: '#0052CC', isFixed: true },
        { value: '3', label: 'Test', color: '#5243AA', isFixed: true }
      ]

    // const [show, setShow] = useState(false)
    const [picker, setPicker] = useState(new Date())

  const [color, setColor] = useState('#3cd6bf')
  const [colorPkr, setColorPkr] = useState('colorPkrClose')
  const [selectedFile, setSelectedFile] = useState()

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
    // setSelectedFile(d)
    const formData = new FormData()
    formData.append('file', img[0].data)

    const body1 = {
      file: img[0].data
      // file: d
    }
    console.log('successful files:', result.successful)
    console.log('failed files:', result.failed)
  })
    const {
        reset,
        control,
        register, 
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

      uppy.on("file-added", function (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file.data)
        // setSelectedFile(base64data)
        reader.onloadend = function () {
          let base64data = reader.result
          // data:image/png;base64, 
          base64data = base64data.replace(/^data:image\/[a-z]+;base64,/, "")
          console.log(base64data)
          setSelectedFile(base64data)
        }
      })

      
    const onSubmit = data => {
      console.log(data)
      // const encode_img = JSON.stringify(data.customFile)
      // const encode_img = JSON.stringify(selectedFile)
      // console.log(encode_img)
      const d = {
        name: data.room_name,
        type_: data.type ? 1 : 3,
        color: data.color,
        image_type: 'image/png',
        file: selectedFile 
      }
      console.log(d)
      const config = {
        method: 'post',
        url: `https://digital-oasis-dev.herokuapp.com/v3/project/room/${id}`,
        headers: { 
          ContentType: 'application/json',
          Authorization: `Token ${getToken()}`
        }, 
        data : d
      }

      axios(config)
      .then(function (response) {
      console.log(response)
      if (response.data.status === 200) {
        roomList(1, 10)
        setShow(false)
        // toast.success(
        // <ToastContent message='Project Successfully Added' />,
        //   { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
        // )
        } else if (response.data.status === 409) {
          // toast.success(
          // <ToastContent message={response.data.message} />,
          //   { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
          // )
        }
          // console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
        // history.push('/login')
      })

      // /project/room<int:project_id>
      // {"name": "Room name", "type_": 1,  "image_type": "image/jpg", 'file': ""} 
      // 1: Stage, 2: Waiting Room, 3: Other
        // if (Object.values(data).every(field => field.length > 0)) {
        //   setShow(false)
        // } else {
        //   for (const key in data) {
        //     if (data[key].length === 0) {
        //       setError(key, {
        //         type: 'manual'
        //       })
        //     }
        //   }
        // }
      }

    return (
        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Add New Room</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
            <Col md={12} xs={12}>
                <Label className='form-label' for='room_name'>
                  Room Name
                </Label>
                <Input
                  type='text'
                  id='room_name'
                  name='room_name'
                  innerRef={register({ required: true })}
                  invalid={errors.room_name && true}
                  placeholder='Green Room'
                />
            </Col>
              <Col md={4} xs={12} className='mt-1 mb-1'>
                <CustomInput inline name='type' type='checkbox' id='type' label='Stage Room'
                  innerRef={register({ required: false })} 
                  invalid={errors.type && true} 
                  defaultChecked
                  // defaultValue={presenterData.is_password_protected} 
                  // onChange={e => setIsoRecord(e.target.checked)} 
                />
                {/* <CustomInput inline type='checkbox' id='exampleCustomCheckbox' label='Stage Room' name='type' defaultChecked /> */}
              </Col>
              {/* <Col md={12} xs={12}>
                <FormGroup>
                <Label for='exampleCustomFileBrowser'>Upload Logo</Label>
                <CustomInput type='file' id='exampleCustomFileBrowser' name='customFile' innerRef={register({ required: false })}/>
                </FormGroup>
              </Col> */}
              <Col md={12} xs={12} className='mt-1'>
                <Label>Upload Logo</Label>
                <DragDrop uppy={uppy} />
              </Col>
              <Col md={12}>
              <FormGroup>
                <Label>Select Room Color</Label>
                <div className=''>
                  <Input
                    type='text'
                    id='color'
                    name='color'
                    // defaultValue={color}
                    value={color}
                    innerRef={register({ required: false })} 
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
