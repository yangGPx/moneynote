<template>
  <layout classPrefix="money">
    <tags :data-source="tagList" :value.sync="record.tags"/>
    <comment :value.sync="record.notes"/>
    <tabs :value.sync="record.type"/>
    <number-pad :value.sync="record.amount"/>
  </layout>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
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
    record: record = {
      tags: [],
      notes: '',
      type: 'out',
      amount: 0,
    }
  }
</script>

<style lang="scss">
  .money-content.content{
    display: flex;
    flex-direction: column;
  }
</style>