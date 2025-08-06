<script setup lang="ts">
import { computed, ref } from 'vue'
import SideBar from '@/layouts/SideBar/index.vue'
import RouterViewContainer from '@/layouts/RouteViewContainer/index.vue'
import HeaderBar from '@/layouts/HeaderBar/index.vue'
import router from '@/router'

const sideBarRoutes = router.options.routes.filter(route => route.path === '/panel')[0]
</script>

<template>
  <el-container style="height: 100%" class="panel-layout">
    <el-header>
      <header-bar />
    </el-header>
    <el-container>
      <el-aside>
        <side-bar :routes="sideBarRoutes" />
      </el-aside>
      <el-main>
        <router-view-container />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.header {
  margin: 10px;
}

.el-menu--horizontal  {
  /* margin: 6px 0; */
  padding: 5px 10px;
}
.el-main, .el-aside {
  padding: 40px 20px;
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
