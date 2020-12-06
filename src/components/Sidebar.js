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
    <div className="h-100 pt-2 ">
      <div ref={toSidebarRef}>
        <DachboardToggle />
        <div className="d-flex  justify-content-center">
          <ProfileImage
            src={profile.avatar}
            name={profile.name}
            className="width-100 height-100 img-fullsize "
          />
        </div>
        <h6 className="text-center mt-3 text-black font-family-roboto fz-4 ">
          {profile.name}
        </h6>
        <p className="text-center text-black-45 mt-3 font-family-roboto fz-3">
          My acount
        </p>
        <Divider className="text-black-45 font-family-roboto fz-3 ">
          Join conversation
        </Divider>
        <RoomBtn />
      </div>
      <ChannelsList listHeight={height} />
    </div>
  );
};
export default Sidebar;
