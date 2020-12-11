export function splitName(name) {
  const splitted = name.toUpperCase().split(' ');
  if (splitted.length > 1) {
    return splitted[0][0] + splitted[1][0];
  }
  return splitted[0][0];
}
export function hashName(name) {
  const splitted = name.split(' ');
  if (splitted.length > 1) {
    return `${splitted[0]}-${splitted[1]}`;
  }
  return splitted[0];
}

export function convertToArray(dataSnapShot) {
  return dataSnapShot
    ? Object.keys(dataSnapShot).map(channelId => {
        return { ...dataSnapShot[channelId], id: channelId };
      })
    : [];
}
