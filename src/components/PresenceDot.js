import React from 'react';
import { Badge, Tooltip, Whisper } from 'rsuite';
import { usePresence } from '../misc/useModal';

const getColor = presence => {
  if (!presence) {
    return 'gray';
  }
  switch (presence.state) {
    case 'online':
      return 'green';
    case 'offline':
      return 'gray';
    default:
      return 'gray';
  }
};
const getState = presence => {
  if (!presence) {
    return 'UnKnown State';
  }
  return presence.state === 'online'
    ? 'online'
    : `last online${new Date(presence.last_changed).toLocaleDateString()}`;
};
const PresenceDot = ({ uid }) => {
  const presence = usePresence(uid);
  return (
    <Whisper
      placement="top"
      trigger="hover"
      speaker={<Tooltip>{getState(presence)}</Tooltip>}
    >
      <Badge
        className="cursor-pointer"
        style={{ background: getColor(presence) }}
      />
    </Whisper>
  );
};

export default PresenceDot;
