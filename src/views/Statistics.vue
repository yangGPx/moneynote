<template>
  <layout classPrefix="statistics">
    <ul class="total-wrapper">
      <li>总支出: {{outputTotal}}</li>
      <li>总收入: {{inputTotal}}</li>
    </ul>
    <ul class="record-list-wrapper" v-if="result.length > 0">
      <li v-for="(item, index) in result" :key="index">
        <div class="title"><span>{{ addWeekStr(item.title) }}</span> 
          <div><span class="outtotal-wrapper">支出: {{ item.outTotal }}</span>收入: {{item.inTotal}}</div>
        </div>
        <div v-for="record in item.items" :key="record.id" class="item">
          <div>
            <span>{{ record.tags[0] || '无' }}</span>
            <span class="notes">{{ record.notes }}</span>
          </div>
          <span> {{record.type === '-' ? record.type : '' }}{{record.amount}}</span>
        </div>
      </li>
    </ul>
    <div v-else class="no-data">
      暂无记录
    </div>
  </layout>
</template>

/**
  第二种处理方法：
  1. 先给数据进行排序，利用时间进行排序，处理时间用window.dayjs
  2. 对排序好的数据进行分类 分类的数据结构
    [
      {
        title: 'YYYY-MM-DD',
        total: '总价',
        items: [
          RecordItem
        ]
      }
    ]
  3. 排序： 循环到的当前项的时间和以及归类好的数组最后一项进行对比
        如果时间一样，则push到items内
        不一样，则创建新项
 */

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import Tabs from '@/components/Tabs.vue'
  import { moneyTypeTabs, weekCn } from '@/const'
  import { dataClone } from '@/libs/util'

  type ResultItem = {
    title: string,
    inTotal: number,
    outTotal: number,
    items: RecordItem[]
  }

  @Component({
    components: {
      Tabs
    }
  })
  export default class Statistics extends Vue{
    // moneyType = moneyTypeTabs[0].value
    // moneyTypeTabs = moneyTypeTabs
    outputTotal = 0
    inputTotal = 0
    created() {
      this.$store.commit('fetchRecord')
    }
// TODO
    // 分类是支出 还是 收入，以及排序  由于一开始moneyType的值为空，这样会导致一开始的筛选出来的数组 为空，导致后面报错，
    // 先一开始就给moneyType赋值
    // get singleTypeSortList() {
    //   if (this.recordList.length === 0) return [];
    //     console.log('111', this.moneyType);
    //   const data = dataClone(this.recordList).filter(item => {
    //     return item.type === this.moneyType
    //   });
    //   data.sort((a, b) => window.dayjs(a.createTime).valueOf() - window.dayjs(b.createTime).valueOf())

    //   return data;
    // }

    get result() {
      if (this.recordList.length === 0) return [];
      const { formatTime } = this;
      const data = dataClone(this.recordList);
      if(data.length === 0) return [];
      // 先排序 后 归类
      // 时间排序
      data.sort((a, b) => window.dayjs(a.createTime).valueOf() - window.dayjs(b.createTime).valueOf())

      const list:ResultItem[] = [{title: formatTime(data[0].createTime), inTotal: 0, outTotal: 0, items:[data[0]]}]
      this.computedTotal(list[0], data[0])
      // 按照天进行归类 ，桶排序 有则push 无则创建新的桶归类
      for(let i = 1; i < data.length; i++) {
        let currentItemTime = formatTime(data[i].createTime)
        if (currentItemTime === list[list.length -1].title) {
          this.computedTotal(list[list.length -1], data[i])
          list[list.length -1].items.push(data[i])
        } else {
          list.push({title: currentItemTime, inTotal: 0,outTotal: 0, items:[data[i]]})
          this.computedTotal(list[list.length -1], data[i])
        }
      }

      return list;
    }

    computedTotal(item: ResultItem, data: RecordItem) {
      if(data.type === '-') {
        item.outTotal += data.amount;
        this.outputTotal += data.amount
      }else {
        item.inTotal += data.amount;
        this.inputTotal += data.amount
      }
    }

    formatTime(time: string) {
      return window.dayjs(time).format('YYYY-MM-DD')
    }

    addWeekStr(day: string) {
      let numDay = window.dayjs(day).day();
      return window.dayjs().isSame(window.dayjs(day), 'day') ? `${day} （今天）` : `${day} （${weekCn[numDay]}）`;
    }

    get recordList(): RecordItem[] {
      return this.$store.state.recordList;
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/prefix.scss';

  @mixin flexClass{
    padding: 10px;
    display: flex;justify-content: space-between;
  }
  .total-wrapper{
    display: flex;justify-content: center;align-items: center;
    padding: 10px;background: $mainColor;
    li{
      flex-grow: 1;text-align: center;font-size: 22px;color: #f2f2f2;
    }
  }
  .record-list-wrapper{
    border-bottom: 1px solid #ccc;
    .title{
      background: #CCC;
      @include flexClass;
      padding: 12px 10px;font-size: 14px;
        .outtotal-wrapper{
          margin-right: 10px;
        }
    }
    .item{
      .notes{
        padding-left: 10px;
      }
      @include flexClass;
      padding: 7px 0px;
      margin: 0px 7px;
      border-bottom: 1px solid #ccc;
      &:last-child{
        border-bottom: 0;
      }
    }
  }
</style>
<style lang="scss">
  .statistics-content{
    display: flex;flex-direction: column;
    .no-data{
      height: 100%;font-size: 20px;align-items: center;justify-content: center;
      display: flex;background: #ccc;
    }
  }
</style>


