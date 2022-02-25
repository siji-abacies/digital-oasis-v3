import { Fragment, useState, forwardRef, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, Form, Label} from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'

const AddNewModal = ({ show, setShow }) => {
    
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

  // const { register, errors, handleSubmit, control } = useForm()
      
  return (
    <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Create New Project</h1>
          </div>
          <Form>
          {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
            {/* <Row className='gy-1 pt-75'> */}
            {/* <Col md={12} xs={12}> */}
            {/* <FormGroup> */}
            <Label for='default-picker'>Default</Label>
      <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='default-picker' />
    
            {/* </FormGroup> */}
            {/* </Col> */}
            {/* </Row> */}
          </Form>
        </ModalBody>
      </Modal>

)
}

export default AddNewModal