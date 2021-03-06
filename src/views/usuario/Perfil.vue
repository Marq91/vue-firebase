<template>
    <v-layout text-xs-center align-start justify-center class="mt-5">
        <v-card v-if="usuario" class="elevation-6" max-width="250">
            <v-btn @click="editando = !editando" color="secondary" class="elevation-1" fab small absolute top right>
                <v-fade-transition mode="out-in">
                    <v-icon v-if="!editando" :key="1">edit</v-icon>
                    <v-icon v-else :key="2">close</v-icon>
                </v-fade-transition>
            </v-btn>
            <v-card-text>
                <v-layout justify-center>
                    <v-btn @click="editarNombresApellidos" v-if="editando" color="secondary" flat icon small>
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <div class="ma-2">
                        {{ usuario.nombres + ' ' + usuario.apellidos }}
                    </div>
                </v-layout>
                <!--Utilizar el componente v-img de Vuetify si este no llegara a cargar -->
                <v-img class="ma-2 fotoPerfil" :src="usuario.fotoPerfil" alt=""></v-img>
                <v-layout justify-center>
                    <v-btn @click="editarDescripcion" v-if="editando" color="secondary" flat icon small>
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <div class="ma-2 descripcion">
                        <span v-if="usuario.descripcion"> {{ usuario.descripcion }} </span>
                        <span v-else>Agrega una descripcion</span>
                    </div>
                </v-layout>
                <v-layout justify-center>
                    <v-btn @click="editarBiografia" v-if="editando" color="secondary" flat icon small>
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <div class="ma-2">
                        <a v-if="usuario.biografia" :href="usuario.biografia" target="_blank" class="ma-2 link">Biografia</a>
                        <span v-else>Ingresa tu biografia</span>
                    </div>
                </v-layout>
            </v-card-text>
        </v-card>
        <!-- Nombres y Apellidos -->
        <v-dialog v-model="editandoNombresApellidos" max-width="400">
                <v-card>
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Ingresa tus Nombres y Apellidos
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field @blur="$v.f2.nombres.$touch()" autofocus :error-messages="erroresNombres" v-model="f2.nombres" label="Nombres"></v-text-field>
                        <v-text-field @blur="$v.f2.apellidos.$touch()" :error-messages="erroresApellidos" v-model="f2.apellidos" label="Apellidos"></v-text-field>
                    </v-card-text>
                    <v-card-text>
                        <v-layout>
                            <v-flex xs6>
                                <v-layout justify-start>
                                    <v-btn @click="editandoNombresApellidos">Cancelar</v-btn>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6>
                                <v-layout justify-end>
                                    <v-btn @click="guardandoNombresApellidos" :drepressed="$v.f2.$invalid" :disabled="$v.f2.$invalid" color="secondary">Guardar</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
        </v-dialog>
        <!-- Descripcion -->
        <v-dialog v-model="editandoDescripcion" max-width="400">
                <v-card>
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Ingresa una Descripción
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-textarea label="Agrega una descripción." v-model="edicionDescripcion" counter="300" autofocus :error-messages="erroresDescripcion"></v-textarea>
                    </v-card-text>
                    <v-card-text>
                        <v-layout>
                            <v-flex xs6>
                                <v-layout justify-start>
                                    <v-btn @click="editandoDescripcion = false">Cancelar</v-btn>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6>
                                <v-layout justify-end>
                                    <v-btn @click="guardarDescripcion" :drepressed="$v.edicionDescripcion.$invalid" :disabled="$v.edicionDescripcion.$invalid" color="secondary">Guardar</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
        </v-dialog>

        <!-- Biografia -->
        <v-dialog v-model="editandoBiografia" max-width="400">
                <v-card>
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Ingresa tu Biografia
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field @blur="$v.edicionBiografia.$touch()" autofocus :error-messages="erroresBiografia" v-model="edicionBiografia" label="Biografia"></v-text-field>
                    </v-card-text>
                    <v-card-text>
                        <v-layout>
                            <v-flex xs6>
                                <v-layout justify-start>
                                    <v-btn @click="editandoBiografia = false">Cancelar</v-btn>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6>
                                <v-layout justify-end>
                                    <v-btn @click="guardarBiografia" :drepressed="$v.edicionBiografia.$invalid" :disabled="$v.edicionBiografia.$invalid" color="secondary">Guardar</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { required, minLength, maxLength, url } from 'vuelidate/lib/validators'
import { nombreCompuesto } from '@/utilidades/validaciones'
import { mapState, mapMutations } from 'vuex'
import { db } from '@/firebase'

export default {
    data() {
        return {
            editando: false,
            editandoNombresApellidos: false,
            f2: {
                nombres: '',
                apellidos: ''
            },
            editandoDescripcion: false,
            edicionDescripcion: '',
            editandoBiografia: false,
            edicionBiografia: ''
        }
    },
    validations: {
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
        edicionDescripcion: {
            maxLength: maxLength(300)
        },
        edicionBiografia: {
            url
        }
    },
    methods: {
        ...mapMutations(['mostrarExito', 'mostrarError', 'mostrarOcupado', 'ocultarOcupado' ]),
        ...mapMutations('sesion', ['actualizarNombresApellidos', 'actualizarDescripcion', 'actualizarBiografia']),
        editarNombresApellidos() {
            this.f2.nombres = this.usuario.nombres
            this.f2.apellidos = this.usuario.apellidos
            this.editandoNombresApellidos = true
        },
        async guardandoNombresApellidos() { // El primer if valida si el nombre es igual que no realice ninguna accion
            if (this.f2.nombres == this.usuario.nombres && this.f2.apellidos == this.usuario.apellidos) {
                this.editandoNombresApellidos = false
                return
            }

            this.mostrarOcupado({ titulo: 'Actualizando información', mensaje: 'Estamos guardando tus nombres y apellidos'})

            try { //avisando a la BD que se esta actualizando
                await db.collection('usuarios')
                        .doc(this.usuario.uid)
                        .update({ nombres: this.f2.nombres, apellidos: this.f2.apellidos })

                this.actualizarNombresApellidos({ nombres: this.f2.nombres, apellidos: this.f2.apellidos })
                this.editandoNombresApellidos = false
                this.editando = false  

            } catch (error) {
                this.mostrarError('Ocurrio un error actualizando tus datos.')
            }
            finally {
                this.ocultarOcupado()
            }
        },
        editarDescripcion() {
            this.edicionDescripcion = this.usuario.descripcion || ''
            this.editandoDescripcion = true
        },
        async guardarDescripcion() {
            if (this.edicionDescripcion == this.usuario.descripcion) {
                this.editandoDescripcion = false
                return
            }

            this.mostrarOcupado({ titulo: 'Actualizando Información', mensaje: 'Estamos guardando la descripción...' })

            try {
                await db.collection('usuarios')
                        .doc(this.usuario.uid)
                        .update({ descripcion: this.edicionDescripcion })
            
                this.actualizarDescripcion(this.edicionDescripcion)

                this.editandoDescripcion = false
                this.editando = false
            } catch (error) {
                this.mostrarError('Ocurrio un error actualizando tus datos.')
            }
            finally {
                this.ocultarOcupado()
            }
        },
        editarBiografia() {
            this.edicionBiografia = this.usuario.biografia || ''
            this.editandoBiografia = true
        },
        async guardarBiografia() {
            if (this.edicionBiografia == this.usuario.biografia) {
                this.editandoBiografia = false
                return
            }

            this.mostrarOcupado({ titulo: 'Actualizando Informacion', mensaje: 'Estamos actualizando la biografia...' })

            try {
                await db.collection('usuarios')
                        .doc(this.usuario.uid)
                        .update({ biografia: this.edicionBiografia })
            
                this.actualizarBiografia(this.edicionBiografia)

                this.editandoBiografia = false
                this.editando = false

                this.mostrarExito('Se actualizo la biografia crrectamente.')

            } catch (error) {
                this.mostrarError('Ocurrio un error actualizando tus datos.')
            }
            finally {
                this.ocultarOcupado()
            }
        }
    },
    computed: {
        ...mapState('sesion', ['usuario']),
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
        },
        erroresDescripcion() {
            let errores = []
            if(!this.$v.edicionDescripcion.$dirty) { return errores }
            if(!this.$v.edicionDescripcion.maxLength) { errores.push('Ingresa máximo 300 caracteres.') }
            return errores
        },
        erroresBiografia() {
            let errores = []
            if(!this.$v.edicionBiografia.$dirty) { return errores }
            if(!this.$v.edicionBiografia.url) { errores.push('Ingresa una url valida.') }
            return errores
        }
    }
}
</script>


<style>
.fotoPerfil {
    width: 200px;
    height: 100%;
}

.descripcion {
    text-align: justify;
}

.link {
    text-decoration: none;
    font-size: 1rem;
    color: #553f75;
}

</style>
