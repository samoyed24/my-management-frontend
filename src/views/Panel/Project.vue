<script setup lang="ts">
import ButtonArea from '@/components/GeneralTable/ButtonArea.vue';
import FilterArea from '@/components/GeneralTable/FilterArea.vue';
import CustomTable from '@/components/GeneralTable/CustomTable.vue';
import { ProjectFilterParams, ProjectTableData } from 'types/project';
import { Delete, EditPen } from '@element-plus/icons-vue';
import { PROJECT_STATUS_COLOR_MAPPING, PROJECT_STATUS_MAPPING, ProjectStatusKey } from '@/constants/mapping/project';
import { getProjectData } from '@/api/manager';
import { GeneralInputProps } from 'types/components/base/input';
import { PaginationProps } from 'types/components/GeneralTable/CustomTable';
import { ButtonAreaRecord } from 'types/components/GeneralTable/ButtonArea';
import { TableProp } from 'types/components/GeneralTable/CustomTable';
import { Option } from 'types/components/base/input';

const projectFiltergGenerator: () => ProjectFilterParams = () => ({
    name: '',
    client: '',
    startDate: [null, null],
    status: null,
})
const projectFilterParams: ProjectFilterParams = reactive(projectFiltergGenerator())
const updateFilterParams = (newParams: ProjectFilterParams) => {
    paginationProps.itemCount = 0
    Object.assign(projectFilterParams, newParams)
    fetchData()
}

const projectStatusOptions: Option<ProjectStatusKey>[] = 
    Object.entries(PROJECT_STATUS_MAPPING).map(([value, label]) => ({ value: value as ProjectStatusKey, label }));

const upperInputProps: GeneralInputProps[] = [
    {
        span: 12,
        label: '项目名称',
        prop: 'name',
        type: 'normal',
        placeholder: '请输入项目名称'
    },
    {
        span: 12,
        label: '客户名称',
        prop: 'client',
        type: 'normal',
        placeholder: '请输入客户名称'
    },
]

const lowerInputProps: GeneralInputProps[] = [
    {
        span: 12,
        label: '开始日期',
        prop: 'startDate',
        type: 'date',
        subType: 'daterange',
        startPlaceholder: '起始日期',
        endPlaceholder: '终止日期'
    },
    {
        span: 12,
        label: '项目状态',
        prop: 'status',
        type: 'select',
        options: projectStatusOptions,
        placeholder: '请选择项目状态',
    },
]

const buttonRecords: ButtonAreaRecord[] = [
    {
        span: 3,
        text: "添加项目",
        icon: 'Plus',
        type: 'primary',
        method: () => {}
    },
    {
        span: 3,
        text: "刷新",
        icon: 'Refresh',
        type: 'primary',
        method: () => fetchData()
    },
    {
        span: 3,
        text: "导出全部",
        icon: 'Upload',
        type: 'success',
        method: () => {}
    },
    {
        span: 3,
        text: "导出当前视图",
        icon: 'Upload',
        type: 'success',
        method: () => {}
    },
    {
        span: 3,
        text: "导入Excel",
        icon: 'Download',
        type: 'success',
        method: () => {}
    },
    {
        span: 3,
        text: "下载导入模板",
        icon: 'Download',
        type: 'success',
        method: () => {}
    },
]

const tableData: ProjectTableData[] = reactive<ProjectTableData[]>([])

const tableProps: TableProp[] = [
    {
        label: '项目名称',
        prop: 'name',
        width: 160,
    },
    {
        label: '客户名称',
        prop: 'client',
        width: 160,
    },
    {
        label: '合同额(元)',
        prop: 'amount',
        width: 120,
        sortable: 'custom'
    },
    {
        label: '开始日期',
        prop: 'startDate',
        width: 160,
        sortable: 'custom'
    },
    {
        label: '状态',
        prop: 'status',
        width: 100
    },
    {
        label: '描述',
        prop: 'description',
        width: 160,
    },
    {
        label: '操作',
        prop: 'operation',
    },
]

const handleSortChange = () => {}

const tableLoading = ref(false)
const setTableLoading = (status: boolean) => { tableLoading.value = status }

const itemTotal = ref(0)

const paginationProps = reactive<PaginationProps>({
    pageSize: 10,
    itemCount: 0,
    currentPage: 1,
})

const handlePageChange = (e: number) => {
    customTableRef.value?.scrollToTop()
    paginationProps.currentPage = e
    fetchData()
}

const customTableRef = ref()

const fetchData = async () => {
    try {
        setTableLoading(true)
        const resp = await getProjectData({
            name: projectFilterParams.name.length !== 0 ? projectFilterParams.name : null,
            client: projectFilterParams.client.length !== 0 ? projectFilterParams.client : null,
            startDateFrom: projectFilterParams.startDate[0] ? projectFilterParams.startDate[0].toISOString() : null,
            startDateTo: projectFilterParams.startDate[1] ? projectFilterParams.startDate[1].toISOString() : null,
            status: projectFilterParams.status ? projectFilterParams.status : null,
            pageSize: paginationProps.pageSize,
            currentPage: paginationProps.currentPage
        })
        tableData.splice(0, tableData.length, ...(resp.data?.list ?? []))
        paginationProps.itemCount = resp.data?.total ? resp.data.total : 0
    } 
    finally {
        setTableLoading(false)
    }
}

fetchData()

</script>

<template>
    <el-space direction="vertical" class="full custom-space" :size="20">
        <filter-area :generator="projectFiltergGenerator" :upper-input="upperInputProps" :lower-input="lowerInputProps" @update-filter="updateFilterParams" />
        <button-area :gutter="24" :buttons="buttonRecords" />
        <custom-table 
            ref="customTableRef"
            :table-data="tableData" 
            :table-props="tableProps" 
            :show-index="true" 
            @sort-change="handleSortChange"
            class="custom-table"
            :height="425"
            :loading="tableLoading"
            :item-total="itemTotal"
            @page-change="handlePageChange"
            :pagination-props="paginationProps"
        >
            <template #amount="{ row } : { row: ProjectTableData }">
                {{ row.amount / 100 }}
            </template>
            <template #status="{ row } : { row: ProjectTableData }">
                <div class="status-cell">
                    <span class="dot" :style="{backgroundColor: PROJECT_STATUS_COLOR_MAPPING[row.status]}"></span>
                    {{ PROJECT_STATUS_MAPPING[row.status] }}
                </div>
            </template>
            <template #operation="{ row } : { row: ProjectTableData }">
                <el-button type="primary" text>
                    <el-icon>
                        <EditPen />
                    </el-icon>
                    编辑
                </el-button>
                <el-button type="danger" text>
                    <el-icon>
                        <Delete />
                    </el-icon>
                    删除
                </el-button>
            </template>
        </custom-table>
    </el-space>
</template>

<style scoped>
.custom-space > * {
    align-self: stretch;
}
:deep(.el-row) {
    margin-left: 0 !important;
    margin-right: 0 !important;
}
.custom-table {
    flex: 1;
    min-height: 0;
}
.status-cell {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
}
.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}
</style>