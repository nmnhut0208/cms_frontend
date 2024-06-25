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
      redirect: '/services',
    },
    {
      name: 'Services',
      path: '/services',
      component: './Services',
    },
    {
      // name: 'Sub-services',
      path: '/services/:id',
      component: './Services/:id',
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
