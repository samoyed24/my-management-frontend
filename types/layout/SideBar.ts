import { RouteRecordRaw } from "vue-router"

export interface SideBarItemProps {
  route: RouteRecordRaw
  parentPath: string
}