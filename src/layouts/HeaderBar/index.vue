<script setup lang="ts">
import logo from '@/assets/logo.png'
import avatar from '@/assets/avatar.png'
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
                        <el-dropdown-item class="profile-settings">
                            个人设置
                        </el-dropdown-item>
                        <el-dropdown-item class="logout-settings">
                            退出登录
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
:deep(.profile-settings) {
  color: var(--el-color-primary);
}
:deep(.logout-settings) {
    color: var(--el-color-danger);
}
</style>