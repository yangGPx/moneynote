<template>
  <layout>
    <nav class="top-nav">
      <span class="icon-wrapper" @click="goBack"><icon name="left"/></span>
      <div class="title">编辑标签</div>
    </nav>
    <div class="edit-label-content">
      <forum-item />
    </div>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import ForumItem from '@/components/ForumItem.vue';

  @Component({
    components: {
      ForumItem
    }
  })
  export default class LabelEdit extends Vue{
    goBack() {
      this.$router.back()
    }
  }
</script>

<style lang="scss" scoped>
  .top-nav{
    height: 48px;background: #fff;position: relative;
    .icon-wrapper{
      height: 100%;display: flex;align-items: center;padding: 0 5px;
      position: absolute;top: 50%;transform: translateY(-50%);
      svg::v-deep {
        width: 30px;height: 25px;
      }
    }
    .title{
      height: 100%;text-align: center;font-size: 16px;line-height: 48px;font-weight: 600;
    }
  }

  .edit-label-content{
    margin-top: 10px;
    .forum-item::v-deep{
      background: #fff;
    }
  }
</style>