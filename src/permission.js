import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

router.beforeEach((to, from, next) => {
  NProgress.start();
  let type = to.query.type;
  if (type === 'response') {
    next()
  } else {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      if (store.getters.permissions.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          //这边因为刚初始化了路由，所以需要重新定向到to的路由
          next({path: to.path})
        }).catch((err) => {
        })
      } else {
        next()
      }
    }
  }
  NProgress.done()
})



