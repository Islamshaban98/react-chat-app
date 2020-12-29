import { useState, useCallback, useEffect } from 'react';
import { database } from './firebase';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  return { open, close, isOpen };
};

// media query  by hooks

export const useMediaQuery = query => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);
    const listener = evt => setMatches(evt.matches);
    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};

export function usePresence(uid) {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    const statusRef = database.ref(`/status/${uid}`);
    statusRef.on('value', snap => {
      if (snap.exists()) {
        const data = snap.val();
        setPresence(data);
      }
    });
  }, [uid]);
  return presence;
}
