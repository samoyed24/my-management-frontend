<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import merge from 'lodash.merge';

export interface DialogProps {
    title?: string
    fullscreen?: boolean
    showClose?: boolean
    destroyOnClose?: boolean
    confirmBeforeClose?: boolean
    footer?: {
        show?: boolean
        cancel?: {
            show?: boolean
            text?: string
            method?: (...args: any[]) => any
        }
        confirm?: {
            show?: boolean
            text?: string
            method?: (...args: any[]) => any
        }
    }
    width?: string
    draggable?: boolean
}

export interface DivProps {}

const props = defineProps<{
  onClose: () => void
}>()


const formVisible = ref(false)
const setVisible = (visible: boolean) => {
    formVisible.value = visible
}

const destroyAfterClosed = () => {
    props.onClose()
}

const divComponent = shallowRef()
const dialogProps = reactive<DialogProps>({
    title: '弹出窗口',
    fullscreen: false,
    showClose: true,
    destroyOnClose: true,
    confirmBeforeClose: true,
    footer: {
        show: true,
        cancel: {
            show: true,
            text: '取消',
            method: () => { setVisible(false) }
        },
        confirm: {
            show: true,
            text: '确认',
            method: () => { setVisible(false) }
        }
    },
    width: '60%',
    draggable: false,
})

const divProps = ref<DivProps>()

const openDialog = (component: Component, _dialogProps?: DialogProps, _divProps?: DivProps) => {
    divComponent.value = component
    if (_dialogProps) {
        merge(dialogProps, _dialogProps)
    }
    if (_divProps) {
        divProps.value = _divProps
    }
    setVisible(true)
}

const handleBeforeClose = (done: Function) => {
    if (dialogProps.confirmBeforeClose) {
        ElMessageBox.confirm('确认关闭窗口吗？您做出的更改可能不会保存！', '注意', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                done()
            })
    }
}

defineExpose({
    openDialog,
})
</script>

<template>
    <el-dialog 
        :title=dialogProps.title 
        :model-value="formVisible" 
        :fullscreen="dialogProps.fullscreen" 
        :width="dialogProps.width"
        :center="true"
        :show-close="dialogProps.showClose"
        :destroy-on-close="true"
        :draggable="dialogProps.draggable"
        @closed="destroyAfterClosed"
        :before-close="handleBeforeClose"
    >
        <div>
            <component :is="divComponent" v-bind="divProps" />
        </div>
        <div slot="footer" v-if="dialogProps.footer?.show">
            <el-button @click="dialogProps.footer.cancel?.method">{{ dialogProps.footer.cancel?.text }}</el-button>
            <el-button type="primary" @click="dialogProps.footer.confirm?.method">{{ dialogProps.footer.confirm?.text }}</el-button>
        </div>
    </el-dialog>
</template>