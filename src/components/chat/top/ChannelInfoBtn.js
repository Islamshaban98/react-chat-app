import React, { memo } from 'react';
import { Button, Modal } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentChannel } from '../../../context/currentChannelContext';
import { useModal } from '../../../misc/useModal';

const ChannelInfoBtn = () => {
  const { isOpen, close, open } = useModal();
  const name = useCurrentChannel(v => v.name);
  const topic = useCurrentChannel(v => v.topic);
  const createdAt = useCurrentChannel(v => v.createdAt);
  return (
    <div>
      <Button appearance="ghost" color="blue" onClick={open}>
        Room Info
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>about {name} Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          this Channel is created <TimeAgo datetime={new Date(createdAt)} />
          {topic}
        </Modal.Body>
        <Modal.Footer>
          <Button block appearance="primary" color="blue" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default memo(ChannelInfoBtn);
