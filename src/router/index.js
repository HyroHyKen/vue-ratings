import {createRouter, createWebHistory} from "vue-router";
import CreateTest from "@/components/CreateTest";
import ImportPerson from "@/components/ImportPerson";
import ChooseNotation from "@/components/ChooseNotation";

const routes = [

    { path: '/administration/evaluation', name: 'adminTest', component: CreateTest },

    { path: '/administration/personne', name: 'adminPerson', component: ImportPerson },

    { path: '/', name: 'home', component: ChooseNotation },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router