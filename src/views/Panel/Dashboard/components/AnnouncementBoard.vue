<script setup lang="ts">
import { PaginationProps, TableColumnProps } from '@/components/GeneralTable/CustomTable.vue'

export interface AnnouncementItemProps {
    level: number
    tag: string
    author: string
    title: string
    time: string
}

const customTableRef = ref()
const tableColumnProps = ref<TableColumnProps[]>([
    {
        prop: 'title',
        label: '标题',
        minWidth: '35%',
    },
    {
        prop: 'author',
        label: '发布部门',
        minWidth: '15%',
        align: 'center',
    },
    {
        prop: 'time',
        label: '发布时间',
        minWidth: '15%',
        align: 'center',
    },
    {
        prop: 'operation',
        label: '详情',
        minWidth: '15%',
        align: 'center',
    },
])

const tableData = reactive<AnnouncementItemProps[]>([
    {
        level: 4,
        tag: '注意',
        author: '工程部',
        title: '项目A施工进度调整通知',
        time: '2025-10-22'
    },    
    {
        level: 5,
        tag: '重要',
        author: '安全部',
        title: '安全生产专项检查启动',
        time: '2025-10-20'
    },    
    {
        level: 4,
        tag: '注意',
        author: '工程部',
        title: '项目B竣工验收时间确定',
        time: '2025-10-21'
    },    
    {
        level: 3,
        tag: '公告',
        author: '信息中心',
        title: '新版本系统上线通知',
        time: '2025-10-23'
    },    
    {
        level: 3,
        tag: '公告',
        author: '采购部',
        title: '材料采购流程优化',
        time: '2025-10-19'
    },    
    {
        level: 2,
        tag: '通知',
        author: '综合办公室',
        title: '节能减排月活动启动',
        time: '2025-10-21'
    },    
    {
        level: 4,
        tag: '注意',
        author: '财务部',
        title: '财务报销制度更新',
        time: '2025-10-10'
    },    
    {
        level: 3,
        tag: '公告',
        author: '人事部',
        title: '员工健康体检安排',
        time: '2025-10-16'
    },    
    {
        level: 4,
        tag: '注意',
        author: '设备管理部',
        title: '设备维护计划提醒',
        time: '2025-10-23'
    },    
    {
        level: 3,
        tag: '公告',
        author: '培训中心',
        title: '员工培训报名通知',
        time: '2025-10-24'
    },
    
])

const handleSortChange = () => {}

const tableLoading = ref(false)
const setTableLoading = (status: boolean) => { tableLoading.value = status }

const itemTotal = ref(0)

const paginationProps = reactive<PaginationProps>({
    pageSize: 8,
    itemCount: 0,
    currentPage: 1,
})

const handlePageChange = (e: number) => {
    customTableRef.value?.scrollToTop()
    paginationProps.currentPage = e
    // fetchData()
}

const calcTypeFromLevel = (level: number)  => {
    if (level <= 1) return 'info'
    else if (level <= 2) return 'primary'
    else if (level <= 3) return 'success'
    else if (level <= 4) return 'warning'
    else return 'danger'
}


</script>

<template>
    <custom-card :header="{ icon: 'BellFilled', text: '公告栏' }" :no-padding="true">
        <custom-table 
            ref="customTableRef"
            :table-data="tableData" 
            :table-column-props="tableColumnProps" 
            :index-width="'10%'"
            @sort-change="handleSortChange"
            class="custom-table"
            :height="300"
            :loading="tableLoading"
            :item-total="itemTotal"
            @page-change="handlePageChange"
            :pagination-props="paginationProps"
        >
            <template #title="{ row } : { row: AnnouncementItemProps }">
                <el-tag :type="calcTypeFromLevel(row.level)">{{ row.tag }}</el-tag>
                {{ row.title }}
            </template>
            <template #operation="{ row } : { row: AnnouncementItemProps }">
                <el-button type="text">查看</el-button>
            </template>
        </custom-table>
    </custom-card>
</template>