import { NIcon } from 'naive-ui';
import { h } from 'vue';

export function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
};

export function generatorMenu(routerMap: any[]) {
  return routerMap.map((item) => {
    const isRoot = isRootRouter(item); 
    const info = item;
    let currentMenu = {
      ...info,
      ...info.meta,
      label: info.meta?.title,
      key: info.name,
      icon: info.meta?.icon,
    };

    if (isRoot) {
      currentMenu = generatorMenu(item.children);
    }
    //console.log(currentMenu);

    if (info.children && info.children.length) {
      currentMenu.children = generatorMenu(info.children);
    }

    return currentMenu;
  })
};

export function isRootRouter(item) {
  return item.meta?.title === 'Root';
}