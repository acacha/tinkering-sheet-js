import Vue from 'vue'
import Router from 'vue-router'
import SheetJS from '@/components/SheetJS'
import SheetJS2 from '@/components/SheetJS2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SheetJS',
      component: SheetJS
    },
    {
      path: '/sheetjs',
      name: 'SheetJS',
      component: SheetJS
    },
    {
      path: '/sheetjs2',
      name: 'SheetJS2',
      component: SheetJS2
    }
  ]
})
