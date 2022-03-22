import {createRouter, createWebHistory} from "vue-router";
import CreateTest from "@/components/CreateTest";
import HelloWorld from "@/components/HelloWorld";
const routes = [
    // will match everything and put it under `$route.params.pathMatch`
    { path: '/administration', name: 'admin', component: CreateTest },
    // will match anything starting with `/user-` and put it under `$route.params.afterUser`
    { path: '/', name: 'home', component: HelloWorld },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router