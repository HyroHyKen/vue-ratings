<template>
  <div class="block">
    <div class="container">
      <div class="form-group">
        <label for="">Nom de la liste</label>
        <input v-model="nameList" class="form-control" placeholder="Nom de la liste" />
        <hr>
      </div>
      <div class="form-group">
        <label for="">Nom de la personne</label>
        <input v-model="name" class="form-control" placeholder="Nom de la personne" />
        <hr>
      </div>
      <div class="form-group">
        <label for="">Prénom de la personne</label>
        <input
          v-model="firstName"
          class="form-control"
          placeholder="Prénom de la personne"
        />
        <hr>
      </div>
      <button @click="addNewPerson" class="btn btn-primary">Ajouter</button>
        <hr>
      <ul v-if="listPerson.length">
        <li v-for="person in listPerson" :key="person.id">
          {{ person.name }} {{ person.firstName }}
          <button @click="removePerson(person)" class="btn btn-danger">Supprimer</button>
        </li>
      </ul>
      <p v-else>Aucun critère</p>
      <div class="alert alert-danger" role="alert" v-if="!formOk">
         Veuillez entrer un nom et des personnes pour ajouter une liste de personne
      </div>
      <div class="alert alert-danger" role="alert" v-if="!formOkPerson">
        Veuillez entrer un nom et un prénom pour ajouter une personne
      </div>
      <button @click="importPerson" class="btn btn-primary">Importer la liste</button>
    </div>
  </div>
</template>

<script>
import Localbase from "localbase";
import { uuid } from "vue-uuid";
import * as fonction from "../function.js";
let db = new Localbase("db");
export default {
  name: "ImportPerson",
  data() {
    return {
      name: "",
      firstName: "",
      listPerson: [],
      nameList: "",
      formOkPerson: true,
      formOk: true,
    };
  },
  methods: {
    addNewPerson() {
      if (this.name && this.firstName) {
        this.formOkPerson = true;

        this.listPerson.push({ name: this.name, firstName: this.firstName });

        this.name = "";
        this.firstName = "";
      } else {
        this.formOkPerson = false;
      }
    },
    importPerson() {
      if (this.listPerson.length && this.nameList) {
        this.formOk = true;

        let person = {
          id: uuid.v1(),
          name: this.nameList,
          persons: fonction.serialize(this.listPerson),
        };
        db.collection("person").add(person);

        this.name = "";
        this.firstName = "";
        this.nameList = "";
        this.listPerson = [];
      } else {
        this.formOk = false;
      }
    },
    removePerson(item) {
      this.listPerson.splice(this.listPerson.indexOf(item), 1);
    },
  },
};
</script>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70em;
  width: 100vw;
  align-items: center;
}

.block .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70em;
  width: 100vw;
  align-items: center;
}

@media (max-width: 650px) {
  .block .container {
    width: 100vw;
  }
}

label {
  padding-bottom: 10px;
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
}

.error{
  color: red;
}
</style>

