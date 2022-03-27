<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />
  <header>
    <nav>
      <ul>
        <li class="logo"><img alt="Vue logo" width="30" src="./assets/logo.png" /></li>
        <li><router-link class="nav" to="/">Accueil</router-link></li>
        <li>
          <router-link class="nav" to="/evaluation/creer">Notation</router-link>
        </li>
        <li>
          <router-link class="nav" to="/administration/evaluation"
            >Modèle d'évaluation</router-link
          >
        </li>
        <li>
          <router-link class="nav" to="/administration/personne"
            >Liste de personne</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap");

* {
  /* Open Sans */
  font-family: "Open Sans", sans-serif;
}

.error {
  color: red;
  font-style: italic;
}

nav {
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100vw;
  align-items: center;
}

li {
  margin-top: 20px;
}

a {
  text-decoration: none;
  color: #42b983;
  text-align: center;
}
a:hover {
  color: #2c3e50;
  text-decoration: underline;
}

@media (max-width: 650px) {
  .nav {
    font-size: 0.9em;
  }

  .logo {
    display: none;
  }

  li {
    width: 25%;
  }
}
</style>
