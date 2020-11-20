import React from 'react';
import { Button, Icon, Drawer } from 'rsuite';
import { useModal } from '../../misc/useModal';
import Dashboard from '.';

const DachboardToggle = () => {
  const { open, close, isOpen } = useModal();
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DachboardToggle;
