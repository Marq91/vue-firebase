<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-slide-x-transition mode="out-in" @enter="enter">
                <!-- Seccion Registro -->
                <v-card v-if="vista == 1" :key="1" class="elevation-7">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Regístrate
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="subheading text-xs-center">
                        Regístrate con tu red social preferida
                    </v-card-text>
                    <v-card-text>
                        <v-layout justify-center>
                            <a @click="siguiente(1, 'facebook.com')" class="mx-3">
                                <v-avatar tile :size="40">
                                    <img alt="Ingreso Facebook" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M483.7 0H28.3C12.7 0 0 12.7 0 28.3v455.5C0 499.3 12.7 512 28.3 512h245.2V314H207v-77.5h66.5v-57c0-66.1 40.4-102.1 99.4-102.1 28.3 0 52.5 2.1 59.6 3v69.1h-40.7c-32.1 0-38.3 15.3-38.3 37.6v49.4h76.7l-10 77.5h-66.7v198h130.2c15.6 0 28.3-12.7 28.3-28.3V28.3C512 12.7 499.3 0 483.7 0z' fill='%234267b2'/><path d='M353.5 512V314h66.8l10-77.5h-76.8v-49.4c0-22.4 6.2-37.6 38.3-37.6h40.7V80.4c-7.1-.9-31.4-3-59.6-3-59 0-99.4 36-99.4 102.1v57H207V314h66.5v198h80z' fill='%23fff'/></svg>">
                                </v-avatar>
                            </a>
                            <a @click="siguiente(1, 'google.com')" class="mx-3">
                                <v-avatar tile :size="40">
                                    <img alt="Ingreso Google" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M113.47 309.408L95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z' fill='%23fbbb00'/><path d='M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z' fill='%23518ef8'/><path d='M416.253 455.624l.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z' fill='%2328b446'/><path d='M419.404 58.936l-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z' fill='%23f14336'/></svg>">
                                </v-avatar>
                            </a>
                        </v-layout>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text class="subheading text-xs-center">
                        Regístrate con una cuenta de email y contraseña
                    </v-card-text>
                    <v-card-text>
                        <v-text-field @blur="$v.f1.email.$touch()" :error-messages="erroresEmail" v-model="f1.email" label="Email"></v-text-field>
                        <v-text-field @blur="$v.f1.password.$touch()" :error-messages="erroresPassword" v-model="f1.password" label="Password" type="password"></v-text-field>
                        <v-text-field @keyup.enter="siguiente(1, 'password')" @blur="$v.f1.repetirPassword.$touch()" :error-messages="erroresRepetirPassword" v-model="f1.repetirPassword" label="Repetir Password" type="password"></v-text-field>
                    </v-card-text>
                    <v-card-text>
                        <v-layout justify-end>
                            <v-btn :drepressed="$v.f1.$invalid" :disabled="$v.f1.$invalid" @click="siguiente(1, 'password')" color="secondary">Siguiente</v-btn>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :to="{ name: 'login' }" flat color="secondary">
                            ¿Ya tienes cuenta? Ingresa.
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <!-- Seccion Nombres -->
                <v-card v-if="vista == 2" :key="2" class="elevation-7">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Ingresa tus Nombres y Apellidos
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field @blur="$v.f2.nombres.$touch()" autofocus :error-messages="erroresNombres" v-model="f2.nombres" label="Nombres"></v-text-field>
                        <v-text-field @keyup.enter="siguiente(2)" @blur="$v.f2.apellidos.$touch()" :error-messages="erroresApellidos" v-model="f2.apellidos" label="Apellidos"></v-text-field>
                    </v-card-text>
                    <v-card-text>
                        <v-layout>
                            <v-flex xs6>
                                <v-layout justify-start>
                                    <v-btn @click="vista--">Atrás</v-btn>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6>
                                <v-layout justify-end>
                                    <v-btn @click="siguiente(2)" :drepressed="$v.f2.$invalid" :disabled="$v.f2.$invalid" color="secondary">Siguiente</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
                <!-- Seccion Calendario -->
                <v-card v-if="vista == 3" :key="3" class="elevation-7">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Selecciona tu Fecha de Nacimiento
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-layout justify-center>
                            <v-date-picker ref="calendario" :max="fechaMaxima" v-model="fechaNacimiento" reactive locale="es-cl" class="elevation-5"></v-date-picker>
                        </v-layout>
                    </v-card-text>
                    <v-card-text>
                        <v-layout>
                            <v-flex xs6>
                                <v-layout justify-start>
                                    <v-btn @click="vista--">Atrás</v-btn>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6>
                                <v-layout justify-end>
                                    <v-btn @click="registrar" :drepressed="$v.fechaNacimiento.$invalid" :disabled="$v.fechaNacimiento.$invalid" color="secondary">Registrarse</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>    
            </v-slide-x-transition>
        </v-flex>
    </v-layout>
</template>

<script>

import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import { nombreCompuesto } from '@/utilidades/validaciones'
import { mapMutations, mapGetters } from 'vuex'
import { firebase, auth, db } from '@/firebase' 

export default {
    data() {
        return {
            metodo: 'password',
            vista: 1,
            f1: {
                email: '',
                password: '',
                repetirPassword: ''
            },
            f2: {
                nombres: '',
                apellidos: ''
            },
            fechaNacimiento: null,
            fechaMaxima: null
        }
    },
    validations: {
        f1: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(20)
            },
            repetirPassword: {
                sameAs: sameAs('password')
            }
        },
        f2: {
            nombres: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(20),
                nombreCompuesto
            },
            apellidos: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(20),
                nombreCompuesto
            }
        },
        fechaNacimiento: {
            required
        }
    },
    created() {
        let fechaActual = new Date()
        this.fechaMaxima = new Date(fechaActual.setFullYear(fechaActual.getFullYear() -13))
            .toISOString()
            .substr(0, 10)
        
        if (auth.currentUser && !this.$store.state.sesion.usuario) {
            //evaluar si el metodo es por email, google o facebook
            this.metodo = auth.currentUser.providerData[0].providerId
            this.vista = 2
            this.$store.commit('mostrarInformacion', 'Completa tus datos de registro.')
        }
    },
    methods: {
        ...mapMutations(['mostrarOcupado', 'ocultarOcupado', 'mostrarExito', 'mostrarError', 'mostrarAdvertencia']),
        ...mapMutations('sesion', ['actualizarUsuario']),
        siguiente(vista, metodo) {
            switch (vista) {
                case 1:
                    if (this.$v.f1.$invalid && metodo == 'password') {
                        this.$v.f1.$touch()
                        return
                    }
                    else{
                        this.metodo = metodo
                        this.vista++
                    }
                    break
                case 2:
                    if (this.$v.f2.$invalid) {
                        this.$v.f2.$touch()
                        return
                    }
                    else{
                        this.vista++
                    }
                    break
            }
        },
        async registrar() {
            if (this.$v.fechaNacimiento.$invalid) { return }

            switch (this.metodo) {
                case 'password':
                    this.registrarEmail()
                    break

                case 'facebook.com':
                    this.registrarFacebook()
                    break

                case 'google.com':
                    this.registrarGoogle()
                    break    
            }

        },
        async registrarEmail() {
            try {   //Cred: credencial | uid: user id
                this.mostrarOcupado({ titulo: 'Creando Registro', mensaje: 'Estamos registrando tu información...' })

                let uid = null

                if (auth.currentUser) {
                    uid = auth.currentUser.uid
                }
                else {
                    let cred = await auth.createUserWithEmailAndPassword(this.f1.email, this.f1.password)
                    uid = cred.user.uid
                }

                await this.guardarUsuario(uid)             
                
                //solicitud verificacion email firebase | awai para esperar la verificacion
                await auth.currentUser.sendEmailVerification()

                this.$router.push( { name: 'envio-verificacion-email' } ) 
            } 
            catch (error) {
                
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        this.mostrarAdvertencia('Ya se ha registrado esta direccion de email con anterioridad.')
                        break
                
                    default:
                        this.mostrarError('Ocurrio un error registrando tu cuenta. Intentalo más tarde.')
                        break
                }
            }
            finally {
                this.ocultarOcupado()
            }
        },
        async registrarFacebook() {
            let provider = new firebase.auth.FacebookAuthProvider()

            provider.setCustomParameters({
                'display': 'popup'
            })

            auth.languageCode = 'es_CO'

            try {
                let uid = null

                if (auth.currentUser) {
                    uid = auth.currentUser.uid
                }
                else {
                    let cred = await auth.signInWithPopup(provider)
                    uid = cred.user.uid
                }

                await this.guardarUsuario(uid)

                this.$router.push({ name: 'home'})
            } 
            catch (error) {
                this.mostrarError('Ocurrió un error registrando tu cuenta.')
                
                //...Falta manejar los errores con switch-case docs firebase signInWithPopup errors

            }
        },
        async registrarGoogle() {
            let provider = new firebase.auth.GoogleAuthProvider()

            provider.setCustomParameters({
                'display': 'popup'
            })

            auth.languageCode = 'es_CO'

            try {
                let uid = null

                if (auth.currentUser) {
                    uid = auth.currentUser.uid
                }
                else {
                    let cred = await auth.signInWithPopup(provider)
                    uid = cred.user.uid
                }

                await this.guardarUsuario(uid)
                
                this.$router.push({ name: 'home'})
            } 
            catch (error) {
                this.mostrarError('Ocurrió un error registrando tu cuenta.')
                
            }
        },
        enter() {
            if (this.vista == 3 && !this.fechaNacimiento) {
                this.$refs.calendario.activePicker = 'YEAR'
            }
        },
        async guardarUsuario(uid) {
            let usuario = {
                    uid,
                    userName: 'newton',
                    nombres: this.f2.nombres,
                    apellidos: this.f2.apellidos,
                    fechaNacimiento: new Date(this.fechaNacimiento) ,
                    sexo: 'M',
                    fotoPerfil: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg/330px-Sir_Isaac_Newton_%281643-1727%29.jpg'
                }

                //Almacenar objeto como un documento en la coleccion que esta en la BD
                await db.collection('usuarios')
                    .doc(usuario.uid)
                    .set(usuario)

                //Una vez guardado actualizar la sesion
                this.actualizarUsuario(usuario)
                this.mostrarExito(this.saludo)
        }
    },
    computed: {
        ...mapGetters('sesion', ['saludo']),
        erroresEmail() { //Errores f1
            let errores = []
            if(!this.$v.f1.email.$dirty) { return errores }
            if(!this.$v.f1.email.required) { errores.push('Ingresa tu email.') }
            if(!this.$v.f1.email.email) { errores.push('Ingresa un email valido.') }
            return errores
        },
        erroresPassword() {
            let errores = []
            if(!this.$v.f1.password.$dirty) { return errores }
            if(!this.$v.f1.password.required) { errores.push('Ingresa tu password.') }
            if(!this.$v.f1.password.minLength) { errores.push('Ingresa almenos 6 caracteres.') }
            if(!this.$v.f1.password.maxLength) { errores.push('Ingresa máximo 20 caracteres.') }
            return errores
        },
        erroresRepetirPassword() {
            let errores = []
            if(!this.$v.f1.repetirPassword.$dirty) { return errores }
            if(!this.$v.f1.repetirPassword.sameAs) { errores.push('Las contraseñas no coinciden.') }
            return errores
        },
        erroresNombres() { //Errores f2
            let errores = []
            if(!this.$v.f2.nombres.$dirty) { return errores }
            if(!this.$v.f2.nombres.required) { errores.push('Ingresa tu nombre.') }
            if(!this.$v.f2.nombres.minLength) { errores.push('Ingresa al menos 3 caracteres.') }
            if(!this.$v.f2.nombres.maxLength) { errores.push('Ingresa máximo 20 caracteres.') }
            if(!this.$v.f2.nombres.nombreCompuesto) { errores.push('Ingresa un nombre válido.') }
            return errores
        },
        erroresApellidos() { //Errores f2
            let errores = []
            if(!this.$v.f2.apellidos.$dirty) { return errores }
            if(!this.$v.f2.apellidos.required) { errores.push('Ingresa tu apellido.') }
            if(!this.$v.f2.apellidos.minLength) { errores.push('Ingresa al menos 3 caracteres.') }
            if(!this.$v.f2.apellidos.maxLength) { errores.push('Ingresa máximo 20 caracteres.') }
            if(!this.$v.f2.apellidos.nombreCompuesto) { errores.push('Ingresa un apellido válido.') }
            return errores
        }
    }
}
</script>
