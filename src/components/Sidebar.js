import React from 'react';
// import { useProfile } from '../context/ProfileContext';
import DachboardToggle from './daschdoard/DachboardToggle';
import RoomBtn from './RoomBtn';
// import ProfileImage from './profileImage';

const Sidebar = () => {
  // const { profile } = useProfile();

  return (
    <div className="h-100 pt-2">
      <div>
        <DachboardToggle />
      </div>
      <RoomBtn />
      {/* <ProfileImage
        src={profile.avatar}
        name={profile.name}
        className="width-100 height-100 img-fullsize font-huge"
      /> */}
    </div>
  );
};
export default Sidebar;
