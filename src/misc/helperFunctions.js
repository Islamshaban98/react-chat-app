export function splitName(name) {
  const splitted = name.toUpperCase().split(' ');
  if (splitted.length > 1) {
    return splitted[0][0] + splitted[1][0];
  }
  return splitted[0][0];
}
export function hashName(name) {
  const replaced = name.replace(/\s/g, '_')
  return replaced;
  // const splitted = name.split(' ');
  // if (splitted.length > 1) {
  //   return `${splitted[0]}-${splitted[1]}-${splitted[2]}`;
  // }
  // return splitted[0];
}

export function convertToArray(dataSnapShot) {
  return dataSnapShot
    ? Object.keys(dataSnapShot).map(channelId => {
        return { ...dataSnapShot[channelId], id: channelId };
      })
    : [];
}

export async function getUserUpdate(userId, keyToUpdate, value, database) {
  const update = {};
  update[`/profiles/${userId}/${keyToUpdate}`] = value;
  const getMsgs = database
    .ref('/messages')
    .orderByChild('author/uid')
    .equalTo(userId)
    .once('value');
  const getChannels = database
    .ref('/channels')
    .orderByChild('lastMessage/author/uid')
    .equalTo(userId)
    .once('value');
  const [messagesSnapShot, channelsSnapShot] = await Promise.all([
    getMsgs,
    getChannels,
  ]);
  messagesSnapShot.forEach(msgSnapShot => {
    update[`/messages/${msgSnapShot.key}/author/${keyToUpdate}`] = value;
  });
  channelsSnapShot.forEach(channelSnapShot => {
    update[
      `/channels/${channelSnapShot.key}/lastMessage/author/${keyToUpdate}`
    ] = value;
  });

  return update;
}
