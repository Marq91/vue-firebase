<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <!-- Seccion Registro -->
                <v-card class="elevation-7">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Ingresa tus Credendiales
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="subheading text-xs-center">
                        Ingresa con tu red social preferida
                    </v-card-text>
                    <v-card-text>
                        <v-layout justify-center>
                            <a @click="ingresar('facebook')" class="mx-3">
                                <v-avatar tile :size="40">
                                    <img alt="Ingreso Facebook" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M483.7 0H28.3C12.7 0 0 12.7 0 28.3v455.5C0 499.3 12.7 512 28.3 512h245.2V314H207v-77.5h66.5v-57c0-66.1 40.4-102.1 99.4-102.1 28.3 0 52.5 2.1 59.6 3v69.1h-40.7c-32.1 0-38.3 15.3-38.3 37.6v49.4h76.7l-10 77.5h-66.7v198h130.2c15.6 0 28.3-12.7 28.3-28.3V28.3C512 12.7 499.3 0 483.7 0z' fill='%234267b2'/><path d='M353.5 512V314h66.8l10-77.5h-76.8v-49.4c0-22.4 6.2-37.6 38.3-37.6h40.7V80.4c-7.1-.9-31.4-3-59.6-3-59 0-99.4 36-99.4 102.1v57H207V314h66.5v198h80z' fill='%23fff'/></svg>">
                                </v-avatar>
                            </a>
                            <a @click="ingresar('google')" class="mx-3">
                                <v-avatar tile :size="40">
                                    <img alt="Ingreso Google" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M113.47 309.408L95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z' fill='%23fbbb00'/><path d='M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z' fill='%23518ef8'/><path d='M416.253 455.624l.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z' fill='%2328b446'/><path d='M419.404 58.936l-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z' fill='%23f14336'/></svg>">
                                </v-avatar>
                            </a>
                        </v-layout>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text class="subheading text-xs-center">
                        Ingresa con una cuenta de email y contraseña
                    </v-card-text>
                    <v-card-text>
                        <v-text-field label="Email" autofocus v-model="formulario.email" :error-messages="erroresEmail" @blur="$v.formulario.email.$touch()"></v-text-field>
                        <v-text-field label="Password" @keyup.enter="ingresar('email')" v-model="formulario.password" :error-messages="erroresPassword" @blur="$v.formulario.password.$touch" type="password"></v-text-field>
                    </v-card-text>
                    <v-card-text>
                        <v-layout justify-end>
                            <v-btn @click="ingresar('email')" :depressed="$v.formulario.$invalid" :disabled="$v.formulario.$invalid" color="secondary">Ingresar</v-btn>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="solicitudPassword = true" flat color="secondary">
                            ¿Olvidaste tu contraseña?
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn :to="{ name: 'registro' }" flat color="secondary">
                            ¿No tienes cuenta? Registrate.
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-dialog v-model="solicitudPassword" max-width="400" persistent>
                    <v-card>
                        <v-toolbar color="primary" dark card>
                            <v-toolbar-title>
                                Reestrablecer Contraseña
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text class="subheading">
                            Ingresa la dirección de email con la cual te registraste.
                        </v-card-text>
                        <v-card-text>
                            <v-text-field label="Email" autofocus v-model="emailEnvio" :error-messages="erroresEmailEnvio" @blur="$v.emailEnvio.$touch()"></v-text-field>
                        </v-card-text>
                        <v-card-text>
                            <v-layout>
                                <v-flex xs6>
                                    <v-layout justify-start>
                                        <v-btn @click="solicitudPassword = false">Cancelar</v-btn>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs6>
                                    <v-layout justify-end>
                                        <v-btn color="secondary" @click="enviarSolicitudPassword" :depressed="$v.emailEnvio.$invalid" :disabled="$v.emailEnvio.$invalid">Enviar</v-btn>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-dialog>
        </v-flex>
    </v-layout>
</template>

<script>

import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapMutations, mapGetters } from 'vuex'
import { firebase, auth } from '@/firebase' 


export default {
    data() {
        return {
          formulario: {
            email: '',
            password: ''
          },
          solicitudPassword: false,
          emailEnvio: ''
        }
    },
    validations: {
        formulario: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(20)
            }
        },
        emailEnvio: {
            required,
            email
        }
    },
    methods: {
        ...mapMutations(['mostrarOcupado', 'ocultarOcupado', 'mostrarExito', 'mostrarAdvertencia']),
        ...mapMutations('sesion', ['actualizarUsuario']),
        ingresar(metodo){
            switch (metodo) {
                case 'email':
                    this.ingresarEmail()
                    break
            
                case 'facebook':
                    this.ingresarFacebook()
                    break

                case 'google':
                    this.ingresarGoogle()
                    break    
            }
        },
        async ingresarEmail() {
            if (this.$v.formulario.$invalid) { 
                this.$v.formulario.$touch()
                return 
            }
            
            let ocupado = {
                titulo: 'Validando Credenciales',
                mensaje: 'Estamos validando tu información...'
            }

            this.mostrarOcupado(ocupado)

            try {
                await auth.signInWithEmailAndPassword(this.formulario.email, this.formulario.password)
               
            } 
            catch (error) {

                switch (error.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password': 
                        this.mostrarAdvertencia('Usuario no válido. Revisa tu correo y contraseña.')
                        break  
                
                    default:
                        this.mostrarError('Ocurrio un error validando la información.')
                        break
                }

            }
            finally {
                this.ocultarOcupado()
            }

        },
        async ingresarFacebook() {
            let provider = new firebase.auth.FacebookAuthProvider()

            provider.setCustomParameters({
                'display': 'popup'
            })

            auth.languageCode = 'es_CO'

            try {
                await auth.signInWithPopup(provider)

                this.mostrarExito(this.saludo)
                this.$router.push({ name: 'home'})
            } 
            catch (error) {
                this.mostrarError('Ocurrió un error validando tu informacion.')
                
                //...Falta manejar los errores con switch-case docs firebase signInWithPopup errors

            }
        },
        async ingresarGoogle() {
            let provider = new firebase.auth.GoogleAuthProvider()

            provider.setCustomParameters({
                'display': 'popup'
            })

            auth.languageCode = 'es_CO'

            try {
                await auth.signInWithPopup(provider)

                this.mostrarExito(this.saludo)
                this.$router.push({ name: 'home'})
            } 
            catch (error) {
                this.mostrarError('Ocurrió un error validando tu informacion.')
                
            }
        },
        async enviarSolicitudPassword() {
            this.solicitudPassword = false
            this.mostrarOcupado({ titulo: 'Enviando Solicitud', mensaje: 'Enviando solicitud de restablecimiento de contraseña...'})
            
            try {
                await auth.sendPasswordResetEmail(this.emailEnvio)
                this.mostrarExito('Se ha enviado la solicitud de restablecimiento de contraseña.')
            } 
            catch (error) {
                this.mostrarError('Ocurrio un error enviando la solicitud.')
            }
            finally {
                this.ocultarOcupado()
            }
        }
    },
    computed: {
        ...mapGetters('sesion', ['saludo']),
        erroresEmail() {
            let errores = []
            if(!this.$v.formulario.email.$dirty) { return errores }
            if(!this.$v.formulario.email.required) { errores.push('Ingresa tu email.') }
            if(!this.$v.formulario.email.email) { errores.push('Ingresa un email valido.') }
            return errores
        },
        erroresPassword() {
            let errores = []
            if(!this.$v.formulario.password.$dirty) { return errores }
            if(!this.$v.formulario.password.required) { errores.push('Ingresa tu password.') }
            if(!this.$v.formulario.password.minLength) { errores.push('Ingresa almenos 6 caracteres.') }
            if(!this.$v.formulario.password.maxLength) { errores.push('Ingresa máximo 20 caracteres.') }
            return errores
        },
        erroresEmailEnvio() {
            let errores = []
            if(!this.$v.emailEnvio.$dirty) { return errores }
            if(!this.$v.emailEnvio.required) { errores.push('Ingresa tu email.') }
            if(!this.$v.emailEnvio.email) { errores.push('Ingresa un email valido.') }
            return errores
        }
    }
}
</script>
