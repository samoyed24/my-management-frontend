<script setup lang="ts">

export interface TableProp {
    label?: string
    prop: string
    width?: number | string
    sortable?: boolean | string
    minWidth?: string
}
export interface TableData {}
export interface CustomTableProps {
    tableProps: TableProp[]
    tableData: TableData[]
    showIndex: boolean
    height?: number
    loading: boolean
    paginationProps: PaginationProps
}
export type OrderType = 'descending' | 'ascending'
export interface SortChangeProps { prop: string, order: OrderType }
export interface PaginationProps { pageSize: number, itemCount: number, currentPage: number } 


const props = defineProps<CustomTableProps>()

const emit = defineEmits(['sort-change', 'page-change'])
const handleSortChange = (e: SortChangeProps) => emit('sort-change', e)
const handlePageChange = (e: number) => emit('page-change', e)

const tableRef = ref();

const scrollToTop = () => {
    tableRef.value?.setScrollTop(0)
}
defineExpose({ scrollToTop })
</script>

<template>
    <div class="table-wrapper">
        <el-table 
            ref="tableRef"
            :data="tableData" 
            @sort-change="handleSortChange"
            :header-cell-style="{color: '#333333', textAlign: 'center'}"
            :cell-style="{color: '#333333', textAlign: 'center'}"
            :height="height"
            :show-overflow-tooltip="true"
            v-loading="loading"
            stripe
        >
            <el-table-column 
                label="#" 
                prop="index" 
                v-if="props.showIndex"
                minWidth="5%"
            >
                <template #default="scope">
                    {{ (paginationProps.currentPage - 1) * paginationProps.pageSize + scope.$index + 1  }}
                </template>
            </el-table-column>
            <el-table-column
                v-for="(item, index) in tableProps"
                :key="index"
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
                :min-width="item.minWidth"
                :sortable="item.sortable"
            >
                <template #default="scope">
                <component
                    :is="$slots[item.prop] ? { render: () => $slots[item.prop]?.(scope) } : 'span'"
                >
                    <template v-if="!$slots[item.prop]">
                    {{ scope.row[item.prop] }}
                    </template>
                </component>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="paginationProps.pageSize" :total="paginationProps.itemCount" @current-change="handlePageChange">

        </el-pagination>
    </div>
</template>

<style scoped>
.table-wrapper {
    display: flex;
    flex-direction: column;
    /* background-color: rgba(90, 90, 90, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); */
    background-color: white;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    align-items: center;
    overflow-x: hidden;
}
/* .el-table {
    --el-table-border-color: transparent;
    --el-table-border: none;
    --el-table-text-color: #bdbdbe;
    --el-table-header-text-color: #bdbdbe;
    --el-table-row-hover-bg-color: transparent;
    --el-table-current-row-bg-color: transparent;
    --el-table-header-bg-color: transparent;
    --el-table-bg-color: transparent;
    --el-table-tr-bg-color: transparent;
    --el-table-expanded-cell-bg-color: transparent;
} */
.el-table tr {
    background-color: red !important;
}
.el-table {
  transform: translate(0);
}
</style>