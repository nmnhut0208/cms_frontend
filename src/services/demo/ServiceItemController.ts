/* eslint-disable */
import { request } from '@umijs/max';

/** GET /get_categories */
export async function queryServiceItemList(
  serviceName: string,
): Promise<API.ServiceItem[]> {
  return request<API.Service>(`/get_items/${serviceName}`, {
    method: 'GET',
  }).then((res) => res.items || []);
}

/** No comments are provided by the backend here
 *  POST /add_item/${serviceName} */
export async function addServiceItem(
  params: { serviceName: string },
  body?: API.ServiceItem,
) {
  return request<any>(`/add_item/${params.serviceName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...body },
  });
}

/** No comments are provided by the backend here
 *  PUT /update_item/${serviceName}/${serviceItemName} */
export async function modifyServiceItem(
  params: {
    serviceItemName: string;
    serviceName: string;
  },
  body?: API.PartialServiceItem,
  options?: { [key: string]: any },
) {
  const { serviceItemName: name, serviceName } = params;
  return request<API.ServiceItem>(`/update_item/${serviceName}/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** No comments are provided by the backend here
 *  DELETE /delete_item/${serviceName}/${name} */
export async function deleteServiceItem(
  params: {
    serviceName: string;
    serviceItemName: string;
  },
  options?: { [key: string]: any },
) {
  const { serviceItemName: name, serviceName } = params;
  return request<API.Result_string_>(`/delete_item/${serviceName}/${name}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
