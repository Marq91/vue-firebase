<template>
  <div class="anuncio">
    <transition name="fade" mode="out-in">
      <span :key="indice">
        {{ presentaciones[indice] }}
      </span>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      presentaciones: [
        'Capitana Marvel - 20:30',
        'Green Book - 15:00',
        'El Vice Presidente - 16:00',
        'El Rey León - 22:00'
      ],
      indice: 0
    }
  },
  methods: {
    mostrarAnuncio() {
      this.indice++

      if(this.indice == this.presentaciones.length) {
        this.indice = 0
        //Se recomienda nunca destruirlo por nosotros mismos, sino que vue lo destruya el mismo: this.$destroy()
      }
    }
  },
  mounted() {
    setInterval(this.mostrarAnuncio, 3000)
  }
}
</script>

<style>
.anuncio {
  margin: 10px;
  font-size: 2.2rem;

  border-top-color: white;
  border-top-width: 1px;
  border-top-style: solid;

  border-bottom-color: white;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s ease-out;
}

.fade-leave-active {
  transition: opacity .6s ease-out;
  opacity: 0;
}

</style>
