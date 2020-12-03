import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import Messages from '../../components/chat/messages';
import Top from '../../components/chat/top';
import Bottom from '../../components/chat/bottom';
import { useChannels } from '../../context/channelContext';

const Chat = () => {
  const { channelId } = useParams();
  const channels = useChannels();

  if (!channels) {
    return (
      <Loader center vertical content="loading..." speed="slow" size="md" />
    );
  }
  const currentChannel = channels.find(channel => channel.id === channelId);
  if (currentChannel) {
    return (
      <h6 className="text-center mt-page">Channel {channelId} not found</h6>
    );
  }
  return (
    <>
      <div className="chat-top">
        <Top />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <Bottom />
      </div>
    </>
  );
};

export default Chat;
