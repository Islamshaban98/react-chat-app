import React from 'react';
import TimeAgo from 'timeago-react';
import PresenceDot from '../../PresenceDot';
import ProfileImage from '../../profileImage';
import ProfileInfoModal from './ProfileInfoModal';

export default function Message({ messages }) {
  const { author, createdAt, message } = messages;
  const messageSince = new Date(createdAt).toLocaleDateString();

  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileImage
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="sm"
        />

        {/* <span className="ml-2 font-family-roboto  text-black">
          {author.name}
        </span> */}
        <ProfileInfoModal profile={author} />
        <p className="font-family-roboto  text-black-45 ml-2">{messageSince}</p>
        <TimeAgo
          datetime={createdAt}
          className="font-family-roboto  text-black-45 ml-2"
        />
      </div>

      <div className=" padded ml-4">
        <span className=" padded font-family-roboto word-break-all ml-1 ">
          {message}
        </span>
      </div>
    </li>
  );
}
