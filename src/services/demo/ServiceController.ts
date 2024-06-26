/* eslint-disable */
import { request } from '@umijs/max';

/** GET /cms/get_categories */
export async function queryServiceList(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  console.log(params, options);
  return request<API.Service[]>('/cms/get_categories', {
    method: 'GET',
    params,
    ...options,
  });
}

/** No comments are provided by the backend here
 *  POST /crud/create/cms */
export async function addService(
  body?: API.ServiceVO,
  options?: { [key: string]: any },
) {
  return request<any>('/crud/create/cms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...body, items: [] },
    ...(options || {}),
  });
}

/** No comments are provided by the backend here
 *  GET /api/v1/service/${id} */
export async function getServiceDetail(
  params: {
    // path
    /** serviceId */
    serviceId?: string;
  },
  options?: { [key: string]: any },
) {
  const { serviceId: id } = params;
  return request<API.Service>(`/api/v1/service/${id}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** No comments are provided by the backend here
 *  PUT /api/v1/service/${id} */
export async function modifyService(
  params: {
    // path
    /** serviceId */
    serviceId?: string;
  },
  body?: API.ServiceVO,
  options?: { [key: string]: any },
) {
  const { serviceId: id } = params;
  return request<API.Service>(`/api/v1/service/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** No comments are provided by the backend here
 *  DELETE /api/v1/service/${id} */
export async function deleteService(
  params: {
    // path
    /** serviceId */
    serviceId?: string;
  },
  options?: { [key: string]: any },
) {
  const { serviceId: id } = params;
  return request<API.Result_string_>(`/api/v1/service/${id}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
