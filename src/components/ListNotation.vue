<template>
  <div class="block">
    <div>
      <h3>Liste des évaluations</h3>
      <ul v-if="listNotation.length">
        <li v-for="notation in listNotation" :key="notation.id">
          <p>{{ notation.nameTest }} {{ notation.nameListPerson }}</p>
          <p v-if="!notation.finished">(en cours)</p>
          <p v-else>(terminée)</p>
          <button @click="seeTest(notation.id)" class="btn btn-primary"> Voir </button>
        </li>
      </ul>
      <p v-else>Aucune évaluation</p>
    </div>
  </div>
</template>

<script>
import Localbase from "localbase";
let db = new Localbase("db");
export default {
  name: "ListNotation",
  data() {
    return {
      listNotation: [],
    };
  },
  methods: {
    seeTest(id) {
      this.$router.push('/evaluation/eval/'+ id)
    },
  },
  created() {
    db.collection("evaluation")
      .get()
      .then((notation) => {
        this.listNotation = notation;
      });
  },
};
</script>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50em;
  width: 100vw;
  align-items: center;
}

.block div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50em;
  width: 75vw;
  align-items: center;
}

label {
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  font-size: 1.5em;
  font-weight: bold;
}
</style>
