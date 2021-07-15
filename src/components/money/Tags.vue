<template>
  <div class="tags">
    <ul class="tag-list">
      <li v-for="item in dataSource"
        :class="{active: active(item.name)}"
        :key="item.id"
        @click="toggle(item.name)">
        <span class="icon-wrapper">
          <icon :name="item.svg || 'self'"/>
        </span>
        <span class="tag-name">{{ item.name }}</span>
      </li>
      <li @click="adminTag">
        <span class="icon-wrapper"><icon name="setting"/></span>
        <span class="tag-name">设置</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'

  @Component
  export default class Tags extends Vue{
    @Prop({ default:() => ([]) }) dataSource!:string[];
    @Prop({ default:() => ([]) }) value!: string[];
    
    toggle(input: string){
      // const index:number = this.value.indexOf(input);
      // const tempArr = [...this.value];
      // if (index > -1) {
      //   tempArr.splice(index, 1);
      // } else {
      //   tempArr.push(input);
      // }
      this.$emit('update:value', [input]);
    }
    active(input:string){
      const index:number = this.value.indexOf(input);
      return index > -1;
    }
    adminTag() {
      this.$router.push({
        path: '/labels'
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/prefix.scss';

  .tags{
    $space: 8px;
    $itemPadding: 22px;
    flex-grow: 1;padding: 16px 0;padding-top: 0; display: flex;
    flex-direction: column;justify-content: flex-end;
    background: #fff;
    .tag-list{
      padding: 0 $space;
      li{
        display: inline-flex;
        text-align: center;
        border-radius: 24px;
        flex-direction: column;
        &.active{
          .icon-wrapper{
            background: $mainColor;
          }
          .tag-name{
            color: $mainColor;
          }
        }
        .icon-wrapper{
          $iconHeight: 45px;
          $svgWH: 27px;
          background: #ccc9c9;display: flex;justify-content: center;align-items: center;
          width: $iconHeight;height: $iconHeight;border-radius: 50%;margin: $itemPadding; margin-bottom: 5px;
          ::v-deep svg{
            width: $svgWH;
            height: $svgWH;
          }
        }
        .tag-name{
          display: block;
        }
      }
    }
    .add-tag{
      padding: 0px (#{$itemPadding + $space});
      span{
        color: #999;border-bottom:1px solid;padding-bottom: 3px;
      }
    }
  }
</style>