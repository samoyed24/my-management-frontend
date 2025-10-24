<script setup lang="ts">
export interface CustomCardProps {
    header?: {
        icon?: string
        text?: string
    }
    noPadding?: boolean
}

const props = defineProps<CustomCardProps>() 
const slots = useSlots()
</script>

<template>
<el-card :body-style="{ padding: noPadding ? 0 : undefined }" header-class="custom-header">
    <template #header v-if="slots.header || header">
        <slot name="header">
            <el-icon :size="18" :style="{ paddingRight: '8px' }" v-if="header?.icon">
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

<style lang="css">
.custom-header {
    display: flex;
    align-items: center;
    justify-items: center;
}
</style>