<template>
  <input v-model="nameList"
         placeholder="Nom de la liste">
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
import Localbase from 'localbase'
import { uuid } from 'vue-uuid';
let db = new Localbase('db')
export default {
  name: "ImportPerson",
  data() {
    return {
      name: '',
      firstName: '',
      listPerson: [],
      nameList: ''


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
      if(this.listPerson.length && this.nameList) {
        this.formOk = true;


        let person = {
          id: uuid.v1(),
          name: this.nameList,
          persons: serialize(this.listPerson)

        }
        db.collection('person').add(person)


        this.name = '';
        this.firstName = '';
        this.nameList = '';
        this.listPerson = [];

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