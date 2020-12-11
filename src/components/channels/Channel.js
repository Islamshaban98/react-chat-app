import React from 'react';
import TimeAgo from 'timeago-react';
import { hashName } from '../../misc/helperFunctions';
import ProfileImage from '../profileImage';

export default function Channel({ channel }) {
  const { name, createdAt, lastMessage } = channel;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <h6 className="font-family-roboto"># {hashName(name)}</h6>
        <TimeAgo
          datetime={
            lastMessage ? new Date(lastMessage.createdAt) : new Date(createdAt)
          }
          className="font-family-roboto text-black-45"
        />
      </div>
      <div className="d-flex align-items-center text-black-45">
        {lastMessage ? (
          <>
            <div className="d-flex align-items-center mt-2">
              <ProfileImage
                src={lastMessage.author.avatar}
                name={lastMessage.author.name}
                size="sm"
              />
            </div>
            <div className="text-disappear ml-2 mt-2">
              <div className="font-family-roboto">
                {lastMessage.author.name}
              </div>
              <span className="font-family-roboto">{lastMessage.message}</span>
            </div>
          </>
        ) : (
          <span className="font-family-roboto">no messages yet ...</span>
        )}
      </div>
    </div>
  );
}
