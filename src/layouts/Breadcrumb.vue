<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
    <el-text size="large" tag="b">
        {{ route.meta?.title }}
    </el-text>
    <el-breadcrumb separator="/" class="custom-breadcrumb">
        <el-breadcrumb-item v-for="{ path, meta } in route.matched" :key="path">{{ meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style scoped>
.custom-breadcrumb {
    margin-left: auto;
}
</style>