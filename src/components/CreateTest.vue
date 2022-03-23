<template>

  <input v-model="nameTest"
         placeholder="nom de l'evaluation">


  <input v-model="criterion"
         placeholder="critère d'evaluation">

  <button @click="addCriterion"> ajouter </button>
  <ul v-if="criterions.length">
    <li v-for="criter in criterions" :key="criter.id">
      {{ criter }}
      <button @click="removeCriterion(criter)"> supprimer</button>
    </li>
  </ul>
  <p v-else>aucun critère</p>
  <p v-if="!formOk" style="color: red; font-style: italic;">Veuillez entrer un nom ou des critères pour ajouter une évaluation</p>
  <p v-if="!formOkCriterion" style="color: red; font-style: italic;">Veuillez entrer un nom pour ajouter un nouveau critère</p>
  <button @click="addNewTest"> valider </button>


</template>

<script>
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
      if(this.nameTest && this.criterions.length) {
        this.formOk = true;
        let db = '';
        let openRequest = indexedDB.open('db', 3);
        openRequest.onupgradeneeded = function(){
          db = openRequest.result;
          //Si l'objet de stockage users n'existe pas, on le crée
          if (!db.objectStoreNames.contains('controle')){
            db.createObjectStore('controle', {keyPath: 'id', autoIncrement: true});
          }
        };
        openRequest.onerror = function(){
          alert('Impossible d\'accéder à IndexedDB');
        };

        db = openRequest.result;
        let transaction = db.transaction('controle', 'readwrite');

        let tests = transaction.objectStore('controle');

        let test = {
          name: this.nameTest,
          notation: serialize(this.criterions)
        };
        console.log(test)
        let ajout = tests.add(test);

        ajout.onsuccess = function () {
          alert('Evalution ajoutée');
        };
        ajout.onerror = function () {
          alert('Erreur : ' + ajout.error);
        };
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
        this.criterions.push(this.criterion)

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