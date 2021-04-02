<template>
  <div class="tags">
    <ul class="tag-list">
      <li v-for="(item, index) in dataSource"
        :class="{active: active(item)}"
        :key="index"
        @click="toggle(item)">{{ item }}</li>
    </ul>
    <div class="add-tag">
      <span>新增标签</span>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'

  @Component
  export default class Tags extends Vue{
    @Prop({ default: [] }) dataSource!:string[];
    @Prop({ default: [] }) value!: string[];
    
    selectedList: string[] = this.value;
    toggle(input: string){
      const index:number = this.selectedList.indexOf(input);
      if (index > -1) {
        this.selectedList.splice(index, 1);
      } else {
        this.selectedList.push(input);
      }
      this.$emit('update:value', [...this.selectedList]);
    }
    active(input:string){
      const index:number = this.selectedList.indexOf(input);
      return index > -1;
    }
  }
</script>

<style lang="scss" scoped>
  .tags{
    flex-grow: 1;padding: 16px 20px;display: flex;
    flex-direction: column;justify-content: flex-end;
    .tag-list{
      li{
        display: inline-block;width: 50px;height: 24px;
        line-height: 24px;background: #d9d9d9;text-align: center;
        border-radius: 24px;margin-right: 15px;margin-bottom: 15px;
        &.active{
          background: #999;color: #fff;
        }
      }
    }
    .add-tag{
      span{
        color: #999;border-bottom:1px solid;padding-bottom: 3px;
      }
    }
  }
</style>