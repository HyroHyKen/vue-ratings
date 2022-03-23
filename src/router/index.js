import {createRouter, createWebHistory} from "vue-router";
import CreateTest from "@/components/CreateTest";
import ImportPerson from "@/components/ImportPerson";

const routes = [

    { path: '/administration/evaluation', name: 'adminTest', component: CreateTest },

    { path: '/administration/personne', name: 'adminPerson', component: ImportPerson },

]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router