import axios from "axios";
import { defineHandler } from "h3";

export default defineHandler(async (event) => {
  const body = useBody(event);

  return await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    body
  );
});
