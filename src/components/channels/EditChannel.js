import React, { memo } from "react";
import {  Alert, Button,  Icon, Modal } from "rsuite";
import { database } from "../../misc/firebase";
import { useModal } from "../../misc/useModal";
import EditableInput from "../EditableInput";

const EditChannel = ({channel}) => {
  const { open ,isOpen, close } = useModal();
  const Update=(key,value)=>{
    database.ref(`channels/${channel.id}`).child(key).set(value).then(()=>{
        Alert.success(`${key} changed successfully`,4000)
    }).catch((err)=>{
        Alert.error(err.message,4000)
    })
  }
  const onNameChange=(newName)=>{
    Update('name', newName)
  }
 const  onTopicChange=(newTopic)=>{
    Update('topic',newTopic)
}
  return (
    <div>
      <Icon icon="cog" className=" padded cursor-pointer" onClick={open} />
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>OVERVIEW</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditableInput
            defaultValue={channel.name}
            label={<h6 className="mb-2">channel name</h6>}
            onSave={onNameChange}
            emptyMessage="channel name can not be empty"
          />
            <EditableInput
            componentClass="textarea"
            defaultValue={channel.topic}
            label={<h6 className="mt-2 mb-2">channel topic</h6>}
            onSave={onTopicChange}
            emptyMessage="channel topic can not be empty"
            row={5}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary" block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default memo(EditChannel) ;
