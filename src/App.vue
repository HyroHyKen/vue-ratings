<template>
  <nav>
    <router-link class="nav" to="/">Accueil</router-link>
    <router-link class="nav" to="/administration/evaluation">Créer une évaluation</router-link>
    <router-link class="nav" to="/administration/personne">Créer une liste de personne</router-link>
  </nav>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',

}


</script>

<style>
.nav{
  margin-left: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
