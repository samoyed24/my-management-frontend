<script setup lang="ts">
import LineBarChart from './components/LineBarChart.vue';
</script>

<template>
    <custom-card :header="{ icon: 'Histogram', text: '财务收支情况' }" :no-padding="true">
        <line-bar-chart />
    </custom-card>
</template>