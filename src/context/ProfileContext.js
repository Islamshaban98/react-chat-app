import React, { useState, useEffect, createContext, useContext } from 'react';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();
export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusDatabaseRef;
    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userStatusDatabaseRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', dataSnapShot => {
          const { name, createsAt, avatar } = dataSnapShot.val();
          const data = {
            name,
            createsAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setLoading(false);
        });
        database.ref('.info/connected').on('value', snapshot => {
          if (!!snapshot.val() === false) {
            return;
          }
          userStatusDatabaseRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusDatabaseRef.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        if (userStatusDatabaseRef) {
          userStatusDatabaseRef.off();
        }
        database.ref('.info/connected').off();
        setProfile(null);
        setLoading(false);
      }
    });
    return () => {
      authUnsub();
      database.ref('.info/connected').off();

      if (userRef) {
        userRef.off();
      }
      if (userStatusDatabaseRef) {
        userStatusDatabaseRef.off();
      }
    };
  }, []);
  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
