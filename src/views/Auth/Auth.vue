<script setup lang="ts">
import Carousel1 from '@/assets/auth/carousel-1.jpg'
import Carousel2 from '@/assets/auth/carousel-2.jpg'
import Carousel3 from '@/assets/auth/carousel-3.jpg'

const carouselImageList = [
    Carousel1,
    Carousel2,
    Carousel3
]
const activeName = ref('login')
const formRef = ref(null)
</script>

<template>
    <el-container class="center auth-layout">
        <div class="auth-container glass-menu">
            <el-row class="full">
                <el-col :span="12">
                    <custom-carousel :image-list="carouselImageList" :height="'100%'"></custom-carousel>
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