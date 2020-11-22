import React, { useState } from 'react';
import { Alert, Button, Icon, Tag } from 'rsuite';
import firebase from 'firebase/app';
import { auth } from '../../misc/firebase';

const LinkSocial = () => {
  const [connected, setConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });

  const updateConnected = (providerId, value) => {
    setConnected(prevState => {
      return {
        ...prevState,
        [providerId]: value,
      };
    });
  };
  const unLink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`you can not disconnect from ${providerId}`);
      }
      await auth.currentUser.unlink(providerId);
      updateConnected(providerId, false);
      Alert.info(`you are diconnected from ${providerId}`);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const Link = async provider => {
    try {
      await auth.currentUser.linkWithPopup(provider);
      Alert.info(`linked to ${provider.providerId}`);
      updateConnected(provider.providerId, true);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  const unLinkfacebook = () => {
    unLink('facebook.com');
  };
  const unLinkgoogle = () => {
    unLink('google.com');
  };
  const Linkfacebook = () => {
    Link(new firebase.auth.FacebookAuthProvider());
  };
  const Linkgoogle = () => {
    Link(new firebase.auth.GoogleAuthProvider());
  };
  return (
    <div>
      {connected['google.com'] && (
        <Tag color="red" closable onClose={unLinkgoogle}>
          <Icon icon="google" /> Connected
        </Tag>
      )}
      {connected['facebook.com'] && (
        <Tag color="blue" closable onClose={unLinkfacebook}>
          <Icon icon="facebook" /> Connected
        </Tag>
      )}
      <div className="mt-3">
        {!connected['google.com'] && (
          <Button block color="red" onClick={Linkgoogle}>
            <Icon icon="google" /> Link your account to google
          </Button>
        )}
        {!connected['facebook.com'] && (
          <Button block color="blue" onClick={Linkfacebook}>
            <Icon icon="facebook" /> Link your account to facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default LinkSocial;
