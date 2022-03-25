<template>
  <button @click="getTest">test</button>



  <select v-model="selected" v-if="listTest.length">
    <option disabled value="">Choisissez</option>
    <option v-for="(test,id) in listTest" :key="test.id" v-bind:value="id">{{ test.name }}</option>
  </select>
  <p v-else>aucune élavaluation</p>
</template>

<script>
import Localbase from 'localbase'
let db = new Localbase('db')
export default {
  name: "ChooseNotation",
  data() {
    return {
      selected:[],
      listTest: [],
      listPerson: 'dd',


    }
  },
  methods: {
    add(list){
      this.listTest = list;
    },
    getTest(){



    }
  },
  created: async function(){


    db.collection('evaluation').get().then(tests => {
      this.listTest = tests
    })

    console.log(this.listTest);
  }

}
</script>

<style scoped>

</style>