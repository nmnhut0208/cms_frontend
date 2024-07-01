import { defineConfig } from '@umijs/max';

export default defineConfig({
  // define: { 'process.env.BACKEND_URI': process.env.BACKEND_URI },
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
      icon: 'DesktopOutlined',
    },
    {
      path: '/services/:serviceName',
      component: './Items',
    },
    {
      name: 'Generate Images',
      path: '/generate',
      component: './Generate',
      icon: 'FileImageOutlined',
    },
    {
      name: 'Test Payload',
      path: '/test-payload',
      component: './TestPayload',
      icon: 'BugOutlined',
    },
  ],
  npmClient: 'pnpm',
});
