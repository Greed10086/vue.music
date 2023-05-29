<template>
    <h2></h2>

    <div class="container" style="width: 90%">
        <RouterLink to="/lessons"><i class="material-icons" style="vertical-align: top">keyboard_arrow_left</i>返回课程列表
        </RouterLink>

        <h4 style="font-family: 'STKaiti', serif;">测试1 </h4>


        <div class="row">
            <div class="col s12">
                <ul class="tabs tabs-fixed-width">
                    <li class="tab col s3">
                        <RouterLink to="/test_1/instruction" class="active">介绍</RouterLink>
                    </li>
                    <li id="test-tab" class="tab col s3 disabled">
                        <RouterLink to="/test_1/test">测试</RouterLink>
                    </li>
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
import test_1_instruction from '../components/test_1_instruction.vue'
import test_1_test from '../components/test_1_test.vue'

export default {
    name: 'test_1',
    components: { test_1_instruction, test_1_test }
}
</script>
<style lang="css"></style>