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
  <p class="error" v-if="!formOk" >Veuillez entrer un nom et des personnes pour ajouter une liste de personne</p>
  <p class="error" v-if="!formOkPerson" >Veuillez entrer un nom et un prénom pour ajouter une personne</p>
  <button @click="importPerson">Importer la liste</button>
</template>

<script>
import Localbase from 'localbase'
import { uuid } from 'vue-uuid';
import * as fonction from '../function.js'
let db = new Localbase('db')
export default {
  name: "ImportPerson",
  data() {
    return {
      name: '',
      firstName: '',
      listPerson: [],
      nameList: '',
      formOkPerson: true,
      formOk: true

    }
  },
  methods: {
    addNewPerson() {
      if(this.name && this.firstName) {
        this.formOkPerson = true;

        this.listPerson.push({name: this.name, firstName: this.firstName})

        this.name = '';
        this.firstName = '';
      }else{
        this.formOkPerson = false;
      }

    },
    importPerson() {
      if(this.listPerson.length && this.nameList) {
        this.formOk = true;

        let person = {
          id: uuid.v1(),
          name: this.nameList,
          persons: fonction.serialize(this.listPerson)

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
</script>

<style scoped>

</style>