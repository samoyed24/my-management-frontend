<script setup lang="ts">
import { ButtonAreaProps } from 'types/components/GeneralTable/ButtonArea';



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