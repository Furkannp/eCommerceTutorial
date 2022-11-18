/* eslint-disable react/prop-types */
import React from 'react'
import {
    Button,
    Modal, ModalBody,
  } from 'reactstrap';
  import CloseIcon from '@mui/icons-material/Close';

const CustomModal = (props) => {
    const {
        toggleModal, content, isModalOpen, modalTitle, size, onClosed,
      } = props;

  return (
        <Modal
          toggle={toggleModal}
          isOpen={isModalOpen}
          centered
          className={size ? `modal-${size}` : 'modal-xl'}
          onClosed={onClosed}
        >
          <ModalBody style={{ padding: '2rem' }}>
            <Button className='modal_close_btn' onClick={toggleModal}><CloseIcon/></Button>
            {modalTitle && <h6 style={{ textAlign: 'center' }}>{modalTitle}</h6>}
            {content}
          </ModalBody>
        </Modal>
  )
}

export default CustomModal