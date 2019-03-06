<template>
    <div class="seccion">
        <div class="atributo">
            <!-- @ inicia el evento -->
            <input v-model="email" @keyup.enter="actualizarEmail" type="text">
        </div>
    </div>
</template>

<script>
export default {
    props: ['emailRecibido'],
    data() {
        return {
            email: ''
        }
    },
    methods: {
        actualizarEmail(event) {
            //Emit es Comunicacion hacia el padre
            this.$emit('onCambioEmail', this.email)
        }
    },
    watch: {
        emailRecibido() {
            this.email = this.emailRecibido
        }
    }
}
</script>

<style>

.email {
    text-align: left;
}

</style>

