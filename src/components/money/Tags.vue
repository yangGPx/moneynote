<template>
  <div class="tags">
    <ul class="tag-list">
      <li v-for="(item, index) in dataSource"
        :class="{active: active(item)}"
        :key="index"
        @click="toggle(item)">{{ item }}</li>
    </ul>
    <div class="add-tag">
      <span @click="createTag">新增标签</span>
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
    
    toggle(input: string){
      const index:number = this.value.indexOf(input);
      const tempArr = [...this.value];
      if (index > -1) {
        tempArr.splice(index, 1);
      } else {
        tempArr.push(input);
      }
      this.$emit('update:value', [...tempArr]);
    }
    active(input:string){
      const index:number = this.value.indexOf(input);
      return index > -1;
    }

    createTag() {
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