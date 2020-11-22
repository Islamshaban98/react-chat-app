import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let userRef;

    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', script => {
          const { name, createdAt } = script.val();

          const data = {
            name,
            createdAt,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setLoading(false);
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        setProfile(null);
        setLoading(false);
      }
    });
    return () => {
      authUnsub();

      if (userRef) {
        userRef.off();
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
