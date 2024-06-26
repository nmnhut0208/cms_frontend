/* eslint-disable */
import { request } from '@umijs/max';

/** GET /cms/get_categories */
export async function queryServiceItemList(
  serviceCode: string,
): Promise<API.ServiceItem[]> {
  return request<API.Service[]>('/cms/get_categories', {
    method: 'GET',
  }).then(
    (res) => res.find((service) => service.code === serviceCode)?.items || [],
  );
}

/** No comments are provided by the backend here
 *  POST /crud/create/cms */
export async function addServiceItem(
  body?: API.ServiceItemVO,
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
 *  GET /api/v1/ServiceItem/${id} */
export async function getServiceItemDetail(
  params: {
    // path
    /** serviceItemId */
    serviceItemId?: string;
  },
  options?: { [key: string]: any },
) {
  const { serviceItemId: id } = params;
  return request<API.ServiceItem>(`/api/v1/ServiceItem/${id}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** No comments are provided by the backend here
 *  PUT /api/v1/ServiceItem/${id} */
export async function modifyServiceItem(
  params: {
    // path
    /** serviceItemId */
    serviceItemId?: string;
  },
  body?: API.ServiceItemVO,
  options?: { [key: string]: any },
) {
  const { serviceItemId: id } = params;
  return request<API.ServiceItem>(`/api/v1/ServiceItem/${id}`, {
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
 *  DELETE /api/v1/ServiceItem/${id} */
export async function deleteServiceItem(
  params: {
    // path
    /** serviceItemId */
    serviceItemId?: string;
  },
  options?: { [key: string]: any },
) {
  const { serviceItemId: id } = params;
  return request<API.Result_string_>(`/api/v1/ServiceItem/${id}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
