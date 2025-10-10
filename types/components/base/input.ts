export type InputType = "normal" | "select" | "number" | "date" | "datetime"

export interface BaseInputProps {
    span: number
    type: InputType
    prop: string
    label?: string
    placeholder?: string
}

export interface InputProps extends BaseInputProps {
    type: 'normal'
}

export interface SelectProps<T extends string = string> extends BaseInputProps {
    type: 'select'
    options: Option<T>[]
}

export type DatePickerSubType =
  | 'date'
  | 'year'
  | 'years'
  | 'month'
  | 'months'
  | 'dates'
  | 'week'
  | 'datetime'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'
  | 'yearrange';


export interface DateProps extends BaseInputProps {
    type: 'date'
    subType: DatePickerSubType
    startPlaceholder?: string
    endPlaceholder?: string
}

export type GeneralInputProps<T extends string = string> = InputProps
    | SelectProps<T>
    | DateProps

export interface Option<V extends string> { value: V, label: string, disabled?: boolean }
