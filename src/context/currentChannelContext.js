import React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

const currentChannelContext = createContext();

export const CurrentChannelProvider = ({ children, data }) => {
  return (
    <currentChannelContext.Provider value={data}>
      {children}
    </currentChannelContext.Provider>
  );
};

export const useCurrentChannel = selector =>
  useContextSelector(currentChannelContext, selector);
