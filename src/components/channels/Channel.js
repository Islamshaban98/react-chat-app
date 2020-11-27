import React from 'react';
import TimeAgo from 'timeago-react';

export default function Channel({ channel }) {
  const { name, createdAt } = channel;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>{name}</h3>
        <TimeAgo
          datetime={new Date(createdAt)}
          className="font-normal text-black-45"
        />
      </div>
      <div className="d-flex align-items-center text-black-70">
        <span>no messages yet ...</span>
      </div>
    </div>
  );
}
