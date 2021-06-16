<template>
  <layout>
    <tabs :value.sync="recordType" :data-source="moneyTypeTabs"/>
    <div ref="chart" :style="styleList" class="chart-wrapper"></div>
    {{ result }}
  </layout>
</template>
<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator';
  import { dataClone, formatTime } from '@/libs/util'
  import Tabs from '@/components/Tabs.vue';
  import { moneyTypeTabs } from '@/const'

  let { echarts, dayjs } = window;

  type resultItem = {
    title: string,
    total: number,
    list: RecordItem[]
  } 
   
  @Component({
    components: {
      Tabs
    }
  })
  export default class Chart extends Vue{
    styleList = {width: '', height: ''};
    chart = {};
    recordList: RecordItem[] = [];

    moneyTypeTabs = moneyTypeTabs

    recordType = '-';

    get result(): resultItem[] {
      if (this.recordList.length === 0) return [];
      let list = dataClone(this.recordList.filter((item) => item.type === this.recordType));
      let data: resultItem[] = [];
      // 先排序 后归类
      list.sort((a, b) => dayjs(a.createTime).valueOf() - dayjs(b.createTime).valueOf())

      data[0] = { title: formatTime(list[0].createTime), total: list[0].amount, list: [list[0]] }

      for(let i = 1; i < list.length; i++) {
        if (formatTime(list[i].createTime) === data[i - 1].title) {
          data[i - 1].total += list[i].amount;
          data[i - 1].list.push(list[i])
        }else {
          data.push({
            title: formatTime(list[i].createTime),
            total: list[i].amount,
            list: [list[i]]
          })
        }
      }
      return data;
    }

    @Watch('result')
    getAxisList(newVlaue) {
      const data: { x: string[], y: number[] } = { x: [], y: [] }
      if(this.result.length === 0) return null;
      this.result.forEach((item: resultItem) => {
        data.x.push(item.title);
        data.y.push(item.total);
      });
      this.$nextTick(() => {
        this.chart.setOption({
          xAxis: {
            data: data.x
          },
          series: [{
            data: data.y,
          }]
        })
      })
    }

    mounted() {
      let { chart } = this.$refs;
      let docWidth = document.documentElement.clientWidth || 600;

      this.styleList.width = `${docWidth - 20}px`
      this.styleList.height = `${(docWidth - 20) * 0.8}px`

      this.$nextTick(() => {
        this.chart = echarts.init(chart);
        this.chart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {
              show: true,
            },
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }]
        });
      })
    }
    created() {
      this.$store.commit('fetchRecord')
      this.recordList = this.$store.state.recordList;

    }
  }
</script>
<style lang="scss" scoped>
  .chart-wrapper{
    margin: 0 auto;
  }
</style>