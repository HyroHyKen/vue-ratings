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
  <p v-if="!formOk" style="color: red; font-style: italic;">Veuillez entrer un nom ou des critères pour ajouter une évaluation</p>
  <p v-if="!formOkCriterion" style="color: red; font-style: italic;">Veuillez entrer un nom pour ajouter un nouveau critère</p>
  <button @click="addNewTest"> valider </button>


</template>

<script>
import Localbase from 'localbase'
import { uuid } from 'vue-uuid';
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
          notation: serialize(this.criterions)
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
// eslint-disable-next-line no-unused-vars
function serialize(value) {
  if (typeof value === 'function') {
    return value.toString();
  }
  if (typeof value === 'object') {
    var serializeObject = {};
    for (const [objectKey, objectValue] of Object.entries(value)) {
      serializeObject[objectKey] = serialize(objectValue);
    }
    return serializeObject;
  }

  return value;
}


</script>

<style scoped>

</style>