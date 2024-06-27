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
    title: 'Stable Diffusion',
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
      path: '/services/:serviceName',
      component: './Items',
    },
  ],
  npmClient: 'pnpm',
});
