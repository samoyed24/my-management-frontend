<script setup lang="ts">
import Breadcrumb from '@/layouts/Breadcrumb.vue';
</script>

<template>
    <div class="container glass-menu">
        <div class="title-container">
            <breadcrumb />
        </div>
        <div class="router-view-container">
            <el-scrollbar class="custom-scrollbar">
                <router-view />
            </el-scrollbar>
        </div>
    </div>
</template>

<style scoped>
.container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.title-container {
    padding: 1% 3%;
    display: flex;
    flex: 1;
    align-items: center;
}
.router-view-container {
    flex: 20;
    height: 100%;
    padding: 1%;
    min-height: 0;
}
.custom-scrollbar {
    padding: 0 1%;
}
</style>