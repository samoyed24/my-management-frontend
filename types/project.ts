import { FormModel } from "@/components/GeneralForm/CustomForm.vue"
import { FilterParams } from "@/components/GeneralTable/FilterArea.vue"

export interface ProjectFilterParams extends FilterParams {
    name: string
    client: string
    startDate: Date[] | null[]
    status: keyof ProjectStatus | null
}
export interface ProjectTableData {
    name: string
    client: string
    amount: number
    startDate: Date | null
    status: keyof ProjectStatus
    description: string
}
export interface ProjectRequestParams {
    name: string | null
    client: string | null
    startDateFrom: string | null
    startDateTo: string | null
    status: keyof ProjectStatus | null
    pageSize: number
    currentPage: number
}
export interface ProjectResponse {
    list: ProjectTableData[]
    total: number
}
export interface ProjectAddFormModel extends FormModel {
    name: string
    client: string
    amount: number
    startDate: Date | number | null,
    status: keyof ProjectStatus | null
    description: string
}
export type ProjectStatus = {
  End: string,
  Process: string,
  Quality: string
}