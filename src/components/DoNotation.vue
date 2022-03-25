<template>

  <button v-if="evaluation === ''" @click="begin(id)" > Commencer l'évaluation </button>
  <div v-else >
    <ul>
      <li v-for="(person,index) in evaluation.listPerson" :key="person.id">
        <a href="#" @click="choosePerson(index)">{{ person.name }} {{ person.firstName }} </a>
      </li>
    </ul>

    <h3> {{evaluation.listPerson[selected].name}} {{evaluation.listPerson[selected].firstName}}</h3>
    <ul>
      <li v-for="(criterion,index) in evaluation.listPerson[selected].mark" :key="criterion.id">
        <label>{{ criterion.name }} : </label>
        <input type="range" min="0" max="100" v-model="evaluation.listPerson[selected].mark[index].note">
        {{evaluation.listPerson[selected].mark[index].note}}
      </li>
    </ul>
    <button @click="save(id)">Sauvegarder</button>
  </div>

</template>

<script>
import Localbase from 'localbase'
import * as fonction from '../function.js'
let db = new Localbase('db')
export default {
  name: "DoNotation",
  props:{
    id: String,
  },
  data(){
    return{
      evaluation: "",
      selected: 0,
    }
  },

  methods: {
    //pour recuperer l'id de l'évaluation
      begin(id){
        db.collection('evaluation').doc({ id: id }).get().then(document => {
         this.evaluation = fonction.deserialize(document)
        })
      },
    choosePerson(index){
      this.selected = index
    },
    save(id){
      db.collection('evaluation').doc({ id: id }).update(fonction.serialize(this.evaluation))
    }
  }

}

</script>

<style scoped>

</style>