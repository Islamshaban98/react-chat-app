import React, { createContext, useState, useEffect, useContext } from 'react';
import { database } from '../misc/firebase';
import { convertToArray } from '../misc/helperFunctions';

const ChannelContext = createContext();

export const ChannelsProvider = ({ children }) => {
  const [channels, setChannels] = useState(null);
  useEffect(() => {
    const channelRef = database.ref('channels');
    channelRef.on('value', dataSnapShot => {
      // console.log(dataSnapShot.val());
      const channelArray = convertToArray(dataSnapShot.val());
      setChannels(channelArray);
    });
    return () => {
      channelRef.off();
    };
  }, []);

  return (
    <ChannelContext.Provider value={channels}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannels = () => useContext(ChannelContext);
