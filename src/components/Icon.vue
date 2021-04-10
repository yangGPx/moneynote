<template>
  <svg>
    <use :xlink:href="`#${name}`"/>
  </svg>
</template>
<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
    requireContext.keys().forEach(requireContext); //这里ts语言不认识requireContext，需要明确其类型
  try {
    importAll(require.context("../assets/icons", true, /\.svg$/));
  } catch (err) {
    console.log(err);
  }

  @Component
  export default class Icon extends Vue{
    @Prop ({ default: 'money', type: String }) name:string | undefined;
  }
</script>

<style lang="scss" scoped>
  svg{
    width: 20px;height: 20px;
    fill: inherit;
  }
</style>