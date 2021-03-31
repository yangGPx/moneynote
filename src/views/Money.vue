<template>
  <layout classPrefix="money">
    <tags />
    <comment />
    <tabs />
    <number-pad />
  </layout>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import Tags from '@/components/money/Tags.vue';
  import Tabs from '@/components/money/Tabs.vue';
  import Comment from '@/components/money/Comment.vue';
  import NumberPad from '@/components/money/NumberPad.vue';

  @Component({
    components: {
      Tags,Tabs,Comment,NumberPad
    }
  })
  export default class Money extends Vue{
    
  }
</script>

<style lang="scss">
  .money-content.content{
    display: flex;
    flex-direction: column;
  }
</style>