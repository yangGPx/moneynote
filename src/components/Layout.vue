<template>
  <div :class="`layout ${classPrefix ? `${classPrefix}-layout` : ''}`">
    <div :class="`content ${classPrefix ? `${classPrefix}-content` : ''}`">
      <slot></slot>
    </div>
    <common-nav />
  </div>
</template>
<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import CommonNav from '@/components/CommonNav.vue';

  @Component({
    components: {
      CommonNav
    }
  })
  export default class Layout extends Vue{
    @Prop(String) classPrefix: string | undefined;
  }
</script>

<style lang="scss" scoped>
  .layout{
    display: flex;flex-direction: column;height:100%;
    .content{
      flex-grow: 1;background: #e5e5e5;
    }
  }
</style>