import React from 'react';
import { Avatar } from 'rsuite';
import { splitName } from '../misc/helperFunctions';

const ProfileImage = ({ name, ...avatarProps }) => {
  return (
    <Avatar circle {...avatarProps}>
      {splitName(name)}
    </Avatar>
  );
};

export default ProfileImage;
