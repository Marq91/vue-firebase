<template>
  <v-layout column justify-center text-xs-center>
    <div class="home-titulo">
      <h1>Santiago Cine</h1>
    </div>
    <v-layout wrap>
      <v-flex xs12 sm6 md 3 lg3 v-for="obra in obras" :key="obra.oid">
        <v-card class="elevation-5 ma-3" :to="{ name: 'obra', params:{ oid: obra.oid }  }">
          <v-img :src="obra.portada">
            <v-layout align-end justify-center fill-height>
              <v-spacer></v-spacer>
              <v-card-text class="home-obra-titulo">
                {{ obra.titulo }}
              </v-card-text>
            </v-layout>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('teatro', ['obras'])
  }
}
</script>

<style>

.home-titulo {
  font-family: 'Great Vibes', cursive;
  font-size: 2rem;
  color: #553f75;
  text-shadow: 2px 2px 5px #918d8d;
}

.home-obra-titulo {
  font-size: 2.4rem;
  color: white;
  opacity: 0.9;
  vertical-align: end;
}

</style>
