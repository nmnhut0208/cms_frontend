declare namespace API {
  interface PageInfo {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_UserInfo_ {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_UserInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_UserInfo_;
  }

  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface UserInfo {
    id?: string;
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
  }

  interface UserInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }

  type definitions_0 = null;

  type ServiceItemProperty = {
    name: string;
    type: string; // [input, select]
    selectOptions?: Array<string>;
  };

  type ServiceItem = {
    name: string;
    code: string;
    properties: Array<ServiceItemProperty>;
    description?: string;
    imgUrl?: string;
    payload?: Record<string, any>;
    otherInfo?: Record<string, any>;
  };

  type ServiceItemVO = {
    name: string;
    code: string;
    description?: string;
    imgUrl?: string;
    payload?: Record<string, any>;
    properties: Array<ServiceItemProperty>;
  };

  type Service = {
    name: string;
    code: string;
    description?: string;
    type: string; // [txt2img, img2img]
    items: Array<ServiceItem>;
    otherInfo?: Record<string, any>;
  };

  interface ServiceVO {
    name: string;
    code: string;
    description?: string;
    type: string;
  }
}
