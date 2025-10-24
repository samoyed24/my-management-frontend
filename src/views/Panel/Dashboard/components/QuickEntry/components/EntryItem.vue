<script setup lang="ts">
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'


const router = useRouter()
export interface EntryItemProps {
    routeName: string
}

const props = defineProps<EntryItemProps>()

const getRouteFromName = (): RouteRecordRaw | undefined => {
    return router.getRoutes().find(r => r.name == props.routeName)
}

const selectedRoute = getRouteFromName()

const handleChangeRoute = () => {
    if (!selectedRoute) return
    router.push(selectedRoute?.path)
}

</script>

<template>
    <div class="entry-container">
        <div class="icon-area" @click="handleChangeRoute">
            <component :is="selectedRoute?.meta?.icon" class="icon"  />
        </div>
        <div class="title-area">
            {{ selectedRoute?.meta?.title }}
        </div>
    </div>
</template>

<style lang="css" scoped>
.icon-area {
    margin: 3px 21px;
    margin-bottom: 7px;
    display: flex;
    border-radius: 3px;
    background-color: var(--el-color-primary);
    transition: background-color 0.5s ease;
}
.entry-container {
    padding: 5px 0;
    cursor: pointer;
    transition: background-color 0.5s ease;
}
.icon {
    padding: 8px;
    color: white;
}
.title-area {
    font-size: 12px;
    text-align: center;
    color: #404040;
    transition: color 0.5s ease;
}
.entry-container:hover .icon-area {
    background-color: #0982ff;
}
.entry-container:hover .title-area {
    color: #0982ff;
}
</style>