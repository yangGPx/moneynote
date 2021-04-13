<template>
  <button @click="$emit('click', $event)" class="m-button"><slot>确定</slot></button>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'

  @Component
  export default class MButton extends Vue{
    
  }
</script>

<style lang="scss" scoped>
  .m-button{
    border: none;background: #767676;color: #fff;width: 98px;height: 40px;border-radius: 5px;
  }
</style>