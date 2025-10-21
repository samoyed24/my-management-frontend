<script setup lang="ts">
import { GeneralDeltaColor } from '@/constants/general'
import { useTransition } from '@vueuse/core'

export interface CustomStatisticCardProps {
    title: string
    value: number
    precision?: number
    icon: {
        fromElIcon?: string // 使用ElementPlus原生图标，填入图标名称
        fromAsset?: string // 这个会覆盖上方的，需传import的图标图像路径
    }
    transition?: {
        fromValue: number
        duration: number
    }
    toolTipContent?: string
    suffix?: string  // 如果自己实现了，这里的值就会被忽略
    footer?: {
        // 如果自己实现了，以下都会被忽略
        description: string
        delta?: {
            value: string | number
            arrow?: 'Up' | 'Down' | 'None'
        }
    }
}

const props = defineProps<CustomStatisticCardProps>()
const source = ref(0)

const outputValue = ref()


const setValue = () => {
    if (!props.transition) {
        outputValue.value = props.value
    } else {
        source.value = props.transition.fromValue
        outputValue.value = useTransition(source, {
            duration: props.transition.duration,
        })
        source.value = props.value
    }
}

setValue()
</script>

<template>
    <div class="card-outer">
        <div class="statistic-icon">
            <slot name="icon">
                <div style="margin-right: 20px;">
                    <el-icon v-if="props.icon.fromElIcon" size="40">
                        <component :is="props.icon.fromElIcon" />
                    </el-icon>
                    <el-image v-else-if="props.icon.fromAsset" :src="props.icon.fromAsset" />
                </div>
            </slot>
        </div>
        <div class="statistic-main">
            <el-statistic
                :value="outputValue.value"
                :precision="props.precision"
            >
                <template #title>
                    {{ props.title }}
                </template>
                <template #suffix>
                    <slot name="suffix ">
                        {{ props.suffix }}
                        <el-tooltip v-if="props.toolTipContent" effect="dark" :content="props.toolTipContent" placement="top">
                            <el-icon size="14">
                                <Warning />
                            </el-icon>
                        </el-tooltip>
                    </slot>
                </template>
            </el-statistic>
            <div class="footer">
                {{ props.footer?.description || '\u00A0' }}
                <span v-if="props.footer?.delta?.arrow == 'Up'" :style="{color: GeneralDeltaColor.Up}">
                    {{ props.footer?.delta?.value }}
                    <el-icon size="8">
                        <ArrowUpBold />
                    </el-icon>
                </span>
                <span v-else-if="props.footer?.delta?.arrow == 'Down'" :style="{color: GeneralDeltaColor.Down}">
                    {{ props.footer?.delta?.value }}
                    <el-icon size="8">
                        <ArrowDownBold />
                    </el-icon>
                </span>
                <span v-else-if="props.footer?.delta?.arrow == 'None'" :style="{color: GeneralDeltaColor.None}">
                    {{ props.footer?.delta?.value }}
                    <el-icon size="8">
                        <Minus />
                    </el-icon>
                </span>
                <span v-else>
                    {{ props.footer?.delta?.value }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-outer {
    display: flex;
}
.statistic-icon {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.statistic-main {
    flex: 8;
}
.footer {
    font-size: small;
    color: gray;
    margin: 6px 0;
}
</style>