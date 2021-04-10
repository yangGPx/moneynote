<template>
  <layout classPrefix="money">
    <tags :data-source="tagList" :value.sync="record.tags"/>
    <comment :value.sync="record.notes"/>
    <tabs :value.sync="record.type"/>
    <number-pad :value.sync="record.amount" @submit="onSubmit"/>
  </layout>
</template>
<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import Tags from '@/components/money/Tags.vue';
  import Tabs from '@/components/money/Tabs.vue';
  import Comment from '@/components/money/Comment.vue';
  import NumberPad from '@/components/money/NumberPad.vue';
  import recordModel from '@/model/RecordListModel'

  @Component({
    components: {
      Tags,Tabs,Comment,NumberPad
    }
  })
  export default class Money extends Vue{
    tagList: string[] = ['餐饮','购物', '日用', '交通', '水果'];
    recordList: RecordItem[] = recordModel.fetch();
    record: RecordItem = {
      tags: [],
      notes: '',
      type: 'out',
      amount: 0,
    };

    onSubmit(): void {
      this.recordList.push(recordModel.clone(this.record));
      this.intRecord();
    }

    intRecord():void {
      this.record = {
        tags: [],
        notes: '',
        type: 'out',
        amount: 0,
      }
    }

    @Watch('recordList')
    saveRecordList(value: RecordItem[]): void{
      recordModel.save(value);
    }
  }
</script>

<style lang="scss">
  .money-content.content{
    display: flex;
    flex-direction: column;
  }
</style>