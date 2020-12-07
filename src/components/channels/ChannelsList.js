import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader, Nav } from 'rsuite';
import { useChannels } from '../../context/channelContext';
import Channel from './Channel';

export default function ChannelsList({ listHeight }) {
  const channels = useChannels();
  const location = useLocation();
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{ height: `calc(100% - ${listHeight}px)` }}
      activeKey={location.pathname}
    >
      {!channels && (
        <Loader center vertical content="Loading..." speed="slow" size="md" />
      )}
      {channels &&
        channels.length > 0 &&
        channels.map(channel => (
          <Nav.Item
            key={channel.id}
            componentClass={Link}
            to={`/channels/${channel.id}`}
            eventKey={`/channels/${channel.id}`}
          >
            <Channel channel={channel} />
          </Nav.Item>
        ))}
    </Nav>
  );
}
