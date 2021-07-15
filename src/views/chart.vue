<template>
  <layout classPrefix="chart">
    <tabs :value.sync="recordType" :data-source="moneyTypeTabs"/>
    <div ref="chart" :style="styleList" class="chart-wrapper"></div>
    <div class="list">
      <record-list :info="result"/>
    </div>
  </layout>
</template>
<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator';
  import { dataClone, formatTime } from '@/libs/util'
  import Tabs from '@/components/Tabs.vue';
  import { moneyTypeTabs } from '@/const'
  import dayjs from 'dayjs'
  import * as echarts from 'echarts';
  import RecordList from '@/components/RecordList.vue'
   
  type ResultItem = {
    title: string,
    list: RecordItem[],
    total: number
  }

  @Component({
    components: {
      Tabs,
      RecordList
    }
  })
  export default class Chart extends Vue{
    styleList = {width: '', height: ''};
    chart:any = null;
    recordList: RecordItem[] = [];

    moneyTypeTabs = moneyTypeTabs

    recordType = 'out';

    get result(): ResultItem[] {
      if (this.recordList.length === 0) return [];
      let list = dataClone(this.recordList.filter((item) => item.type === this.recordType));
      let data: ResultItem[] = [];
      // 先排序 后归类
      list.sort((a, b) => dayjs(a.createTime).valueOf() - dayjs(b.createTime).valueOf())

      data[0] = { title: formatTime(list[0].createTime), total: list[0].amount, list: [list[0]] }

      // n data的索引值
      for(let i = 1; i < list.length; i++) {
        let n = data.length - 1;
        if (formatTime(list[i].createTime) === data[n].title && data[n] && data[n]) {
          data[n].total += list[i].amount;
          data[n].list.push(list[i])
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
    getAxisList(): void {
      const data: { x: string[], y: number[] } = { x: [], y: [] };
      
      if(this.result.length === 0) return;
      this.result.forEach((item: ResultItem) => {
        data.x.push(formatTime(item.title, 'MM-DD'));
        data.y.push(item.total || 0);
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

    initEcharts(chart: HTMLDivElement) {
      this.chart = echarts.init(chart);
      this.chart.setOption({
          tooltip: {
            trigger: 'axis',
              triggerOn: 'mousemove',
              alwaysShowContent: true,
            position: (point: any) => {
              return {left: point[0] , top: -10}
            }
          },
          xAxis: {
            type: 'category',
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            type: 'line'
          }]
      });
    }

    mounted() {
      let chart = this.$refs.chart as HTMLDivElement;
      let docWidth = document.documentElement.clientWidth || 600;

      this.styleList.width = `${docWidth - 20}px`
      this.styleList.height = `${(docWidth - 20) * 0.8}px`

      this.$nextTick(() => {
        this.initEcharts(chart)
      })
    }
    created() {
      this.$store.commit('fetchRecord')
      this.recordList = this.$store.state['record'].recordList;
    }
  }
</script>
<style lang="scss" scoped>
  .chart-wrapper{
    margin: 0 auto;
    background: #fff;
    margin-top: 20px;
  }
  ::v-deep .chart-content{
    background: #fff;
    display: flex;flex-direction: column;
    .list{
      overflow-y: auto;
    }
    > *:not(.list) {
      flex-shrink: 0;
    }
  }
</style>