<script setup lang="ts">

</script>

<template>
    <el-container>
        <el-main>
            <el-space direction="vertical" :fill="true" size="large">
                <statistic-board />  
            </el-space>
        </el-main>
        <el-aside>
            <el-space direction="vertical" :fill="true" size="large">
                <user-info-board />
                <side-carousel />
            </el-space>
        </el-aside>
    </el-container>
</template>

<style scoped>
.el-main {
    padding: 0;
    padding-right: 10px;
}
.el-aside {
    padding-left: 10px;
}
.el-space {
    width: 100%;
}
</style>