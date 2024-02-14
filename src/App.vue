<template>
  <navbar></navbar>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
  </router-view>
</template>

<script>
import index from './components/index.vue'
import navbar from './components/navbar.vue'
import lessons from './components/lessons.vue'
import lesson_1 from './components/lesson_1.vue'
import login from './components/login.vue'
import register from './components/register.vue'
import test_1 from './components/test_1.vue'
import vocal_range_highest from './components/vocal_range_highest.vue'
import vocal_range_lowest from './components/vocal_range_lowest.vue'
import vocal_range_results from './components/vocal_range_results.vue'
import vocal_range from './components/vocal_range.vue'
import lesson_1_test1 from './components/lesson_1_test1.vue'
import lesson_1_test2 from './components/lesson_1_test2.vue'
import lesson_1_test3 from './components/lesson_1_test3.vue'
import video from './components/video.vue'
import video1 from './components/video1.vue'
import video2 from './components/video2.vue'
import test_1_instruction from './components/test_1_instruction.vue'
import test_1_test from './components/test_1_test.vue'

export default {
  name: 'App',
  components: {
    index, navbar, lessons, lesson_1, lesson_1_test1, lesson_1_test2, lesson_1_test3, video, video1, video2, login, register, test_1, test_1_instruction, test_1_test, vocal_range_highest, vocal_range_lowest, vocal_range_results, vocal_range
  }
}
</script>

<style lang="css" scoped>
@import './assets/style.css';


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
