<template>
    <h2></h2>

    <div class="container" style="width: 90%">
        <router-link to="/lessons"><i class="material-icons"
                style="vertical-align: top">keyboard_arrow_left</i>返回课程列表</router-link>

        <h4 style="font-family: 'STKaiti', serif;">第 1 课</h4>


        <div class="row">
            <div class="col s12">
                <ul class="tabs tabs-fixed-width">
                    <li id="tab1" class="tab col s3"><router-link to="/lesson_1/test1" class="active">练习 1</router-link>
                    </li>
                    <li id="tab2" class="tab col s3 disabled"><router-link to="/lesson_1/test2">视频：呼吸</router-link></li>
                    <li id="tab3" class="tab col s3 disabled"><router-link to="/lesson_1/test3">视频：定调</router-link></li>
                    <li id="tab4" class="tab col s3 disabled"><router-link to="/lesson_1/test4">练习2</router-link></li>
                    <li id="tab5" class="tab col s3 disabled"><router-link to="/lesson_1/test5">练习3</router-link></li>
                </ul>
            </div>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
                </keep-alive>
                <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
            </router-view>

        </div>
    </div>
</template>
<script>
import lesson_1_test1 from '../components/lesson_1_test1.vue'
import lesson_1_test2 from '../components/lesson_1_test2.vue'
import lesson_1_test3 from '../components/lesson_1_test3.vue'
// import lesson_1_test4 from '../components/lesson_1_test4.vue'
// import lesson_1_test5 from '../components/lesson_1_test5.vue'
export default {
    name: 'lesson_1',
    components: { lesson_1_test1, lesson_1_test2, lesson_1_test3 },

}
</script>
<style lang="css"></style>