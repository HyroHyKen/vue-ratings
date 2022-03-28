<template>
  <div class="block">
    <div class="container">
      <div class="form-group">
      <label for="">Nom de l'évaluation</label>
        <input
          v-model="nameTest"
          class="form-control"
          placeholder="Nom de l'evaluation"
        />
        <hr>
      </div>
      <div class="form-group">
      <label for="">Critère d'évaluation</label>
        <input
          v-model="criterion"
          class="form-control"
          placeholder="Critère d'evaluation"
        />
        <hr>
      </div>
      <button @click="addCriterion" class="btn btn-primary">Ajouter</button>
      <hr>
      <ul v-if="criterions.length">
        <li v-for="criter in criterions" :key="criter.id">
          {{ criter.name }}
          <button @click="removeCriterion(criter)" class="btn btn-danger">Supprimer</button>
        </li>
      </ul>
      <p v-else>Aucun critère</p>
      <p class="alert alert-danger" role="alert" v-if="!formOk">
        Veuillez entrer un nom ou des critères pour ajouter une évaluation
      </p>
      <p class="alert alert-danger" role="alert" v-if="!formOkCriterion">
        Veuillez entrer un nom pour ajouter un nouveau critère
      </p>
      <hr>
      <button @click="addNewTest" class="btn btn-primary">Valider</button>
    </div>
  </div>
</template>

<script>
import Localbase from "localbase";
import { uuid } from "vue-uuid";
import * as fonction from "../function.js";
let db = new Localbase("db");
export default {
  name: "CreateTest",
  data() {
    return {
      nameTest: "",
      criterion: "",
      criterions: [],
      formOkCriterion: true,
      formOk: true,
    };
  },
  methods: {
    addNewTest() {
      //test de la validite du formulaire
      if (this.nameTest && this.criterions.length) {
        this.formOk = true;

        let test = {
          id: uuid.v1(),
          name: this.nameTest,
          notation: fonction.serialize(this.criterions),
        };
        db.collection("evaluationModel").add(test);

        this.criterions = [];
        this.criterion = "";
        this.nameTest = "";
      } else {
        this.formOk = false;
      }
    },
    addCriterion() {
      if (this.criterion) {
        this.formOkCriterion = true;

        this.criterions.push({ name: this.criterion, note: 0 });
        this.criterion = "";
      } else {
        this.formOkCriterion = false;
      }
    },
    removeCriterion(item) {
      this.criterions.splice(this.criterions.indexOf(item), 1);
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
  width: 40vw;
  align-items: center;
}

label {
  padding-bottom: 10px;
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
}
</style>
