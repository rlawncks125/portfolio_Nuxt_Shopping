import { ApiServer } from "~~/plugins/api-server";

export const getImageURLByFormData = async (file: File) => {
  // useFetch사용시 formData를 몾찾는 에러 발생
  // return await fetch(`${ApiServer.url}/file`, {
  //   method: "post",
  //   body: form,
  // })
  //   .then((res) => res.json())
  //   .then((result) => result.secure_url as String);

  const form = new FormData();
  form.append("file", file, file.name);
  return ApiServer.axios
    .post("/file", form)
    .then((res) => res.data.secure_url as string);
};

export const deleteImageUrl = async (url: string) => {
  // 삭제할 파일 이름 만 추출하는 작업
  const imageURL = url
    .split("/")
    .pop()
    ?.split(".")[0];

  let isDeleted = false;

  const deleteResult = await ApiServer.axios
    .delete(`file/${imageURL}`)
    .then((res: any) => res.data.deleted);

  if (Object.values(deleteResult).length > 0) {
    isDeleted = true;
  }
  return isDeleted;
};
