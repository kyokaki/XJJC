
const filRouter = {
  path: '/fil',
  component: () => import('@/views/Fil/Main'),
  name: 'Main',
  meta: {
    title: 'Main',
    icon: 'nested'
  },
  children: [
    {
      path: '/box1',
      component: () => import('@/views/Fil/Main/Box1'),
      name: 'Box1',
      meta: { title: 'Box1' },
      children: [
        {
          path: '/default',
          component: () => import('@/views/Fil/Main/Box1/Default'),
          name: 'Default',
          meta: { title: '默认' }
        }
      ]
    }
  ]
}

export default filRouter
