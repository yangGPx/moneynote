<template>
  <layout classPrefix="money">
    <tags :data-source="tagList" :value.sync="record.tags"/>
    <tabs :value.sync="record.type" :data-source="moneyTypeTabs" @change="changeTagType"/>
    <number-pad :value.sync="numberPadValue"
      @submit="onSubmit"/>
  </layout>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import Tags from '@/components/money/Tags.vue';
  import Tabs from '@/components/Tabs.vue';
  import ForumItem from '@/components/ForumItem.vue';
  import NumberPad from '@/components/money/NumberPad.vue';
  import { dataClone } from '@/libs/util'
  import { moneyTypeTabs } from '@/const'

  @Component({
    components: {
      Tags,Tabs,ForumItem,NumberPad
    },
  })
  export default class Money extends Vue{
    record: RecordItem = {
      tags: [],
      notes: '',
      type: 'out',
      amount: 0,
      recordDate: Date(),
      recordCreateTime: Date(),
    };

    numberPadValue:NumberPadValue ={
      notes: '',
      amount: 0,
      recordDate: Date()
    }

    moneyTypeTabs = moneyTypeTabs

    get tagList() {
      return this.$store.state['tag'].tagList;
    }
    created() {
      this.$store.commit('fetchTags', this.record.type)
    }
    onSubmit(numPad: NumberPad): void {
      this.record = { ...this.record, ...this.numberPadValue }
      if (this.record.amount !== 0 && this.record.tags.length > 0) {
        this.$store.commit('createRecord', dataClone(this.record));
        this.intRecord();
        numPad.empty()
      } else {
        window.alert(this.record.amount === 0 ? '金额不能为空' : '必须选择一个标签');
      }
    }

    changeTagType(value: TagType) {
      this.$store.commit('fetchTags', value)
    }

    intRecord():void {
      this.record = {
        tags: [],
        notes: '',
        type: 'out',
        amount: 0,
        recordDate: Date(),
        recordCreateTime: Date(),
      }
    }
  }
</script>

<style lang="scss">
  .money-content.content{
    $navHeight: 56px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    .tags{
      flex: auto;
      overflow-y: auto;
      .tag-list{
        flex-grow: 1;
        overflow: auto;
      }
    }
    .tabs, .number-pad{
      flex: none;
      flex-shrink: 0;
    }
  }
</style>