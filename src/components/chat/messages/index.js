import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useCurrentChannel } from '../../../context/currentChannelContext';
import { database } from '../../../misc/firebase';
import { convertToArray, hashName } from '../../../misc/helperFunctions';
import Message from './message';

const MessageList = () => {
  const { channelId } = useParams();
  const [messages, setMessages] = useState();
  const name = useCurrentChannel(v => v.name);
  const isChatEmpty = messages && messages.length === 0;
  const isChatshown = messages && messages.length > 0;
  useEffect(() => {
    const messageRef = database.ref('/messages');
    messageRef
      .orderByChild('/channelId')
      .equalTo(channelId)
      .on('value', snap => {
        const data = convertToArray(snap.val());
        setMessages(data);
      });
    return () => {
      messageRef.off('value');
    };
  }, [channelId]);
  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>this is the start of the #{hashName(name)}</li>}
      {isChatshown &&
        messages.map(message => (
          <Message key={message.id} messages={message} />
        ))}
    </ul>
  );
};
export default MessageList;
