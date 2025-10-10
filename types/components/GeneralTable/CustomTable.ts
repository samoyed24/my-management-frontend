export interface TableProp {
    label: string
    prop: string
    width?: number
    sortable?: boolean | string
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