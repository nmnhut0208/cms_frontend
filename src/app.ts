// Runtime Configuration

import { RequestConfig } from '@umijs/max';

// Global initialization data configuration, used for Layout user information and permission initialization
// For more information, see the documentation: https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name?: string }> {
  return {};
}

export const layout = () => {
  return {
    logo: 'https://seeklogo.com/images/S/stability-ai-icon-logo-B849DEA6FA-seeklogo.com.png',
    menu: {
      locale: false,
    },
  };
};

export const request: RequestConfig = {
  baseURL: 'https://flutter-backend-jhac.onrender.com/backend/cms',
};
