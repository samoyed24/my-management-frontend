<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';
import SideBarItem from './SideBarItem.vue'


interface Props {
  route: RouteRecordRaw
  parentPath: string
}

const props = defineProps<Props>()

</script>

<template>
    <el-sub-menu v-if="route.children && route.meta" :index="route.path" class="glass-sub-item">
        <template #title>
            <el-icon>
                <component :is="route.meta.icon"></component>
            </el-icon>
            {{ route.name }}
        </template>
        <side-bar-item v-for="children in route.children" :route="children" :parent-path="parentPath + '/' + route.path" />
    </el-sub-menu>
    <el-menu-item v-else v-if="route.meta" :key="route.path" :index="parentPath + '/' + route.path" class="glass-item">
        <el-icon>
            <component :is="route.meta.icon"></component>
        </el-icon>
        {{ route.name }}
    </el-menu-item>
</template>
