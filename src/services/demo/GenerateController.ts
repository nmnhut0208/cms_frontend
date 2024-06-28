/* eslint-disable */
import { request } from '@umijs/max';

/** No comments are provided by the backend here
 *  POST /add_category */
export async function generateImage(body?: API.GenerateTaskBody) {
  return request<any>('/predict_image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}
