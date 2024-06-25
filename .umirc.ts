import { defineConfig } from '@umijs/max';

export default defineConfig({
  locale: {
    default: 'en-US',
    baseSeparator: '-',
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Home',
      path: '/home',
      component: './Home',
    },
    {
      name: 'Access Control',
      path: '/access',
      component: './Access',
    },
    {
      name: 'CRUD Example',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
});
