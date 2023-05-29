<template>
    <router-link to="/vocal_range/instruction">123</router-link>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
    </router-view>
</template>
<script>
import vocal_range_highest from '../components/vocal_range_highest.vue'
import vocal_range_lowest from '../components/vocal_range_lowest.vue'
import vocal_range_results from '../components/vocal_range_results.vue'
import vocal_range_instruction from '../components/vocal_range.vue'
export default {
    name: 'vocal_range',
    conponents: { vocal_range_highest, vocal_range_lowest, vocal_range_results, vocal_range_instruction }
}
</script>
<style lang="css"></style>