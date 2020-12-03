import React, { useRef, useEffect, useState } from 'react';
import { Divider } from 'rsuite';
import ChannelsList from './channels/ChannelsList';
import { useProfile } from '../context/ProfileContext';
import DachboardToggle from './daschdoard/DachboardToggle';
import RoomBtn from './RoomBtn';
import ProfileImage from './profileImage';

const Sidebar = () => {
  const { profile } = useProfile();
  const toSidebarRef = useRef();
  const [height, setHight] = useState(0);

  useEffect(() => {
    if (toSidebarRef.current) {
      setHight(toSidebarRef.current.scrollHeight);
    }
  }, [toSidebarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={toSidebarRef}>
        <DachboardToggle />
        <RoomBtn />
        <div className=".w-auto .h-auto ">
          <ProfileImage
            src={profile.avatar}
            name={profile.name}
            className="width-100 height-100 "
          />
        </div>
        <h6 className="text-center">{profile.name}</h6>
        <Divider>Join conversation</Divider>
      </div>
      <ChannelsList listHeight={height} />
    </div>
  );
};
export default Sidebar;
