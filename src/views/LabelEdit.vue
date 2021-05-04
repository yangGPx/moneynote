<template>
  <layout>
    <nav class="top-nav">
      <span class="icon-wrapper" @click="goBack"><icon name="left"/></span>
      <div class="title">编辑标签</div>
    </nav>
    <div class="edit-label-content">
      <forum-item field-name="标签名" placeholder="在此处输入标签名" :value="tag && tag.name" @update:value="editLabel"/>
    </div>
    <div class="delete">
      <m-button @click="deleteTag">删除标签</m-button>
    </div>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import ForumItem from '@/components/ForumItem.vue';
  import MButton from '@/components/MButton.vue';
  import store from '@/store/index2'

  @Component({
    components: {
      ForumItem,
      MButton
    }
  })
  export default class LabelEdit extends Vue{
    id?: string = undefined;
    get tag() {
      return this.$store.state.currentTag;
    }
    goBack() {
      this.$router.back()
    }
    editLabel(name: string) {
      if (name.trim().length === 0) return;
      if(this.id) {
        this.$store.commit('updateTag', {
          id: this.id,
          name,
        });
      }
    }
    deleteTag() {
      if(this.id) {
        this.$store.commit('deleteTag', this.id)
      }
    }
    created() {
      this.id = this.$route.params.id;
      this.$store.commit('getOneTag', this.id);
      if(!(this.id && this.tag)) {
        this.$router.replace({
          path: '/404'
        })
      }
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

  .delete{
    text-align: center; padding: 20px 0;
  }
</style>