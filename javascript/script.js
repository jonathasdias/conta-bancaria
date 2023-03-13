"use strict"
// import da data e da hora.
import DataHora from "./datahora.js";

const inputValorSaque = document.querySelector('[data-input-sacar]');
const inputValorDeposito = document.querySelector('[data-input-depositar]');
const spanSaldo = document.querySelector('.saldo');

const dv_depositar = document.getElementById('dv-depositar');
const dv_sacar = document.getElementById('dv-sacar');
const dv_extrato = document.getElementById('dv-extrato');

const btnsChamarCards = document.querySelectorAll('.btns');

const btnFecharCard = document.querySelectorAll('.btn-fechar')
const btnsCard = document.querySelectorAll('.btns-card');

const card_extrato = document.getElementById('card-extrato')

// Lembre de salvar o valorAtual no localStorage, se posiivel salvar os extratos também e colocar uma data limite,
// para os dados dos extratos serem removidos do localStorage
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

function criarStrato(saldo,{cor,estado}){
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
    valor_extrato.innerHTML = parseFloat(saldo).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    let estado_extrato = document.createElement('span')
    estado_extrato.classList.add('estado-extrato')
    estado_extrato.innerHTML = estado

    let data_extrato = document.createElement('span')
    data_extrato.classList.add('data-extrato')
    data_extrato.innerHTML = dataHora.data

    let hora_extrato = document.createElement('span')
    hora_extrato.classList.add('hora-extrato')
    hora_extrato.innerHTML = dataHora.horas

    dv_estados_extrato.appendChild(estado_extrato)
    dv_estados_extrato.appendChild(valor_extrato)

    dv_dataHora_extrato.appendChild(data_extrato)
    dv_dataHora_extrato.appendChild(hora_extrato)
    
    extrato.appendChild(dv_estados_extrato)
    extrato.appendChild(dv_dataHora_extrato)
    
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
        cor:'green',
        estado: 'Dinheiro Depositado'
    },
    extratoSaque: {
        cor:'red',
        estado: 'Dinheiro Sacado'
    }
}

// Controle de funcionalidades das divs
btnsCard.forEach((btn)=>{
    btn.addEventListener('click', function(){

        if(btn.classList.contains('btn-card-depositar') && inputValorDeposito.value > 0){

            depositar()
            criarStrato(inputValorDeposito.value, coresExtrato.extratoDeposito)
            inputValorDeposito.focus()
            inputValorDeposito.value = ''

        } else if(btn.classList.contains('btn-card-sacar') && inputValorSaque.value > 0) {
    
            sacar()
            criarStrato(inputValorSaque.value ,coresExtrato.extratoSaque)
            inputValorSaque.focus()
            inputValorSaque.value = ''

        }
    })
})

btnFecharCard.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        btn.parentNode.parentNode.classList.add('esconder')
    })
})