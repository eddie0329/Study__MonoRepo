<template>
  <div my-input>
    <h6>{{ title }}</h6>
    <input type="text" />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    value: { type: Object, default: () => ({}) },
  },
  computed: {
    /** @returns {InputProps.title} */
    title() {
      return this?.value?.title ?? '';
    },
  }
};
</script>

<style lang="less">
@import "~@/less/proj.less";

[my-input] {
  > h6 { .color(red); }
}
</style>
