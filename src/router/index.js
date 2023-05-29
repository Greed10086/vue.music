import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../components/index.vue'

const routes = [
    { path: '/', component: index },
    // { path: '/lesson_1', name: 'lesson_1', redirect: "/lesson_1/test1", component: () => import('../components/lesson_1.vue'), meta: { keepAlive: true }, children: [{ path: 'test1', name: 'lesson_1_test1', component: () => import('../components/lesson_1_test1.vue'), meta: { keepAlive: true } }, { path: 'test2', name: 'lesson_1_test2', component: () => import('../components/lesson_1_test2.vue'), meta: { keepAlive: false } }, { path: 'test3', name: 'lesson_1_test3', component: () => import('../components/lesson_1_test3.vue'), meta: { keepAlive: false } }, { path: 'test4', name: 'lesson_1_test4', component: () => import('../components/lesson_1_test4.vue'), meta: { keepAlive: true } }, { path: 'test5', name: 'lesson_1_test5', component: () => import('../components/lesson_1_test5.vue'), meta: { keepAlive: true } }] },
    { path: '/lesson_1/test1', name: 'lesson_1_test1', component: () => import('../components/lesson_1_test1.vue'), meta: { keepAlive: true } },
    { path: '/lesson_1/test2', name: 'lesson_1_test2', component: () => import('../components/lesson_1_test2.vue'), meta: { keepAlive: true } },
    { path: '/lesson_1/test3', name: 'lesson_1_test3', component: () => import('../components/lesson_1_test3.vue'), meta: { keepAlive: true } },
    { path: '/vedio', name: 'vedio', component: () => import('../components/vedio.vue'), meta: { keepAlive: false } },
    { path: '/vedio1', name: 'vedio1', component: () => import('../components/vedio1.vue'), meta: { keepAlive: false } },
    { path: '/vedio2', name: 'vedio2', component: () => import('../components/vedio2.vue'), meta: { keepAlive: false } },
    { path: '/lessons', component: () => import('../components/lessons.vue') },
    { path: '/login', component: () => import('../components/login.vue') },
    { path: '/register', component: () => import('../components/register.vue') },
    //{ path: '/test_1', redirect: "/test_1/instruction", component: () => import('../components/test_1.vue'), children: [{ path: 'instruction', name: 'test_1_instruction', component: () => import('../components/test_1_instruction.vue'), meta: { keepAlive: false } }, { path: 'test', name: 'test_1_test', component: () => import('../components/test_1_test.vue'), meta: { keepAlive: true } }] },
    { path: '/test_1/instruction', name: 'test_1_instruction', component: () => import('../components/test_1_instruction.vue'), meta: { keepAlive: false } },
    { path: '/test_1/test', name: 'test_1_test', component: () => import('../components/test_1_test.vue'), meta: { keepAlive: true } },
    //   { path: '/vocal_range', name: 'vocal_range', component: () => import('../components/vocal_range.vue'), meta: { keepAlive: true }, children: [{ path: 'instruction', name: 'vocal_range_instruction', component: () => import('../components/vocal_range_instruction.vue'), meta: { keepAlive: false } }, { path: 'highest', name: 'vocal_range_highest', component: () => import('../components/vocal_range_highest.vue'), meta: { keepAlive: true } }, { path: 'lowest', name: 'vocal_range_lowest', component: () => import('../components/vocal_range_lowest.vue'), meta: { keepAlive: true } }, { path: 'results', name: 'vocal_range_results', component: () => import('../components/vocal_range_results.vue'), meta: { keepAlive: true } }] }
    { path: '/vocal_range/instruction', name: 'vocal_range_instruction', component: () => import('../components/vocal_range_instruction.vue'), meta: { keepAlive: false } },
    { path: '/vocal_range/highest', name: 'vocal_range_highest', component: () => import('../components/vocal_range_highest.vue'), meta: { keepAlive: true } },
    { path: '/vocal_range/lowest', name: 'vocal_range_lowest', component: () => import('../components/vocal_range_lowest.vue'), meta: { keepAlive: true } },
    { path: '/vocal_range/results', name: 'vocal_range_results', component: () => import('../components/vocal_range_results.vue'), meta: { keepAlive: true } }]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router