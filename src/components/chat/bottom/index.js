import React, { useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import firebase from 'firebase/app';
import { useParams } from 'react-router';
import { useCurrentChannel } from '../../../context/currentChannelContext';
import { hashName } from '../../../misc/helperFunctions';
import { useProfile } from '../../../context/ProfileContext';
import { database } from '../../../misc/firebase';

function assembleMessage(profile, channelId) {
  return {
    channelId,
    author: {
      name: profile.name,
      uid: profile.uid,
      // createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
}

const Bottom = () => {
  const [input, setInput] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const { profile } = useProfile();
  const { channelId } = useParams();
  const name = useCurrentChannel(v => v.name);
  const onChange = value => {
    setInput(value);
  };
  const onClick = async () => {
    if (input.trim() === '') return;
    const messageData = assembleMessage(profile, channelId);
    messageData.message = input;

    const update = {};
    const messageId = database.ref('messages').push().key;
    update[`/messages/${messageId}`] = messageData;
    update[`/channels/${channelId}/lastMessage`] = {
      ...messageData,
      messageId,
    };
    setisLoading(true);
    try {
      await database.ref().update(update);
      setInput('');
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <div>
      <InputGroup>
        <Input
          placeholder={`Message # ${hashName(name)}`}
          value={input}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onClick}
          disabled={isLoading}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};
export default Bottom;
