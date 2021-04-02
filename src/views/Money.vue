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

  type record = {
    tags: string[],
    notes: string,
    type: string,
    amount: number,
  }

  @Component({
    components: {
      Tags,Tabs,Comment,NumberPad
    }
  })
  export default class Money extends Vue{
    tagList: string[] = ['餐饮','购物', '日用', '交通', '水果'];
    recordList: record[] = [];
    record: record = {
      tags: [],
      notes: '',
      type: 'out',
      amount: 0,
    };

    onSubmit() {
      this.recordList.push(JSON.parse(JSON.stringify(this.record)));
      this.intRecord();
    }

    intRecord() {
      this.record = {
        tags: [],
        notes: '',
        type: 'out',
        amount: 0,
      }
    }

    @Watch('recordList')
    saveRecordList(value: record[]){
      window.localStorage.setItem('recordList', JSON.stringify(value))
    }
  }
</script>

<style lang="scss">
  .money-content.content{
    display: flex;
    flex-direction: column;
  }
</style>