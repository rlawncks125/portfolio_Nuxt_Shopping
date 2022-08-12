import axios from "axios";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const { reCAPTCHA_SECRET_KEY } = useRuntimeConfig();
  const response = await useBody(event);

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHA_SECRET_KEY}&response=${response}`;

  // return await fetch(url, {
  //   method: "POST",
  // }).then((res) => res.json());

  return await axios.get(url).then((res) => res.data);
});
