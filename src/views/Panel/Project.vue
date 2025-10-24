<script setup lang="ts">
import ButtonArea, { ButtonAreaRecord } from '@/components/GeneralTable/ButtonArea.vue';
import FilterArea, { FilterItem } from '@/components/GeneralTable/FilterArea.vue';
import CustomTable, { PaginationProps, TableColumnProps } from '@/components/GeneralTable/CustomTable.vue';
import { Delete, EditPen, View } from '@element-plus/icons-vue';
import { getProjectData } from '@/api/project';
import { ProjectAddFormModel, ProjectFilterParams, ProjectStatus, ProjectTableData } from 'types/project';
import { createDialog } from '@/service/DialogService';
import CustomForm, { CustomFormProps } from '@/components/Base/CustomForm.vue';
import { Option } from '@/components/Base/CustomInput.vue'
import { ProjectStatusColor, ProjectStatusValue } from '@/constants/mapping/project';

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

const projectStatusOptions: Option<ProjectStatus>[] = [
    {
        value: 'End',
        label: ProjectStatusValue.End,
    },
    {
        value: 'Process',
        label: ProjectStatusValue.Process,
    },
    {
        value: 'Quality',
        label: ProjectStatusValue.Quality,
    },
]

const upperFilterItems: FilterItem[] = [
    {
        span: 12,
        label: '项目名称',
        prop: 'name',
        input: {
            type: 'input',
            placeholder: '请输入项目名称'
        }
    },
    {
        span: 12,
        label: '客户名称',
        prop: 'client',
        input: {
            type: 'input',
            placeholder: '请输入客户名称'
        }
    },
]

const lowerFilterItems: FilterItem[] = [
    {
        span: 12,
        label: '开始日期',
        prop: 'startDate',
        input: {
            type: 'date',
            subType: 'daterange',
            startPlaceholder: '起始日期',
            endPlaceholder: '终止日期',
        },
    },
    {
        span: 12,
        label: '项目状态',
        prop: 'status',
        input: {
            type: 'select',
            options: projectStatusOptions,
            placeholder: '请选择项目状态',
        }
    },
]

const handleProjectAddSubmit = (model: ProjectAddFormModel) => {
    console.log(model)
}

const buttonRecords: ButtonAreaRecord[] = [
    {
        span: 4,
        text: "添加项目",
        icon: 'Plus',
        type: 'primary',
        method: () => createDialog<CustomFormProps<ProjectAddFormModel>>(CustomForm, {
            title: '添加项目表单',
            footer: {
                show: false
            },
            width: '40%'
        }, {
            defaultGetter: projectAddFormModelGenerator,
            formItems: [
                {
                    prop: 'name',
                    label: '项目名称',
                    input: {
                        type: 'input',
                        placeholder: '请输入项目名称',
                    },
                    rules: [
                        {
                            required: true,
                            message: '请输入项目名称',
                            trigger: 'blur',
                        },
                    ]
                },
                {
                    prop: 'client',
                    label: '客户名称',
                    input: {
                        type: 'input',
                        placeholder: '请输入客户名称',
                    }
                },
                {
                    prop: 'amount',
                    label: '合同额',
                    input: {
                        type: 'number',
                        suffix: '元',
                        precision: 2,
                        width: '100%',
                        min: 0,
                        step: 1000
                    }
                },
                {
                    prop: 'startDate',
                    label: '开始日期',
                    input: {
                        type: 'date',
                        subType: 'datetime',
                        width: '100%'
                    }
                },
                {
                    prop: 'status',
                    label: '项目状态',
                    input: {
                        type: 'select',
                        placeholder: '请选择项目状态',
                        options: projectStatusOptions
                    }
                },
                {
                    prop: 'description',
                    label: '描述',
                    input: {
                        type: 'textarea',
                        placeholder: '请填写项目描述',
                        autosize: {
                            minRows: 3,
                            maxRows: 6
                        },
                        resize: 'none',
                    },
                }
            ],
            submit: {
                method: handleProjectAddSubmit,
                validationRules: {
                    client: [
                        {
                            required: true,
                            message: '请输入客户名称',
                            trigger: 'blur',
                        },
                    ],
                    name: [
                        {
                            required: true,
                            message: '请输入项目名称',
                            trigger: 'blur',
                        },
                    ],
                    amount: [
                        {
                            required: true,
                            message: '请设置正确的合同额',
                            trigger: 'blur',
                        },
                    ],
                    startDate: [
                        {
                            required: true,
                            message: '请设置正确的开始日期',
                            trigger: 'blur',
                        },
                    ],
                    status: [
                        {
                            required: true,
                            message: '请选择正确的项目状态',
                            trigger: 'blur',
                        },
                    ]
                },
                useConfirm: true,
                confirmText: '是否确认添加此项目？',
            },
            
        }
    )
    },
    {
        span: 4,
        text: "刷新",
        icon: 'Refresh',
        type: 'primary',
        method: () => fetchData()
    },
    {
        span: 4,
        text: "导出全部",
        icon: 'Upload',
        type: 'success',
        method: () => {}
    },
    {
        span: 4,
        text: "导出当前视图",
        icon: 'Upload',
        type: 'success',
        method: () => {}
    },
    {
        span: 4,
        text: "导入Excel",
        icon: 'Download',
        type: 'success',
        method: () => {}
    },
    {
        span: 4,
        text: "下载导入模板",
        icon: 'Download',
        type: 'success',
        method: () => {}
    },
]

const tableData: ProjectTableData[] = reactive<ProjectTableData[]>([])

const tableColumnProps: TableColumnProps[] = [
    {
        label: '项目名称',
        prop: 'name',
        minWidth: '12.5%',
        align: 'center',
    },
    {
        label: '客户名称',
        prop: 'client',
        minWidth: '12.5%',
        align: 'center',
    },
    {
        label: '合同额(元)',
        prop: 'amount',
        minWidth: '10%',
        sortable: 'custom',
        align: 'center',
    },
    {
        label: '开始日期',
        prop: 'startDate',
        minWidth: '15%',
        sortable: 'custom',
        align: 'center',
    },
    {
        label: '状态',
        prop: 'status',
        minWidth: '10%',
        align: 'center',
    },
    {
        label: '操作',
        prop: 'operation',
        minWidth: '25%',
        align: 'center',
    },
]

const projectAddFormModelGenerator: () => ProjectAddFormModel = () => ({
    name: '',
    client: '',
    amount: 0,
    startDate: Date.now(),
    status: null,
    description: '',
})

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
        <filter-area 
            :generator="projectFiltergGenerator" 
            :upper-input="upperFilterItems" 
            :lower-input="lowerFilterItems" 
            @update-filter="updateFilterParams" 
        />
        <button-area :gutter="24" :buttons="buttonRecords" />
        <custom-table 
            ref="customTableRef"
            :table-data="tableData" 
            :table-column-props="tableColumnProps" 
            :index-width="'5%'"
            @sort-change="handleSortChange"
            class="custom-table"
            :height="425"
            :loading="tableLoading"
            :item-total="itemTotal"
            @page-change="handlePageChange"
            :pagination-props="paginationProps"
        >
            <template #amount="{ row } : { row: ProjectTableData }">
                {{ row.amount }}
            </template>
            <template #status="{ row } : { row: ProjectTableData }">
                <div class="status-cell">
                    <span class="dot" :style="{backgroundColor: ProjectStatusColor[row.status]}"></span>
                    {{ ProjectStatusValue[row.status] }}
                </div>
            </template>
            <template #operation="{ row } : { row: ProjectTableData }">
                <el-button type="primary" text>
                    <el-icon>
                        <View />
                    </el-icon>
                    详情
                </el-button>
                <el-button type="primary" text>
                    <el-icon>
                        <EditPen />
                    </el-icon>
                    编辑
                </el-button>
                <el-popconfirm title="确定删除？">
                    <template #reference>
                        <el-button type="danger" text>
                            <el-icon>
                                <Delete />
                            </el-icon>
                            删除
                        </el-button>
                    </template>
                </el-popconfirm>
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