<script setup lang="ts">
import { ElMessage, ElMessageBox, FormInstance, FormItemRule, FormRules, PopperTrigger } from 'element-plus';
import { GeneralInputProps } from '@/components/Base/CustomInput.vue';

export interface FormModel {}
export interface FormItem {
    prop: string
    label?: string
    rules?: FormItemRule[]
    disabled?: boolean
    input: GeneralInputProps
}
export interface CustomFormProps<T extends FormModel> {
    formItems: FormItem[]
    defaultGetter: () => T // 传入一个用于生成表单默认值的函数，如默认值结构生成器，fetch得到的Record格式数据
    submit?: {
        method: (model: T) => void
        useConfirm?: boolean
        confirmText?: string
        validationRules?: FormRules<T>
    }
}
const props = defineProps<CustomFormProps<any>>()
const model = ref()

const formLoading = ref(false)
const setLoading = (state: boolean) => {
    formLoading.value = state
}

const formRef = ref<FormInstance>()

const handleSubmit = async () => {
    if (!props.submit) return
    if (props.submit.validationRules && formRef.value) {
        await formRef.value.validate((valid, fields) => {
            if (!valid) {
                return
            } else {
                if (props.submit?.useConfirm) {
                    ElMessageBox.confirm(props.submit.confirmText || '是否确认提交表单？', '请注意')
                    .then(() => {
                        props.submit?.method(model)
                    })
                    .catch()
                }
            }
        })
    }
}

const getFormDefault = () => {
    setLoading(true)
    try {
        model.value = props.defaultGetter()
    } catch(e) {
        ElMessage.error('表单数据获取失败: ' + e)
    } finally {
        setLoading(false)
    }
}

getFormDefault()

console.log(props)
</script>

<template>
    <el-form ref="formRef" :model="model" v-loading="formLoading" label-width="auto" :rules="props.submit?.validationRules">
        <el-form-item v-for="(item, idx) in props.formItems" :key="idx" :label="item?.label" :prop="item.prop">
            <custom-input v-model="model[item.prop]" :input-props="item.input" />
        </el-form-item>
        <el-button v-if="props.submit" type="primary" style="width: 100%;" @click="handleSubmit">提交</el-button>
    </el-form>
</template>