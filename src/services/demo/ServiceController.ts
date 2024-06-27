/* eslint-disable */
import { request } from '@umijs/max';

/** GET /get_categories */
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
  return request<API.Service[]>('/get_categories', {
    method: 'GET',
    params,
    ...options,
  });
}

/** No comments are provided by the backend here
 *  POST /add_category */
export async function addService(
  body?: API.ServiceVO,
  options?: { [key: string]: any },
) {
  return request<any>('/add_category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...body, items: [] },
    ...(options || {}),
  });
}

/** No comments are provided by the backend here
 *  PUT /update_category/${id} */
export async function modifyService(
  params: {
    serviceName?: string;
  },
  body?: API.ServiceVO,
  options?: { [key: string]: any },
) {
  const { serviceName: name } = params;
  return request<API.Service>(`/update_category/${name}`, {
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
 *  DELETE /delete_category/${id} */
export async function deleteService(
  params: {
    serviceName?: string;
  },
  options?: { [key: string]: any },
) {
  const { serviceName: name } = params;
  return request<API.Result_string_>(`/delete_category/${name}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
