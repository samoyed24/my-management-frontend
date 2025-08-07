<script setup lang="ts">
import { postLogin } from '@/api/auth'
import logo from '@/assets/logo.png'
import { useUserAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const loginData = reactive<LoginData>({
    username: '',
    password: '',
})

const userAuth = useUserAuthStore()
const router = useRouter()
const loginRedirectTo = '/panel'

const handleLogin = async () => {
    try {
        const resp = await postLogin(loginData)
        ElMessage.success(resp.message)
        if (resp.data) {
            userAuth.setUser(resp.data)
        }
        router.push(loginRedirectTo)
    } catch (err) {
        ElMessage.error(String(err))
    } finally {
        //
    }
}
</script>
<template>
    <el-tab-pane label="登录" name="login" class="full login-pane">
        <div class="full center login-container">
            <div class="full separate-container center">
                <el-image style="width: 160px;" :src="logo" fit="scale-down" />
            </div>
            <div class="full separate-container">
                <el-form ref="form" :model="loginData" class="login-form">
                    <!-- <el-divider /> -->
                    <el-form-item label="用户名" label-position="top">
                        <el-input v-model="loginData.username" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="密码" label-position="top">
                        <el-input v-model="loginData.password" type="password" placeholder="请输入密码" show-password />
                    </el-form-item>
                    <!-- <el-divider /> -->
                </el-form>
            </div>
            <div class="full separate-container center">
                <el-button type="primary" @click="handleLogin" style="width: 100%;">登录</el-button>
            </div>
        </div>
    </el-tab-pane>
</template>

<style scoped>
.login-form {
    width: 100%;   
}
.login-container {
    display: flex;
    flex-direction: column;
}
.separate-container {
    flex: 1
}
</style>