import { ApiServer } from "~~/plugins/api-server";
import {
  CreateShopUserInputDto,
  CreateShopUserOutPut,
  LoginShopUserOutPut,
} from "./swagger";
interface Iauth {
  username: string;
  password: string;
}

export const userLogin = async (auth: Iauth) => {
  return ApiServer.axios
    .get("shop-user", { auth })
    .then((res) => res.data as LoginShopUserOutPut);
};

export const userCreate = async (
  auth: Iauth,
  input: CreateShopUserInputDto
) => {
  return ApiServer.axios
    .post("shop-user/", input, {
      auth: auth,
    })
    .then((res) => res.data as CreateShopUserOutPut);
};
