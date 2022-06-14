import { RouteRecordRaw } from "vue-router";
import { renderIcon } from "@/utils";
import { BankOutlined, FileTextOutlined, MessageOutlined, PictureOutlined, ReadOutlined } from '@vicons/antd'
import { Layout } from "../constant";

const routeName = 'home';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    name: routeName,
    meta: {
      title: 'Root',
    },
    children: [  
      {
        path: 'home',
        name: `${routeName}_home`,
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: renderIcon(BankOutlined),
          sort: 0,
        },
      },
      {
        path: 'articles',
        name: `${routeName}_articles`,
        component: () => import('@/views/articles/index.vue'),
        meta: {
          title: '文章',
          icon: renderIcon(ReadOutlined),
          sort: 1,
        },
      },
      {
        path: 'pictures',
        name: `${routeName}_pictures`,
        component: () => import('@/views/pictures/index.vue'),
        meta: {
          title: '图片',
          icon: renderIcon(PictureOutlined),
          sort: 2,
        }
      },
      {
        path: 'discuss',
        name: `${routeName}_discuss`,
        component: () => import('@/views/discuss/index.vue'),
        meta: {
          title: '讨论',
          icon: renderIcon(MessageOutlined),
          sort: 3,
        },
      },
    ]
  }
];

export default routes;