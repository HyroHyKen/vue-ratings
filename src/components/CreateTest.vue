<template>

  <input v-model="nameTest"
         placeholder="nom de l'evaluation">


  <input v-model="criterion"
         placeholder="critère d'evaluation">

  <button @click="addCriterion"> ajouter </button>
  <ul v-if="criterions.length">
    <li v-for="criter in criterions" :key="criter.id">
      {{ criter.name }}
      <button @click="removeCriterion(criter)"> supprimer</button>
    </li>
  </ul>
  <p v-else>aucun critère</p>
  <p class="error" v-if="!formOk" >Veuillez entrer un nom ou des critères pour ajouter une évaluation</p>
  <p class="error" v-if="!formOkCriterion" >Veuillez entrer un nom pour ajouter un nouveau critère</p>
  <button @click="addNewTest"> valider </button>


</template>

<script>
import Localbase from 'localbase'
import { uuid } from 'vue-uuid';
import * as fonction from '../function.js'
let db = new Localbase('db')
export default {
  name: "CreateTest",
  data() {
    return {
      nameTest: '',
      criterion: '',
      criterions: [],
      formOkCriterion: true,
      formOk: true

    }
  },
  methods: {
    addNewTest() {
      //test de la validite du formulaire
      if(this.nameTest && this.criterions.length) {
        this.formOk = true;

        let test = {
          id:  uuid.v1(),
          name: this.nameTest,
          notation: fonction.serialize(this.criterions)
        };
        db.collection('evaluationModel').add(test)

        this.criterions = [];
        this.criterion = '';
        this.nameTest = '';

      }else{
        this.formOk = false;
      }

    },
    addCriterion() {
      if(this.criterion) {
        this.formOkCriterion = true;

        this.criterions.push({name: this.criterion, note: 0 })
        this.criterion = ''
      }else{
        this.formOkCriterion = false;
      }
    },
    removeCriterion(item){
      this.criterions.splice(this.criterions.indexOf(item), 1)
    }
  },
}
</script>

<style scoped>

</style>