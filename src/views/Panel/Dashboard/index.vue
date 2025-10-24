<script setup lang="ts">
import StatisticBoard from './components/StatisticBoard.vue';
import StatisticChart from './components/StatisticChart/index.vue'
import UserInfoBoard from './components/UserInfoBoard.vue';
import SideCarousel from './components/SideCarousel.vue';
import AnnouncementBoard from './components/AnnouncementBoard.vue';
import QuickEntry from './components/QuickEntry/index.vue';
import ToDoList from './components/ToDoList/index.vue'
</script>

<template>
    <el-container>
        <el-main>
            <el-space direction="vertical" :fill="true" size="large">
                <statistic-board />
                <statistic-chart />
                <announcement-board />
            </el-space>
        </el-main>
        <el-aside>
            <el-space direction="vertical" :fill="true" size="large">
                <user-info-board />
                <side-carousel />
                <quick-entry />
                <to-do-list />
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