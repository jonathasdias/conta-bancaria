function acrescentarZero(num) {
    if (num < 10) {
        return "0"+num
    } else {
        return num
    }
}

class DataHora {
    constructor(){
        this.dataObj = new Date()
    }

    get data(){
        let dia = this.dataObj.getDate()
        let mes = this.dataObj.getMonth() +1
        let ano = this.dataObj.getFullYear()

        return `${acrescentarZero(dia)}/${acrescentarZero(mes)}/${ano}`
    }

    get horas(){

        let hora = this.dataObj.getHours()
        let minuto = this.dataObj.getMinutes()

        return `${acrescentarZero(hora)}:${acrescentarZero(minuto)}`
    }
}
export default DataHora