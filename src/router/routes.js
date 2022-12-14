
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '/', redirect:'/home' },
      // { path: '/home', component: () => import('pages/Index.vue') },
      { path: '/', component: () => import('pages/Single_Page.vue') },
      { path: '/home', component: () => import('pages/Single_Page.vue') },
      { path: '/game', component: () => import('src/pages/Online_Game.vue') },
      { path: '/p2', component: () => import('src/pages/Online_Other_Player.vue') },
      { path: '/selecting_online', component: () => import('pages/Online_Selection.vue') },
      { path: '/howto', component: () => import('pages/Howto.vue') },
      { path: '/settings', component: () => import('pages/Settings.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
