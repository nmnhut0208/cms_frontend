/* eslint-disable */
import { request } from '@umijs/max';

/** GET /api/v1/services */
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
  return request<API.Result_PageInfo_Service__>('/api/v1/services', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** No comments are provided by the backend here
 *  POST /api/v1/service */
export async function addService(
  body?: API.ServiceVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_Service_>('/api/v1/service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** No comments are provided by the backend here
 *  GET /api/v1/service/${id} */
export async function getServiceDetail(
  params: {
    // path
    /** serviceId */
    serviceId?: number;
  },
  options?: { [key: string]: any },
) {
  const { serviceId: id } = params;
  return request<API.Result_Service_>(`/api/v1/service/${id}`, {
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
    serviceId?: number;
  },
  body?: API.ServiceVO,
  options?: { [key: string]: any },
) {
  const { serviceId: id } = params;
  return request<API.Result_Service_>(`/api/v1/service/${id}`, {
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
    serviceId?: number;
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
