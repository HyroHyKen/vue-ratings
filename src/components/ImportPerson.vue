<template>
  <input v-model="name"
         placeholder="nom de la perosnne">
  <input v-model="firstName"
         placeholder="prénom de la personne">
  <button @click="addNewPerson">Ajouter</button>
  <ul v-if="listPerson.length">
    <li v-for="person in listPerson" :key="person.id">
      {{ person.name }} {{person.firstName}}
      <button @click="removePerson(person)"> supprimer</button>
    </li>
  </ul>
  <p v-else>aucun critère</p>
  <button @click="importPerson">Importer la liste</button>
</template>

<script>
let db = '';
let openRequest = indexedDB.open('db2', 3);
openRequest.onupgradeneeded = function(){
  db = openRequest.result;
  console.log(db)
  if (!db.objectStoreNames.contains('person')){
    db.createObjectStore('person', {keyPath: 'id', autoIncrement: true});
  }
};
openRequest.onerror = function(){
  alert('Impossible d\'accéder à IndexedDB');
};
export default {
  name: "ImportPerson",
  data() {
    return {
      name: '',
      firstName: '',
      listPerson: [],


    }
  },
  methods: {
    addNewPerson() {
      if(this.name && this.firstName) {
        this.formOk = true;

        this.listPerson.push({name: this.name, firstName: this.firstName})

        this.name = '';
        this.firstName = '';
      }else{
        this.formOk = false;
      }

    },
    importPerson() {
      if(this.listPerson.length) {
        this.formOk = true;


        db = openRequest.result;
        let transaction = db.transaction('person', 'readwrite');

        let tests = transaction.objectStore('person');


        let ajout = tests.add(serialize(this.listPerson));

        ajout.onsuccess = function () {
          alert('liste de personne ajoutée');
        };
        ajout.onerror = function () {
          alert('Erreur : ' + ajout.error);
        };
        this.listPerson = [];
        this.name = '';
        this.firstName = '';

      }else{
        this.formOk = false;
      }
    },
    removePerson(item){
      this.listPerson.splice(this.listPerson.indexOf(item), 1)
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