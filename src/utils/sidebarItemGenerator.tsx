import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types";

export const sidebarItemGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.element) {
      const fullPath = `/dashboard/${role}/${item.path}`;
      // console.log(`Generated path for ${item.name}:`, fullPath);
      acc.push({
        key: item.name,
        label: <NavLink to={fullPath}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          const childFullPath = `/dashboard/${role}/${child.path}`;
          // console.log(`Generated child path for ${child.name}:`, childFullPath);
          return {
            key: child.name,
            label: <NavLink to={childFullPath}>{child.name}</NavLink>,
          };
        }),
      });
    }
    return acc;
  }, []);
  return sidebarItems;
};
