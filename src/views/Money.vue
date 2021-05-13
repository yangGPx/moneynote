<template>
  <layout classPrefix="money">
    <tags :data-source="tagList" :value.sync="record.tags"/>
    <forum-item :value.sync="record.notes"/>
    <tabs :value.sync="record.type" :data-source="moneyTypeTabs"/>
    <number-pad :value.sync="record.amount" @submit="onSubmit"/>
  </layout>
</template>
<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator'
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
      type: '-',
      amount: 0,
      createTime: Date()
    };

    moneyTypeTabs = moneyTypeTabs

    get tagList() {
      return this.$store.state.tagList;
    }
    created() {
      this.$store.commit('fetchTags')
    }
    onSubmit(): void {
      if (this.record.amount !== 0) {
        this.$store.commit('createRecord', dataClone(this.record));
        this.intRecord();
      }
    }

    intRecord():void {
      this.record = {
        tags: [],
        notes: '',
        type: '-',
        amount: 0,
        createTime: Date()
      }
    }
  }
</script>

<style lang="scss">
  .money-content.content{
    display: flex;
    flex-direction: column;
  }
</style>