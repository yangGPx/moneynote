<template>
  <nav class="common-nav">
    <router-link
      v-for="item in linkList"
      :key="item.name"
      active-class="active"
      :to="`/${item.name}`">
      <icon :name="item.name"/>
      <span>{{ item.title }}</span>
    </router-link>
  </nav>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  type linkItem = {
    name: string
    title: string
  }

  @Component
  export default class CommonNav extends Vue{
    linkList: linkItem[] = [
      {name: 'statistics', title: '明细'},
      {name: 'money', title: '记一笔'},
      {name: 'chart', title: '图表'},
      // {name: 'labels', title: '标签'},
    ]
  }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/prefix.scss';
  .common-nav{
    display: flex;
    flex-shrink: 0;
    box-shadow: 0px -2px 2px 1px #e5e5e5;
    a{
      $defaultColor: #999;
      height: 100%;
      display: flex;
      flex-grow: 1;
      font-size: 12px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      fill: $defaultColor;
      color: $defaultColor;
      &.active{
        fill: $mainColor;
        color: $mainColor;
      }
    }
  }
</style>