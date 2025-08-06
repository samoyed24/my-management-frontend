<script setup lang="ts">
import { useRoute, RouteRecordRaw, RouteMeta } from 'vue-router'

interface Props {
  routes: RouteRecordRaw
}

const route = useRoute()
const props = defineProps<Props>()
const parentRoute = props.routes

const filteredRoutes = computed(() =>
  props.routes.children?.filter(
    (route): route is RouteRecordRaw & { meta: RouteMeta } => !!route.meta
  ) || []
)

</script>

<template>
    <el-menu :default-active="route.path" mode="vertical" :ellipsis="false" class="glass-menu sidebar" router>
        <el-menu-item v-for="route in filteredRoutes" :key="route.path" :index="`${parentRoute.path}/${route.path}`">
            <el-icon>
                <component :is="route.meta.icon"></component>
            </el-icon>
            {{ route.meta.title }}
        </el-menu-item>
    </el-menu>
</template>

<style scoped>
.sidebar {
    height: 100%;
}
</style>

