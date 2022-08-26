import { ApiServer } from "~~/plugins/api-server";
import {
  AddCompanyInputDto,
  AddCompanyOutPutDto,
  CoreOutPut,
  CreateShopUserInputDto,
  CreateShopUserOutPut,
  LoginShopUserOutPut,
  UpdateCompanyInutDto,
  UpdateCompanyOutPutDto,
  UpdateShopUserInput,
  UpdateShopUserOutPut,
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

export const userAddCompany = async (body: AddCompanyInputDto) => {
  return ApiServer.axios
    .post("shop-user/company", body)
    .then((res) => res.data as AddCompanyOutPutDto);
};

export const userPasswordChekced = async (password: string) => {
  return ApiServer.axios
    .get("shop-user/passwordConfirm", {
      auth: {
        username: "",
        password,
      },
    })
    .then((res) => res.data as CoreOutPut);
};

export const userModify = async (data: UpdateShopUserInput) => {
  return ApiServer.axios
    .patch("shop-user", data)
    .then((res) => res.data as UpdateShopUserOutPut);
};

export const userGetMyInfo = async () => {
  return ApiServer.axios
    .get("shop-user/myinfo")
    .then((res) => res.data as LoginShopUserOutPut);
};

// jsDoc
/**
 * 판매자 정보 수정 기능 입니다.
 * @param data - input data transfer object
 * @returns
 */
export const userSellerModify = async (data: UpdateCompanyInutDto) => {
  return ApiServer.axios
    .patch("shop-user/company", data)
    .then((res) => res.data as UpdateCompanyOutPutDto);
};
