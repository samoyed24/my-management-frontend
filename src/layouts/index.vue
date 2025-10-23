<script setup lang="ts">
import { computed, ref } from 'vue'
import SideBar from '@/layouts/SideBar/index.vue'
import MainContainer from '@/layouts/MainContainer.vue'
import HeaderBar from '@/layouts/HeaderBar.vue'
import router from '@/router'

const sideBarRoutes = router.options.routes.filter(route => route.path === '/panel')[0]
</script>

<template>
  <el-container class="panel-layout full">
    <el-header>
      <header-bar />
    </el-header>
    <el-container class="full" style="min-height: 0;">
      <el-aside class="full">
          <side-bar :routes="sideBarRoutes" />
      </el-aside>
      <el-main>
        <main-container />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.header {
  margin: 10px 0;
}

.el-menu--horizontal  {
  /* margin: 6px 0; */
  padding: 5px 10px;
}
/* .el-main, .el-aside {
  padding: 30px 20px;
} */
.el-main {
  padding-right: 20px;
  padding-top: 25px;
}

.el-aside {
  padding-left: 20px;
  padding-top: 25px;
  padding-bottom: 20px;
}

.panel-layout {
  background-image: url('@/assets/bg/panel-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100%;
}
.footer {
  margin: 0px !important;
}
</style>
