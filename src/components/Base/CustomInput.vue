<script setup lang="ts">

export interface CustomInputProps {
    inputProps: GeneralInputProps
}
export type InputType = "input" | "select" | "number" | "date" | "datetime" | "number" | "textarea"
export interface BaseInputProps {
    type: InputType
    placeholder?: string
    width?: string
}
export interface InputProps extends BaseInputProps {
    type: 'input'
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
export interface NumberProps extends BaseInputProps {
    type: 'number'
    max?: number
    min?: number
    step?: number
    suffix?: string
    precision?: number
}
export interface DateProps extends BaseInputProps {
    type: 'date'
    subType: DatePickerSubType
    startPlaceholder?: string
    endPlaceholder?: string
}
export interface TextareaProps extends BaseInputProps {
    type: 'textarea'
    rows?: number
}
export type GeneralInputProps<T extends string = string> = InputProps
    | SelectProps<T>
    | DateProps
    | NumberProps
    | TextareaProps
export interface Option<V extends string> { value: V, label: string, disabled?: boolean }

const props = defineProps<CustomInputProps>()
const item = props.inputProps
const data = defineModel<any>()

</script>

<template>
    <el-input 
        v-if="item.type === 'input'" 
        v-model="data" 
        :placeholder="item.placeholder"
        :style="{width: item.width}"
    />
    <el-date-picker 
        v-else-if="item.type === 'date'" 
        v-model="data" 
        :type="item.subType"
        :start-placeholder="item.startPlaceholder" 
        :end-placeholder="item.endPlaceholder"
        :style="{width: item.width}"
    />
    <el-select
        v-else-if="item.type === 'select'"
        :placeholder="item.placeholder"
        v-model="data"
        :options="item.options"
        :style="{width: item.width}"
    />
    <el-input
        type="textarea"
        v-else-if="item.type === 'textarea'"
        :placeholder="item.placeholder"
        v-model="data"
        :rows="item.rows"
        :style="{width: item.width}"
    />
    <el-input-number
        v-else-if="item.type === 'number'"
        :placeholder="item.placeholder"
        v-model="data"
        :max="item.max"
        :min="item.min"
        :step="item.step"
        :precision="item.precision"
        :style="{width: item.width}"
    >
        <template #suffix>
            {{ item.suffix }}
        </template>
    </el-input-number>
</template>