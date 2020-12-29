import React from 'react';
import { Icon, Drawer, Alert } from 'rsuite';
import { useMediaQuery, useModal } from '../../misc/useModal';
import Dashboard from '.';
import { auth, database } from '../../misc/firebase';
import { isOfflineForDatabase } from '../../context/ProfileContext';

const DachboardToggle = () => {
  const { open, close, isOpen } = useModal();

  const signOut = () => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        close();
      })
      .catch(err => {
        Alert.info(err, 4000);
      });
  };

  const is500px = useMediaQuery('(max-width: 500px)');
  return (
    <>
      <div className="d-flex justify-content-end ">
        <div className="padded">
          <Icon icon="gear-circle" onClick={open} />
        </div>
      </div>
      <Drawer
        full={is500px}
        show={isOpen}
        onHide={close}
        placement="left"
        size="xs"
      >
        <Dashboard signOut={signOut} />
      </Drawer>
    </>
  );
};

export default DachboardToggle;
