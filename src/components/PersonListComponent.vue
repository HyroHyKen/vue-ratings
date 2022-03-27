<template>
  <section>
    <h1>Liste d'étudiants</h1>
    <ul>
      <li v-for="(student, index) in students" :key="index">
        <div @click="setSelectedStudent(index)"><span>{{ student.name }}</span></div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'PersonListComponent',
  props: {
    students: Array,
    setSelectedStudent: Function
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  box-shadow: 0 1px 0 rgba(0,0,0,.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  right: 1em;
  top: 5em;
  z-index: 1;
}
ul{
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

span {
  text-decoration: none;
  color: #42b983;
  cursor: pointer;
}
span:hover{
  color: #2c3e50;
  text-decoration: underline;
}
</style>
