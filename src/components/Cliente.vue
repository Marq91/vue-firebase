<template>
    <div class="seccion">
        <div class="atributo">
            <span>{{ nombreCompleto }}</span>
        </div>
        <div class="atributo">
            <img :src="fotoPerfil" alt="">
        </div>
        <div class="atributo">
            <a :href="biografia" target="_blank">Biografia</a>
        </div>
        <div class="atributo">
            <span>Edad: {{ edad }}</span>
        </div>
        <div class="atributo">
            <span>{{ email }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['email'],
    data() {
        return {
            nombres: 'Isaac',
            apellidos: 'Newton',
            fechaNacimiento: new Date(1994, 9, 27),
            fotoPerfil: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg/330px-Sir_Isaac_Newton_%281643-1727%29.jpg',
            biografia: 'https://es.wikipedia.org/wiki/Isaac_Newton'
        }
    },  //Computed permite calcular o realizar operaciones con strings
    computed: {
        nombreCompleto(){
            return `${this.nombres} ${this.apellidos}`
        },
        edad() {
            return this.calcularEdad(this.fechaNacimiento)
        }
    },
    methods: {
        //Basicamente methods son funciones dentro de nuestro componente vue
        calcularEdad(fecha){
            let fechaActual = new Date()
            let diferencia = fechaActual - fecha
            //En el return convertir la fecha de Decimal a numero Entero
            return Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25))
        }
    },
    created() {
        //'emit' permite enviar datos desde el hijo hacia el componente padre
        this.$emit('onCambioEmail', 'newton@email.com')   
    }
}
</script>

<style scoped>


</style>
