<template>
    <ul class="record-list-wrapper" v-if="info.length > 0">
      <li v-for="(item, index) in info" :key="index">
        <div class="title"><span>{{ item.title }}</span> 
          <div>
            <span v-if="item.outTotal" class="outtotal-wrapper">支出: {{ item.outTotal }}</span>
            <span v-if="item.inTotal">收入: {{item.inTotal}}</span>
            <span v-if="item.total">总计: {{item.total}}</span>
          </div>
        </div>
        <div v-for="record in item.list" :key="record.id" class="item">
          <div>
            <span>{{ record.tags[0] || '无' }}</span>
            <span class="notes">{{ record.notes }}</span>
          </div>
          <span> {{record.type === 'out' ? '- ' : '' }}{{record.amount}}</span>
        </div>
      </li>
    </ul>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { weekCn } from '@/const'
    import dayjs from 'dayjs'

    @Component
    export default class RecordList extends Vue{
        @Prop({ required: true, default: [] }) info!: ResultItem[];
        addWeekStr(day: string): string{
            let numDay = dayjs(day).day();
            return dayjs().isSame(dayjs(day), 'day') ? `${day} （今天）` : `${day} （${weekCn[numDay]}）`;
        }
    }
</script>

<style lang="scss" scoped>
  @mixin flexClass{
    padding: 10px;
    display: flex;justify-content: space-between;
  }
  .record-list-wrapper{
    border-bottom: 1px solid #ccc;overflow-y: auto;
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