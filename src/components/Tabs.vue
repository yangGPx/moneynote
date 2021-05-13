<template>
  <ul class="tabs">
    <li v-for="(item, index) in dataSource" :key="index"
      @click="changeActive(item)"
      :class="{active: item.value === value}">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'

  type tabsItem = {
    text: string,
    value: string
  }

  @Component
  export default class Tabs extends Vue{
    @Prop() value?: string;
    @Prop({ required: true, type: Array}) dataSource!: tabsItem[];

    created() {
      if(!this.value) {
        this.$emit('update:value', this.dataSource[0] && this.dataSource[0].value)
      }
    }

    changeActive (item: tabsItem) {
      this.$emit('update:value', item.value)
      this.$emit('click', item.value)
    }

    @Watch('value')
    changeAction(value:string){
      this.$emit('change', value)
    }
  }
</script>

<style lang="scss" scoped>
  .tabs{
    display: flex;justify-content: center;align-items: center;
    height: 64px;font-size: 24px;position: relative;
    background: #C4C4C4;
    li{
      flex-grow: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active{
        background: #fff;
        border-bottom: 2px solid #c4c4c4;
      }
    }
  }
</style>