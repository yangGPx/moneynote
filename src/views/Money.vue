<template>
  <layout classPrefix="money">
    <tags :data-source="tagList" :value.sync="record.tags"/>
    <forum-item :value.sync="record.notes"/>
    <tabs :value.sync="record.type"/>
    <number-pad :value.sync="record.amount" @submit="onSubmit"/>
  </layout>
</template>
<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import Tags from '@/components/money/Tags.vue';
  import Tabs from '@/components/money/Tabs.vue';
  import ForumItem from '@/components/ForumItem.vue';
  import NumberPad from '@/components/money/NumberPad.vue';
  import { recordFetch, recordClone, recordSave } from '@/model/RecordListModel'
  import tagModel from '@/model/TagListModel'

  @Component({
    components: {
      Tags,Tabs,ForumItem,NumberPad
    }
  })
  export default class Money extends Vue{
    tagList: Tag[] = window.tagList;
    recordList: RecordItem[] = recordFetch();
    record: RecordItem = {
      tags: [],
      notes: '',
      type: 'out',
      amount: 0,
      createTime: Date()
    };

    onSubmit(): void {
      if (this.record.amount !== 0) {
        this.recordList.push(recordClone(this.record));
        this.intRecord();
      }
    }

    intRecord():void {
      this.record = {
        tags: [],
        notes: '',
        type: 'out',
        amount: 0,
        createTime: Date()
      }
    }

    @Watch('recordList')
    saveRecordList(value: RecordItem[]): void{
      recordSave(value);
    }
  }
</script>

<style lang="scss">
  .money-content.content{
    display: flex;
    flex-direction: column;
  }
</style>