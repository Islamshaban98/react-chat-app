import React, { useState, useRef } from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import firebase from 'firebase/app';
import { useModal } from '../misc/useModal';
import { database } from '../misc/firebase';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
});
const RoomBtn = () => {
  const [name, setName] = useState('');
  const { open, isOpen, close } = useModal();
  const [isLoading, setisLoading] = useState(false);
  const formRef = useRef();

  const handleChange = value => {
    setName(value);
  };

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }
    setisLoading(true);

    const channelData = {
      ...name,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };

    try {
      await database.ref('channels').push(channelData);
      Alert.success(`${channelData.name} created successfully`);
      setisLoading(false);
      setName(name);
    } catch (err) {
      setisLoading(false);
      Alert.error(err.message, 4000);
    }
  };
  return (
    <div className="mt-3 ">
      <div className=" d-flex justify-content-between padded">
        <h6 className="font-family-roboto"> TEXT CHANNELS</h6>
        <div>
          <Icon
            icon="plus"
            className=" padded cursor-pointer"
            block
            onClick={open}
          />
        </div>
      </div>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>
            Create Text Channel
            <p>in Text Channels</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={handleChange}
            formValue={name}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>CHANNEL NAME</ControlLabel>
              <FormControl name="name" placeholder="# new-channel" />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmit} disabled={isLoading}>
            Create Channel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoomBtn;
