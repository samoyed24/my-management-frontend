<script setup lang="ts">
import LoginPane from './components/LoginPane.vue'
import RegisterPane from './components/RegisterPane.vue'
import AuthCarousel from './components/AuthCarousel.vue'

const activeName = ref('login')
const formRef = ref(null)
</script>

<template>
    <el-container class="center auth-layout">
        <div class="auth-container glass-menu">
            <el-row class="full">
                <el-col :span="12">
                    <auth-carousel />
                </el-col>
                <el-col :span="12">
                    <el-tabs v-model="activeName" type="border-card" class="full">
                        <login-pane />
                        <register-pane />
                    </el-tabs>
                </el-col>
            </el-row>
        </div>
    </el-container>
</template>

<style scoped>
.auth-layout {
  height: 100vh; /* 或者 height: 100%（前提是html、body、#app也100%） */
  width: 100%;
  background-image: url('@/assets/bg/auth-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.auth-container {
    width: 65%;
    height: 70%;
}
</style>