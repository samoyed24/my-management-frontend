<script setup lang="ts">
import { useRoute, RouteRecordRaw, RouteMeta } from 'vue-router'
import SideBarItem from '@/layouts/SideBar/SideBarItem.vue'

interface Props {
  routes: RouteRecordRaw
}

const route = useRoute()
const props = defineProps<Props>()
const parentRoute = props.routes

</script>

<template>
    <el-menu :default-active="route.path" mode="vertical" :ellipsis="false" class="glass-menu sidebar" background-color="none" router>
        <div class="scroll-wrapper">
            <el-scrollbar>
                <side-bar-item
                v-for="menuRoute in parentRoute.children"
                :key="menuRoute.path"
                :route="menuRoute"
                :parent-path="parentRoute.path"
                />
            </el-scrollbar>
        </div>
    </el-menu>
</template>

<style scoped>
.sidebar {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.scroll-wrapper {
  flex: 1;
  overflow: hidden;
}
</style>

