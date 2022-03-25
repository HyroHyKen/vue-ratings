import {createRouter, createWebHistory} from "vue-router";
import CreateTest from "@/components/CreateTest";
import ImportPerson from "@/components/ImportPerson";
import ChooseNotation from "@/components/ChooseNotation";
import ListNotation from "@/components/ListNotation";
import DoNotation from "@/components/DoNotation";

const routes = [

    { path: '/administration/evaluation', name: 'adminTest', component: CreateTest },

    { path: '/administration/personne', name: 'adminPerson', component: ImportPerson },

    { path: '/evaluation/creer', name: 'createEval', component: ChooseNotation },

    { path: '/', name: 'listEval', component: ListNotation },

    { path: '/evaluation/eval/:id', name: 'doEval', component: DoNotation, props: true},
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router