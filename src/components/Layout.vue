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
  $navHeight: 56px;
  .layout{
    display: flex;flex-direction: column;height: 100%;
    ::v-deep .common-nav{
      height: $navHeight;
    }
  }
  .content{
    height: calc(100% - #{$navHeight});
    max-height: calc(100% - #{$navHeight});
    flex-grow: 1;background: #e5e5e5;
    overflow: hidden;
  }
</style>