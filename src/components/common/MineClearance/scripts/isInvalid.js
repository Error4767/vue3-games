export default function isInvalid(position) {
  return position[0] < 0 || position[1] < 0 ? true : false;
}