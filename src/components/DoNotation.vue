<template>
  <div class="block">
    <div>
      <button v-if="evaluation === ''" @click="begin(id)" class="btn btn-primary">
        Voir l'évaluation
      </button>
      <div v-else>
        <div v-if="evaluation.finished">
          <p>évaluation terminée</p>
          <ul>
            <li v-for="(person, index) in evaluation.listPerson" :key="person.id">
              <a href="#" @click="choosePerson(index)"
              >{{ person.name }} {{ person.firstName }}
              </a>
            </li>
          </ul>
          <h3>
            {{ evaluation.listPerson[selected].name }}
            {{ evaluation.listPerson[selected].firstName }}
          </h3>
          <ul>
            <li
                v-for="(criterion, index) in evaluation.listPerson[selected].mark"
                :key="criterion.id"
            >
              <label>{{ criterion.name }} : </label>

              {{ evaluation.listPerson[selected].mark[index].note }}
            </li>
          </ul>
          moyenne : {{avg}}
          <div class="navigation">
            <button @click="previusPerson()" v-if="selected !=0" class="btn btn-primary"> Précédent  </button>
            <button @click="nextPerson()" v-if="selected != countPerson-1" class="btn btn-primary"> Suivant </button>
          </div>
        </div>
        <div v-else>
          <button  @click="finishTest(id)" class="btn btn-primary">Terminer</button>
          <ul>
            <li v-for="(person, index) in evaluation.listPerson" :key="person.id">
              <a href="#" @click="choosePerson(index)"
              >{{ person.name }} {{ person.firstName }}
              </a>
            </li>
          </ul>

          <h3>
            {{ evaluation.listPerson[selected].name }}
            {{ evaluation.listPerson[selected].firstName }}
          </h3>
          <ul>
            <li
                v-for="(criterion, index) in evaluation.listPerson[selected].mark"
                :key="criterion.id"
            >
              <label>{{ criterion.name }} : </label>
              <input
                  type="range"
                  min="0"
                  max="100"
                  class="form-control"
                  v-model="evaluation.listPerson[selected].mark[index].note"
              />
              {{ evaluation.listPerson[selected].mark[index].note }}
            </li>
          </ul>
          moyenne : {{avg}}
          <div class="navigation">
            <button @click="previusPerson()" v-if="selected !=0" class="btn btn-primary"> Précédent  </button>
            <button @click="nextPerson()" v-if="selected != countPerson-1" class="btn btn-primary"> Suivant </button>
          </div>
          <button @click="save(id)" class="btn btn-primary">Sauvegarder</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Localbase from "localbase";
import * as fonction from "../function.js";
let db = new Localbase("db");
export default {
  name: "DoNotation",
  props: {
    id: String,
  },
  data() {
    return {
      evaluation: "",
      selected: 0,
    };
  },

  methods: {
    previusPerson(){
      this.selected--
      if(this.selected < 0){
        this.selected = 0
      }
    },
    nextPerson(){
      this.selected++
    },
    //pour recuperer l'id de l'évaluation
    begin(id) {
      db.collection("evaluation")
        .doc({ id: id })
        .get()
        .then((document) => {
          this.evaluation = fonction.deserialize(document);
        });
    },
    choosePerson(index) {
      this.selected = index;
    },
    save(id) {
      db.collection("evaluation")
        .doc({ id: id })
        .update(fonction.serialize(this.evaluation));
    },
    finishTest(id) {
      if(confirm("Voulez-vous vraiment terminer l'évaluation ?")){
        this.evaluation.finished = true;
        this.save(id);
      }
    },
    countMark(){
      let count = 0
      // eslint-disable-next-line no-unused-vars
      for (let i in this.evaluation.listPerson[this.selected].mark) {
        count++
      }
      return count
    },
  },
  computed: {
    avg: function(){

      let sum = 0

        for(let j = 0; j < this.countMark(); j++){
          console.log(sum)
          sum = parseInt(this.evaluation.listPerson[this.selected].mark[j].note)+sum
        }

      return sum / this.countMark()
    },

    countPerson(){
      let count = 0
      // eslint-disable-next-line no-unused-vars
      for (let i in this.evaluation.listPerson){
        count++
      }
      return count
    }
  }
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
.navigation{
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 5em;
  align-items: center;
}
.navigation button{
  margin-right: 10px;
}
</style>
