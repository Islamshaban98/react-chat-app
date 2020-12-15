import React from 'react';
import { Button, Modal } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useModal } from '../../../misc/useModal';
import ProfileImage from '../../profileImage';

const ProfileInfoModal = ({ profile }) => {
  const { name, avatar, createdAt } = profile;
  const { open, close, isOpen } = useModal();
  const memberSince = new Date(createdAt).toLocaleDateString();
  return (
    <div>
      <Button
        appearance="link"
        onClick={open}
        className="ml-2 font-family-roboto  text-black"
      >
        {profile.name}
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>{name}</Modal.Header>
        <Modal.Body>
          <ProfileImage
            src={avatar}
            name={name}
            // className="width-200 height-200 img-fullsize font-huge"
          />
          <h6> Member since {memberSince}</h6>
          <TimeAgo
            datetime={memberSince}
            className="font-family-roboto  text-black-45 ml-2"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block appearance="primary" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileInfoModal;
