<script setup lang="ts">
import { DeleteFilled, Search } from '@element-plus/icons-vue';
import { InputAreaProps, FilterParams } from 'types/components/GeneralTable/FilterArea';

const props = defineProps<InputAreaProps<FilterParams>>()

const emit = defineEmits(['update-filter'])

const handleUpdateFilter = () => emit('update-filter', form)

const form = reactive(props.generator())

const reset = () => {
  Object.assign(form, props.generator())
  handleUpdateFilter()
}

</script>

<template>
  <el-form ref="formRef" :model="form">
    <el-space direction="vertical" class="filter-area-space">
      <el-row :gutter="10">
        <el-col :span="21">
          <el-row :gutter="10">
            <el-col v-for="(item, index) in props.upperInput" :key="index" :span="item.span">
              <el-form-item :label="item.label">
                <el-input v-if="item.type === 'normal'" v-model="form[item.prop]" :placeholder="item.placeholder"></el-input>
                <el-date-picker v-else-if="item.type === 'date'" v-model="form[item.prop]" :type="item.subType" placeholder="date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" style="width: 100%" @click="handleUpdateFilter">
            <template #icon>
                <Search />
            </template>
            搜索
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="21">
          <el-row :gutter="10">
            <el-col v-for="(item, index) in props.lowerInput" :key="index" :span="item.span">
              <el-form-item :label="item.label">
                <el-input 
                  v-if="item.type === 'normal'" 
                  v-model="form[item.prop]" 
                  :placeholder="item.placeholder"
                ></el-input>
                <el-date-picker 
                  v-else-if="item.type === 'date'" 
                  v-model="form[item.prop]" 
                  :type="item.subType"
                  :start-placeholder="item.startPlaceholder" 
                  :end-placeholder="item.endPlaceholder"
                ></el-date-picker>
                <el-select
                  v-else-if="item.type === 'select'"
                  :placeholder="item.placeholder"
                  v-model="form[item.prop]"
                  :options="item.options"
                ></el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <el-button @click="reset" type="warning" style="width: 100%">
            <template #icon>
                <DeleteFilled />
            </template>
            重置
          </el-button>
        </el-col>
      </el-row>
    </el-space>
  </el-form>
</template>

<style scoped>
.filter-area-space {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.filter-area-space > * {
  width: 100%;
}
.el-form-item {
  margin-bottom: 0;
}
</style>