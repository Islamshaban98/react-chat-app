import React from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/ProfileContext';
import { database } from '../../misc/firebase';
import EditableInput from '../EditableInput';

const Daschboard = ({ signOut }) => {
  const { profile } = useProfile();
  const onSave = async nickName => {
    const nicknameRef = database.ref(`profiles/${profile.uid}/name`);
    try {
      await nicknameRef.set(nickName);
      Alert.success('nickname updated successfully', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
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
