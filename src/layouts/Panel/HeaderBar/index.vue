<script setup lang="ts">
import logo from '@/assets/logo.png'
import avatar from '@/assets/avatar.png'
import { postLogout } from '@/api/auth'
import { ElMessage } from 'element-plus'
import { useUserAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const logoutRedirectTo = '/auth'
const user = useUserAuthStore()
const router = useRouter()

const handleLogout = async () => {
    try {
        const resp = await postLogout()
        ElMessage.success(resp.message)
        user.clearUser()
        router.push(logoutRedirectTo)
    } catch (err) {
        ElMessage.error(String(err))
    } finally {
        //
    }
}
</script>

<template>
    <el-menu mode="horizontal" :ellipsis="false" class="glass-menu header">
        <el-image style="width: 160px;" :src="logo" fit="scale-down" class="header-image" />
        <div class="center">
            <el-icon :size="20" color="#2E2E2E">
                <Bell />
            </el-icon>
        </div>
        <div class="center">
            <el-icon :size="20" color="#2E2E2E">
                <Setting />
            </el-icon>
        </div>
        <div class="center">
            <el-dropdown placement="top-start">
                <el-avatar shape="square" :src="avatar" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <el-text type="primary">
                                个人设置
                            </el-text>
                        </el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">
                            <el-text type="danger">
                                退出登录
                            </el-text>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-menu>
</template>

<style scoped>
.header > * {
    margin: 0 10px;
}
.header-image {
  margin-right: auto;
}
</style>