// Runtime Configuration

import { RequestConfig } from '@umijs/max';

// Global initialization data configuration, used for Layout user information and permission initialization
// For more information, see the documentation: https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

export const request: RequestConfig = {
  // baseURL: 'https://flutter-backend-jhac.onrender.com/backend/cms',
  baseURL: process.env.BACKEND_URI,
};
