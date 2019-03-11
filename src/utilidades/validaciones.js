//Script para validar nombres. 
const nombreCompuesto = value => {
    if (value === undefined || value === null || value === '') {
        return true
    }// Regex | validacion con expresion regular
    return /^(?! )(?!.*  )[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/.test(value)
}
export { nombreCompuesto }