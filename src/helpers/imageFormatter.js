import { SERVER_URL } from "../contants";

export default function imageHelper(image = "") {
  return `${SERVER_URL}${image}`;
}
