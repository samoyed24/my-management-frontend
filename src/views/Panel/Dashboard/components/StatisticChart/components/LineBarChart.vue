<script lang="ts" setup>
import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import {
  BarChart,
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

type EChartsOption = echarts.ComposeOption<
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | BarSeriesOption
  | LineSeriesOption
>

const option: EChartsOption = {
  grid: {
    show: true,
    left: '10%',
    right: '10%',
    top: '15%',
    bottom: '15%',
    borderColor: '#ccc',
    backgroundColor: '#FAFAFA'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  legend: {
    data: ['收入', '支出', '净利润', '利润率']
  },
  xAxis: [
    {
      type: 'time',
      name: '日期',
      axisLabel: {
        formatter: (value: number) => {
          const date = new Date(value)
          return `${date.getMonth() + 1}/${date.getDate()}` // 格式化显示
        }
      },
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '收入/支出',
      min: -50000,
      max: 50000,
      interval: 10000,
      axisLabel: {
        formatter: '{value} 元'
      }
    },
    {
      type: 'value',
      name: '利润率',
      min: -500.0,
      max: 500.0,
      interval: 100,
      axisLabel: {
        formatter: '{value} %'
      }
    }
  ],
  series: [
    {
      name: '收入',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return (value as number) + '元';
        }
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 1, 1,
          [
            { offset: 0, color: '#E7A334' },
            { offset: 0.5, color: '#EF7F18' },
            { offset: 1, color: '#FC3303' }
          ]
        )
      },
      data: [
        ['2025-10-17', 1562.37],
        ['2025-10-18', 6628.12],
        ['2025-10-19', 31262.21],
        ['2025-10-20', 26167.29],
        ['2025-10-21', 29412.38],
        ['2025-10-22', 6234.67],
        ['2025-10-23', 12781.23]
      ]
    },
    {
      name: '支出',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return (value as number) + ' 元';
        }
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 1, 1,
          [
            { offset: 0, color: '#18B6EF' },
            { offset: 0.5, color: '#1B9BEE' },
            { offset: 1, color: '#0375FB' }
          ]
        )
      },
      data: [
        ['2025-10-17', 7124.12],
        ['2025-10-18', 26312.53],
        ['2025-10-19', 1672.92],
        ['2025-10-20', 11384.24],
        ['2025-10-21', 6124.63],
        ['2025-10-22', 2561.60],
        ['2025-10-23', 26126.23]
      ]
    },
    {
      name: '净利润',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return (value as number) + ' 元';
        }
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 1, 1,
          [
            { offset: 0, color: '#D3F708' },
            { offset: 0.5, color: '#77F708' },
            { offset: 1, color: '#00EA33' }
          ]
        )
      },
      data: [
        ['2025-10-17', -5561.75],
        ['2025-10-18', -19684.41],
        ['2025-10-19', 29589.29],
        ['2025-10-20', 14783.05],
        ['2025-10-21', 23287.75],
        ['2025-10-22', 3673.07],
        ['2025-10-23', -13345.00]
      ]
    },
    {
      name: '利润率',
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return (value as number) + '%';
        }
      },
      lineStyle: {
        type: 'dashed',
        width: 3,
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            { offset: 0, color: '#F91167' },
            { offset: 1, color: '#8811F9' }
          ]
        )
      },
      data: [   
        ['2025-10-17', -355.98],
        ['2025-10-18', -296.98],
        ['2025-10-19', 94.649],     
        ['2025-10-20', 56.494],
        ['2025-10-21', 79.177],
        ['2025-10-22', 58.914],
        ['2025-10-23', -104.411]
      ]
    }
  ]
};
</script>

<template>
    <base-chart :option="option" />
</template>