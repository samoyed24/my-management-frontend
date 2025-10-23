<script setup lang="ts">
import { TableProp } from '@/components/GeneralTable/CustomTable.vue'

export interface AnnouncementItemProps {
    type: "primary" | "success" | "warning" | "info" | "danger"
    tag: string
    text: string
}

const customTableRef = ref()
const tableProps = ref<TableProp[]>([
    {
        prop: 'tag',
        minWidth: ''
    }
])

</script>

<template>
    <custom-card :header="{ icon: 'Notification', text: '公告栏' }">
        <!-- <custom-table            
            ref="customTableRef"
            :height="425"
        > -->

        <!-- </custom-table> -->
    </custom-card>
</template>