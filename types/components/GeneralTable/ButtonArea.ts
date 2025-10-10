import { ButtonType } from 'types/components/base/button'

export interface ButtonAreaRecord {
    text: string
    span: number
    icon?: string
    type: ButtonType
    method: (...args: any[]) => any;
}

export interface ButtonAreaProps {
    gutter: number
    buttons: ButtonAreaRecord[]
}