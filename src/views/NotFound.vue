<template>
  <div class="not-found">
    <p><icon name="smile"/></p>
    <p>该网址暂时没有页面哦</p>
    <p><router-link to="/" style="color: #ffa600">回到 记一笔</router-link></p>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class NotFound extends Vue{
    
  }
</script>

<style lang="scss" scoped>
  .not-found{
    display: flex;flex-direction: column;font-size: 24px;
    text-align: center;background: #eee;height: 100vh;
    padding-top: 200px;line-height: 40px;
    svg{
      $height: 60px;
      width: $height;height: $height;
    }
  }
</style>