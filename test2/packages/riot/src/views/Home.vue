<template>
  <div class="home">
    <img alt="Vue logo" src="/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <MyButton label="HELLO WORLD" primary />
    <MainTitle />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HelloWorld from '../components/HelloWorld.vue';
import MainTitle from '@/components/MainTitle';
import MyButton from '@project/shared/components/Button/Button.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MyButton,
    MainTitle
  }
}
</script>
