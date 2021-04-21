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
  import { dataClone } from '@/libs/util'

  @Component({
    components: {
      Tags,Tabs,ForumItem,NumberPad
    }
  })
  export default class Money extends Vue{
    tagList: Tag[] = window.tagList;
    record: RecordItem = {
      tags: [],
      notes: '',
      type: 'out',
      amount: 0,
      createTime: Date()
    };

    onSubmit(): void {
      if (this.record.amount !== 0) {
        if(window.recordCreate(dataClone(this.record))){
          this.intRecord();
          window.alert('保存成功')
        } else {
          window.alert('保存失败')
        };
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
      window.recordSave();
    }
  }
</script>

<style lang="scss">
  .money-content.content{
    display: flex;
    flex-direction: column;
  }
</style>