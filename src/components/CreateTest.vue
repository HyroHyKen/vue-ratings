<template>

  <input v-model="nameTest"
         placeholder="Ajouter une evalution">

  <button @click="addNewTest"> valider </button>


</template>

<script>
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



export default {
  name: "CreateTest",
  data() {
    return {
      nameTest: '',

    }
  },
  methods: {
    addNewTest() {
      db = openRequest.result;
      let transaction = db.transaction('controle', 'readwrite');

      let tests = transaction.objectStore('controle');

      let test = {
        name: this.nameTest,
        notation : []
      };

      let ajout = tests.add(test);

      ajout.onsuccess = function(){
        alert('Evalution ajoutée');
      };
      ajout.onerror = function(){
        alert('Erreur : ' + ajout.error);
      };

    },

  },


}

</script>

<style scoped>

</style>