import React, { useState, useRef } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import ModalTitle from 'rsuite/lib/Modal/ModalTitle';
import AvatarEditor from 'react-avatar-editor';
import { useModal } from '../misc/useModal';
import { database, storage } from '../misc/firebase';
import { useProfile } from '../context/ProfileContext';
import ProfileImage from './profileImage';

const AvatarUpload = () => {
  const [avatar, setAvatar] = useState(null);
  const avatarEditorRef = useRef();
  const { profile } = useProfile();
  const { open, close, isOpen } = useModal();
  const acceptanceFile = ['image/png', 'image/jpeg', 'image/jpg'];
  const isAvailableFile = file => acceptanceFile.includes(file.type);

  const onAvatarChange = e => {
    const { files } = e.target;
    if (files.length === 1) {
      const file = files[0];
      if (isAvailableFile(file)) {
        setAvatar(file);
        open();
      } else {
        Alert.warning('choose image insted', 4000);
      }
    }
  };

  const convertToBlob = file => {
    return new Promise((resolve, reject) => {
      file.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('file processing filed'));
        }
      });
    });
  };
  const onUploadClick = async () => {
    const refElement = avatarEditorRef.current.getImageScaledToCanvas();
    try {
      const convertedFile = await convertToBlob(refElement);
      const filePath = storage
        .ref(`/profile/${profile.uid}`)
        .child('profileImageFile');
      const uploadAvatarResult = await filePath.put(convertedFile, {
        casheControl: `public, max-age=${3600 * 24 * 3}`,
      });
      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();
      database.ref(`/profiles/${profile.uid}`).child('avatar').set(downloadUrl);

      Alert.success('upload avatar successfully', 4000);
    } catch (err) {
      Alert.error('upload avatar failed', 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileImage
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />
      <div>
        <label htmlFor="avatar-input" className="d-block cursor-pointer padded">
          <h6>update your avatar</h6>
          <input
            id="avatar-input"
            type="file"
            className="d-none"
            accept=".png, .jpg, .jpeg"
            onChange={onAvatarChange}
          />
        </label>
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <ModalTitle>Reset your Avatar</ModalTitle>
          </Modal.Header>
          <ModalBody>
            <div className="d-flex justify-content-center align-items-center">
              <AvatarEditor
                ref={avatarEditorRef}
                image={avatar}
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1.2}
                rotate={0}
                borderRadius={120}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="blue" appearance="ghost" onClick={onUploadClick}>
              Upload Avatar
            </Button>
            <Button color="blue" onClick={close}>
              cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUpload;
