<template>
  <layout classPrefix="statistics">
    <ul class="total-wrapper">
      <li>总支出: {{outputTotal}}</li>
      <li>总收入: {{inputTotal}}</li>
    </ul>
    <record-list :info="result" v-if="result.length > 0"/>
    <div v-else class="no-data">
      <icon name="no_record"/><br />
      哎呀呀，没有记账记录<br />
      <router-link to="/money">记一笔</router-link>
    </div>
  </layout>
</template>

/**
  第二种处理方法：
  1. 先给数据进行排序，利用时间进行排序，处理时间用dayjs
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
  import { dataClone, formatTime } from '@/libs/util'
  import dayjs from 'dayjs'
  import RecordList from '@/components/RecordList.vue'


  @Component({
    components: {
      Tabs,
      RecordList
    }
  })
  export default class Statistics extends Vue{
    // moneyType = moneyTypeTabs[0].value
    // moneyTypeTabs = moneyTypeTabs
    outputTotal = 0;
    inputTotal = 0;

    created(): void {
      console.log(this.$store);
      
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
    //   data.sort((a, b) => dayjs(a.createTime).valueOf() - dayjs(b.createTime).valueOf())

    //   return data;
    // }

    get result(): ResultItem[] {
      console.log(this.recordList);
      
      if (this.recordList.length === 0) return [];
      const data = dataClone(this.recordList);
      if(data.length === 0) return [];
      // 先排序 后 归类
      // 时间排序
      data.sort((a, b) => dayjs(a.createTime).valueOf() - dayjs(b.createTime).valueOf())

      const list:ResultItem[] = [{title: formatTime(data[0].createTime), inTotal: 0, outTotal: 0, list:[data[0]]}]
      this.computedTotal(list[0], data[0])
      // 按照天进行归类 ，桶排序 有则push 无则创建新的桶归类
      for(let i = 1; i < data.length; i++) {
        let currentItemTime = formatTime(data[i].createTime)
        if (currentItemTime === list[list.length -1].title) {
          this.computedTotal(list[list.length -1], data[i])
          list[list.length -1].list.push(data[i])
        } else {
          list.push({title: currentItemTime, inTotal: 0,outTotal: 0, list:[data[i]]})
          this.computedTotal(list[list.length -1], data[i])
        }
      }

      return list;
    }

    computedTotal(item: ResultItem, data: RecordItem): void {
      item.outTotal = item.outTotal || 0;
      item.inTotal = item.inTotal || 0;
      if(data.type === 'out') {
        item.outTotal += data.amount;
        this.outputTotal += data.amount
      }else {
        item.inTotal += data.amount;
        this.inputTotal += data.amount
      }
    }

    formatTime(time: string) {
      return dayjs(time).format('YYYY-MM-DD')
    }

    get recordList(): RecordItem[] {
      return this.$store.state['record'].recordList;
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
      $size: 80px;
      line-height: 30px;padding-top: 200px;
      height: 100%;font-size: 20px;background: #e9e9e9;text-align: center;
      a{
        color: #ffa600;
      }
      svg{
        width: $size;height: $size;
      }
    }
  }
</style>


