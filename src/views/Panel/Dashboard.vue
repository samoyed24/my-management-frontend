<script setup lang="ts">
import { DataLine, EditPen } from '@element-plus/icons-vue';

</script>

<template>
    <el-container>
        <el-main>
            <el-card>
                <template #header>
                    <el-icon :size="14" :style="{ paddingRight: '4px' }">
                        <DataLine />
                    </el-icon>
                    统计数据
                </template>
                <template #default>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <custom-statistic-card 
                                :transition="{ duration: 1000, fromValue: 0 }"
                                :value="172000"
                                title="项目总数"
                                :precision="0"
                                :icon="{
                                    fromElIcon: 'Promotion'
                                }"
                                suffix="项"
                                :footer="{
                                    description: '较昨日变化了',
                                    delta: {
                                        value: '22项',
                                        arrow: 'Up',
                                    }
                                }"
                            />
                        </el-col>
                        <el-col :span="8">
                            <custom-statistic-card 
                                :transition="{ duration: 1000, fromValue: 0 }"
                                :value="2521567.86"
                                title="合同总金额"
                                :precision="2"
                                :icon="{
                                    fromElIcon: 'Money'
                                }"
                                suffix="元"
                                :footer="{
                                    description: '较昨日变化了',
                                    delta: {
                                        value: '1.3%',
                                        arrow: 'Up',
                                    }
                                }"
                            />
                        </el-col>                        
                        <el-col :span="8">
                            <custom-statistic-card 
                                :transition="{duration: 1000, fromValue: 0}"
                                :value="113"
                                title="在岗员工人数"
                                :precision="0"
                                :icon="{
                                    fromElIcon: 'Avatar'
                                }"
                                suffix="人"
                                :footer="{
                                    description: '较昨日变化了',
                                    delta: {
                                        value: '0人',
                                        arrow: 'None',
                                    }
                                }"
                            />
                        </el-col>
                    </el-row>  
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <custom-statistic-card 
                                :transition="{duration: 1000, fromValue: 0}"
                                :value="0"
                                title="异常合同数目"
                                :precision="0"
                                :icon="{
                                    fromElIcon: 'WarnTriangleFilled'
                                }"
                                suffix="项"
                                :footer="{
                                    description: '较昨日变化了',
                                    delta: {
                                        value: '1项',
                                        arrow: 'Down',
                                    }
                                }"
                            />
                        </el-col>                        
                        <el-col :span="8">
                            <custom-statistic-card 
                                :transition="{duration: 1000, fromValue: 0}"
                                :value="2"
                                title="待处理事项数"
                                :precision="0"
                                :icon="{
                                    fromElIcon: 'QuestionFilled'
                                }"
                                suffix="项"
                            />
                        </el-col>                        
                        <el-col :span="8">
                            <custom-statistic-card 
                                :transition="{duration: 1000, fromValue: 0}"
                                :value="4"
                                title="待开发票数目"
                                :precision="0"
                                :icon="{
                                    fromElIcon: 'Ticket'
                                }"
                                suffix="张"
                            />
                        </el-col>
                    </el-row>
                </template>
            </el-card>
        </el-main>
        <el-aside>
            <el-card>
                <template #header>123</template>
            </el-card>
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
.el-row {
  margin-bottom: 10px;
}

</style>