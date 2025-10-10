import { FilterParams } from "types/props/components";
import { ProjectStatusKey } from "@/constants/mapping/project";

export interface ProjectFilterParams extends FilterParams {
    name: string
    client: string
    startDate: Date[] | null[]
    status: ProjectStatusKey | null
}

export interface ProjectTableData {
    name: string
    client: string
    amount: number
    startDate: Date | null
    status: ProjectStatusKey
    description: string
}

export interface ProjectRequestParams {
    name: string | null
    client: string | null
    startDateFrom: string | null
    startDateTo: string | null
    status: ProjectStatusKey | null
    pageSize: number
    currentPage: number
}

export interface ProjectResponse {
    list: ProjectTableData[]
    total: number
}