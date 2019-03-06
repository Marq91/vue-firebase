<template>
  <v-layout column justify-center text-xs-center>
    <div class="home-titulo">
      <h1>Santiago Cine</h1>
    </div>
    <v-layout wrap>
      <v-flex xs12 sm6 md 3 lg3 v-for="item in 4" :key="item">
        <v-card class="elevation-5 ma-3">
          <v-img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Blank_50px.png"></v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<style>

.home-titulo {
  font-family: 'Great Vibes', cursive;
  font-size: 2rem;
  color: #553f75;
  text-shadow: 2px 2px 5px #918d8d;
}

</style>
