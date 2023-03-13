let inputValorSaque = document.querySelector('[data-input-sacar]');
let inputValorDeposito = document.querySelector('[data-input-depositar]');
let spanSaldo = document.querySelector('.saldo');

let dv_depositar = document.getElementById('dv-depositar');
let dv_sacar = document.getElementById('dv-sacar');
let dv_extrato = document.getElementById('dv-extrato');

let btnsChamarCards = document.querySelectorAll('.btns');

let btnFecharCard = document.querySelectorAll('.btn-fechar')
let btnsCard = document.querySelectorAll('.btns-card');

let card_extrato = document.getElementById('card-extrato')

let valorAtual = 0;

function depositar(){
    valorAtual += parseFloat(inputValorDeposito.value)
    spanSaldo.innerHTML = parseFloat(valorAtual).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

function sacar(){
    if (inputValorSaque.value > valorAtual) {
        alert('Você Não Pode Sacar Mais Do Que Você Tem Na Conta. Faça Um Novo Saque.')
    } else if(inputValorSaque.value <= valorAtual) {
        valorAtual -= inputValorSaque.value
        spanSaldo.innerHTML = parseFloat(valorAtual).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
}

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

function criarStrato({valor,cor,estado}){
    // valorInput, estadoValor
    let dataHora = new DataHora();

    let extrato = document.createElement('div')
    extrato.classList.add('extrato')
    
    let dv_estados_extrato = document.createElement('div')
    dv_estados_extrato.classList.add('dv-estados-extrato')

    let dv_dataHora_extrato = document.createElement('div')
    dv_dataHora_extrato.classList.add('dv-dataHora-extrato')

    let valor_extrato = document.createElement('span')
    valor_extrato.classList.add('valor-extrato')
    valor_extrato.style.color = cor
    valor_extrato.innerHTML = parseFloat(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    let estado_extrato = document.createElement('span')
    estado_extrato.classList.add('estado-extrato')
    estado_extrato.innerHTML = estado

    let data_extrato = document.createElement('span')
    data_extrato.classList.add('data-extrato')
    data_extrato.innerHTML = dataHora.data

    let hora_extrato = document.createElement('span')
    hora_extrato.classList.add('hora-extrato')
    hora_extrato.innerHTML = dataHora.horas

    dv_dataHora_extrato.appendChild(data_extrato)
    dv_dataHora_extrato.appendChild(hora_extrato)

    dv_estados_extrato.appendChild(valor_extrato)
    dv_estados_extrato.appendChild(estado_extrato)
    
    extrato.appendChild(dv_dataHora_extrato)
    extrato.appendChild(dv_estados_extrato)
    
    card_extrato.appendChild(extrato)
}

// Controle de esconder divs
btnsChamarCards.forEach((btn)=>{
    btn.addEventListener('click', function(){
        if(this.classList.contains('btn-depositar')){

            dv_sacar.classList.add('esconder')
            dv_extrato.classList.add('esconder')
            dv_depositar.classList.remove('esconder')
            inputValorDeposito.focus()

        } else if(this.classList.contains('btn-extratos')){

            dv_sacar.classList.add('esconder')
            dv_depositar.classList.add('esconder')
            dv_extrato.classList.remove('esconder')
            
        } else if(this.classList.contains('btn-sacar')){

            dv_depositar.classList.add('esconder')
            dv_extrato.classList.add('esconder')
            dv_sacar.classList.remove('esconder')
            inputValorSaque.focus()

        }
    })
});

let coresExtrato = {
    extratoDeposito: {
        valor: inputValorDeposito.value,
        cor:'green',
        estado: 'Dinheiro Depositado'
    },
    extratoSaque: {
        valor: inputValorSaque.value,
        cor:'red',
        estado: 'Dinheiro Sacado'
    }
}

// Controle de funcionalidades das divs
btnsCard.forEach((btn)=>{
    btn.addEventListener('click', function(){

        // caso forem os btns especificados nos ifs e se o input dele for maior que 0 chama o if, caso contrario não daz nada.
        // btn.classList.contains('btn-card-depositar') && input.value > 0
        // criar uma função de validação do input caso ele esteja vazio, ele n fazer nada para n retornar NaN, e char essa
        // função aqui nos evento de click desses botões abaixo.
        if(btn.classList.contains('btn-card-depositar')){

            depositar()
            criarStrato(coresExtrato.extratoDeposito)
            console.log(coresExtrato.extratoDeposito.valor);
            inputValorDeposito.value = ''
            inputValorDeposito.focus()

        } else if(btn.classList.contains('btn-card-sacar')) {
    
            sacar()
            criarStrato(coresExtrato.extratoSaque)
            inputValorSaque.value = ''
            inputValorSaque.focus()
        }
    })
})

btnFecharCard.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        btn.parentNode.parentNode.classList.add('esconder')
    })
})