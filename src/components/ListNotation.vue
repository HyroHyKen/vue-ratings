<template>
  <ul v-if="listNotation.length">
    <li v-for="notation in listNotation" :key="notation.id">
      <a v-bind:href="'/evaluation/eval/'+ notation.id">{{ notation.nameTest }} {{ notation.nameListPerson }} </a>
    </li>
  </ul>
  <p v-else>aucun critère</p>
</template>

<script>
import Localbase from 'localbase'
let db = new Localbase('db')
export default {
  name: "ListNotation",
  data(){
    return{
      listNotation: [],
    }
  },
  created() {
    db.collection('evaluation').get().then(notation => {
      this.listNotation = notation
    })
  }
}
</script>

<style scoped>

</style>