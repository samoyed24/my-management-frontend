<script setup lang="ts">
import EntryItem from './components/EntryItem.vue';

</script>

<template>
    <custom-card :header="{ icon: 'Compass', text: '快捷入口' }">
        <el-space direction="vertical" :fill="true" size="default">
            <el-row :gutter="10">
                <el-col :span="8">
                    <entry-item route-name="project" />
                </el-col>
                <el-col :span="8">
                    <entry-item route-name="annual" />
                </el-col>
                <el-col :span="8">
                    <entry-item route-name="visible" />
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <entry-item route-name="humanpower" />
                </el-col>
                <el-col :span="8">
                    <entry-item route-name="financial" />
                </el-col>
                <el-col :span="8">
                    <entry-item route-name="ticket" />
                </el-col>
            </el-row>    
        </el-space>

    </custom-card>
</template>
