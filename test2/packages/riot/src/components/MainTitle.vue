<template>
  <div main-title>
    <h1>HELLO WORLD</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import "~@/less/proj.less";

[main-title] {
  > h1 {
    .color(red);
  }
}
</style>
