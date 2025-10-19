<script setup lang="ts">
import { ButtonType } from 'types/base/button'

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

const props = defineProps<ButtonAreaProps>()
</script>

<template>
    <el-row :gutter="props.gutter">
        <el-col v-for="(button, index) in props.buttons" :key="index" :span="button.span">
            <el-button :type="button.type" class="full" @click="button.method">
                <template #icon v-if="button.icon">
                    <el-icon>
                        <component :is="button.icon" />
                    </el-icon>
                </template>
                {{ button.text }}
            </el-button>
        </el-col>
    </el-row>
</template>