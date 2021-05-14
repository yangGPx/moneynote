<template>
  <layout classPrefix="statistics">
    <tabs :data-source="moneyTypeTabs" :value.sync="moneyType"/>
    <ul class="record-list-wrapper" v-if="recordList.length > 0">
      <li v-for="(item, index) in result" :key="index">
        <div class="title"><span>{{ item.title }}</span> <span>￥{{ item.total }}</span></div>
        <div v-for="record in item.items" :key="record.id" class="item">
          <div>
            <span>{{ record.tags[0] }}</span>
            <span class="notes">{{ record.notes }}</span>
          </div>
          <span>￥{{record.amount}}</span>
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
  import { moneyTypeTabs } from '@/const'
  import dayjs from 'dayjs'
  import { dataClone } from '@/libs/util'

  type ResultItem = {
    title: string,
    total: number,
    items: RecordItem[]
  }

  @Component({
    components: {
      Tabs
    }
  })
  export default class Statistics extends Vue{
    moneyType = moneyTypeTabs[0].value
    moneyTypeTabs = moneyTypeTabs
    created() {
      this.$store.commit('fetchRecord')
    }

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

    get result() {
      if (this.recordList.length === 0) return [];
      const { formatTime } = this;

      const data = dataClone(this.recordList).filter(item => item.type === this.moneyType)
      data.sort((a, b) => dayjs(a.createTime).valueOf() - dayjs(b.createTime).valueOf())

      const list:ResultItem[] = [{title: formatTime(data[0].createTime), total: data[0].amount, items:[data[0]]}]
      for(let i = 1; i < data.length; i++) {
        let currentItemTime = formatTime(data[i].createTime)
        if (currentItemTime === list[list.length -1].title) {
          list[list.length -1].total += data[i].amount
          list[list.length -1].items.push(data[i])
        } else {
          list.push({title: currentItemTime, total: data[i].amount, items:[data[i]]})
        }
      }

      return list;
    }

    formatTime(time: string) {
      return dayjs(time).format('YYYY-MM-DD')
    }

    get recordList(): RecordItem[] {
      return this.$store.state.recordList;
    }
  }
</script>

<style lang="scss" scoped>
  @mixin flexClass{
    padding: 8px 10px;
    display: flex;justify-content: space-between;
  }
  .record-list-wrapper{
    .title{
      background: #CCC;
      @include flexClass;
      padding: 8px 10px;
    }
    .item{
      .notes{
        padding-left: 10px;
      }
      @include flexClass;
      padding: 5px 10px;
      background: rgb(219, 218, 218);
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