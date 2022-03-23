import {createRouter, createWebHistory} from "vue-router";
import CreateTest from "@/components/CreateTest";

const routes = [
    // will match everything and put it under `$route.params.pathMatch`
    { path: '/administration/evaluation', name: 'admin', component: CreateTest },
    // will match anything starting with `/user-` and put it under `$route.params.afterUser`

]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router