import axios from "axios";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const body = (await useBody(event)) as {
    secret: string;
    response: string;
  };

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${body.secret}&response=${body.response}`;

  // return await fetch(url, {
  //   method: "POST",
  // }).then((res) => res.json());

  return await axios.get(url).then((res) => res.data);
});
