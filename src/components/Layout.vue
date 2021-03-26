<template>
  <div class="layout">
    <div class="content">
      <slot></slot>
    </div>
    <common-nav />
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import CommonNav from '@/components/CommonNav.vue';

  @Component({
    components: {
      CommonNav
    }
  })
  export default class Layout extends Vue{
    
  }
</script>

<style lang="scss" scoped>
  .layout{
    display: flex;flex-direction: column;height:100vh;
    .content{
      flex-grow: 1;
    }
  }
</style>