import { ApiServer } from "~~/plugins/api-server";

export const getImageURLByFormData = async (form: FormData) => {
  // useFetch상용시 formData를 몾찾는 에러 발생
  return await fetch(`${ApiServer.url}/file`, {
    method: "post",
    body: form,
  })
    .then((res) => res.json())
    .then((result) => result.secure_url as String);
};
