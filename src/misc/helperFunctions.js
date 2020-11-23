export function splitName(name) {
  const splitted = name.toUpperCase().split(' ');
  if (splitted.length > 1) {
    return splitted[0][0] + splitted[1][0];
  }
  return splitted[0][0];
}
