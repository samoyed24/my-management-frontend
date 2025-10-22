<script setup lang="ts">
export interface CustomCardProps {
    header?: {
        icon?: string
        text?: string
    }
}

const props = defineProps<CustomCardProps>() 
const slots = useSlots()
</script>

<template>
<el-card>
    <template #header v-if="slots.header || header">
        <slot name="header">
            <el-icon :size="14" :style="{ paddingRight: '4px' }" v-if="header?.icon">
                <component :is="header?.icon" />
            </el-icon>
            <span>
                {{ header?.text }}
            </span>
        </slot>
    </template>
    <template #default v-if="slots.default">
        <slot name="default">

        </slot>
    </template>
    <template #footer v-if="slots.footer">
        <slot name="footer">

        </slot>
    </template>
</el-card>
</template>

<style scoped>
</style>