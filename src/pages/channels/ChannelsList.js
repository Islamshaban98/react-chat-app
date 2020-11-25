import React from 'react';
import { Nav } from 'rsuite';
import Channel from './Channel';

export default function ChannelsList({ listHeight }) {
  return (
    <Nav
      appearance="default"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{ height: `calc(100% - ${listHeight}px)` }}
    >
      <Nav.Item>
        <Channel />
      </Nav.Item>
    </Nav>
  );
}
