import React from 'react';
import { Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/ProfileContext';
import EditableInput from '../EditableInput';

const Daschboard = ({ signOut }) => {
  const { profile } = useProfile();
  const onSave = nickName => {
    console.log(nickName);
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Chatting your friends</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        {profile.name}
        <Divider />
        <EditableInput
          defaultValue={profile.name}
          onSave={onSave}
          name="nickname"
          label={<h6 className="mb-2">Nickname</h6>}
        />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={signOut}>
          Log Out {profile.name}
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Daschboard;
