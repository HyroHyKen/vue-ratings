<template>

  <button v-if="evaluation === ''" @click="begin(id)" > Commencer l'évaluation </button>
  <div v-else >
    <ul>
      <li v-for="(person,index) in evaluation.listPerson" :key="person.id">
        <a href="#" @click="test(index)">{{ person.name }} {{ person.firstName }} </a>
      </li>
    </ul>

    
  </div>

</template>

<script>
import Localbase from 'localbase'
let db = new Localbase('db')
export default {
  name: "DoNotation",
  props:{
    id: String,
  },
  data(){
    return{
      evaluation: "",
      selected: 0
    }
  },

  methods: {
      begin(id){
        console.log (this.evaluation)
        db.collection('evaluation').doc({ id: id }).get().then(document => {
         this.evaluation = deserialize(document)
        })
      },
    test(index){
        this.selected = index
    }
  }

}
function deserialize(valueNew) {

  if (typeof valueNew === 'object') {
    var deserializeObject = {};
    for (const [objectKey, objectValue] of Object.entries(valueNew)) {
      deserializeObject[objectKey] = deserialize(objectValue);
    }
    return deserializeObject;
  }

  return valueNew;
}
</script>

<style scoped>

</style>