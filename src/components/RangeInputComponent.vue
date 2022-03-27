<template>
  <main v-if="selectedStudent != null">
    <h2 for="rating">Vitesse de {{ selectedStudent.name }}</h2>
    <form action="slider-control.php" method="post">
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        name="rating"
        @input="(event) => updateValue(event.target.value)"
        :value="0"
      />
    </form>
      <h3>Actuel : {{ this.value }}</h3>
  </main>
  <main v-else>
    <h2>Veuillez sélectionner un étudiant</h2>
  </main>
</template>

<script>
export default {
  name: "RangeInputComponent",
  props: {selectedStudent: Object},
  data() {
    return {
      value: 0,
      student_OLD: null,
    };
  },
  beforeUpdate() {
    if (this.selectedStudent != null) {
      this.updateValue(this.selectedStudent.value);
      if (this.selectedStudent != this.student_OLD) {
        console.log(this.selectedStudent.name + " -->" + (this.student_OLD ? this.student_OLD.name: null));
        this.updateValue(this.selectedStudent.value);
        this.student_OLD = this.selectedStudent;
      }
    }
  },
  methods: {
    updateValue(value) {
      this.value = value;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50em;
}
form {
  display: flex;
  justify-content: center;
  align-items: center;
}
input[type="range"] {
  -webkit-appearance: none;
  margin-right: 15px;
  width: 200px;
  height: 7px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  background-color: #42b983;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #2c3e50;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
