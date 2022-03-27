<template>
  <div class="block">
    <div>
      <label> Choisir une évaluation : </label>
      <select v-model="selectedTest" v-if="listTest.length">
        <option disabled value="">Choisissez</option>
        <option v-for="test in listTest" :key="test.id" v-bind:value="test">
          {{ test.name }}
        </option>
      </select>
      <p v-else>aucune élavaluation</p>
      <label> Choisir un groupe de personne : </label>
      <select v-model="selectedPerson" v-if="listTest.length">
        <option disabled value="">Choisissez</option>
        <option v-for="person in listPerson" :key="person.id" v-bind:value="person">
          {{ person.name }}
        </option>
      </select>
      <p v-else>Aucune liste de personne</p>
      <p v-if="!formOk" class="error">
        Veuillez choisir une évaluation et un groupe de personne
      </p>
      <button @click="createEvaluation" class="btn btn-primary">Valider</button>
    </div>
  </div>
</template>

<script>
import Localbase from "localbase";
import { uuid } from "vue-uuid";
import * as fonction from "../function.js";
let db = new Localbase("db");
export default {
  name: "ChooseNotation",
  data() {
    return {
      selectedTest: "",
      selectedPerson: "",
      listTest: [],
      listPerson: [],
      formOk: true,
    };
  },
  methods: {
    createEvaluation() {
      if (this.selectedTest !== "" && this.selectedPerson !== "") {
        this.formOk = true;
        let val = fonction.deserialize(this.selectedPerson.persons);
        let group = [];

        for (let test in val) {
          group.push({
            name: val[test].name,
            firstName: val[test].firstName,
            mark: fonction.deserialize(this.selectedTest.notation),
          });
        }

        let evaluation = {
          id: uuid.v1(),
          nameTest: this.selectedTest.name,
          nameListPerson: this.selectedPerson.name,
          finished: false,
          listPerson: fonction.serialize(group),
        };
        db.collection("evaluation").add(evaluation);
        this.selectedTest = [];
        this.selectedPerson = [];
        this.$router.push("/");
      } else {
        this.formOk = false;
      }
    },
  },
  created() {
    db.collection("evaluationModel")
      .get()
      .then((tests) => {
        this.listTest = tests;
      });
    db.collection("person")
      .get()
      .then((persons) => {
        this.listPerson = persons;
      });
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
  width: 40vw;
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
</style>
