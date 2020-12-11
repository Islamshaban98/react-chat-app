import React from 'react';
import TimeAgo from 'timeago-react';
import { hashName } from '../../misc/helperFunctions';

export default function Channel({ channel }) {
  const { name, createdAt } = channel;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <h6 className="font-family-roboto"># {hashName(name)}</h6>
        <TimeAgo
          datetime={new Date(createdAt)}
          className="font-normal text-black-45"
        />
      </div>
      <div className="d-flex align-items-center text-black-45">
        <span className="font-family-roboto">no messages yet ...</span>
      </div>
    </div>
  );
}
