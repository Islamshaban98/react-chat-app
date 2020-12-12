import React from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/ProfileContext';
import { database } from '../../misc/firebase';
import EditableInput from '../EditableInput';
import AvatarUpload from '../AvatarUpload';
import LinkSocial from './LinkSocial';
import { getUserUpdate } from '../../misc/helperFunctions';

const Daschboard = ({ signOut }) => {
  const { profile } = useProfile();
  const onSave = async nickName => {
    // const nicknameRef = database.ref(`profiles/${profile.uid}`).child('name');
    try {
      // await nicknameRef.set(nickName);
      const update = await getUserUpdate(
        profile.uid,
        'name',
        nickName,
        database
      );
      await database.ref().update(update);
      Alert.success('nickname updated successfully', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title className="text-black ">
          Chatting your friends
        </Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <div className="padded font-bolder text-black">{profile.name}</div>
        <LinkSocial />
        <Divider />
        <EditableInput
          defaultValue={profile.name}
          onSave={onSave}
          name="nickname"
          label={<h6 className="mb-2 text-black ">Nickname</h6>}
        />
        <AvatarUpload />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="violet" onClick={signOut}>
          Log Out {profile.name}
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Daschboard;
