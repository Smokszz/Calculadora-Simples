const display = document.getElementById('display')
const numeros = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')

let novoNumero = true
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined

const operators = {
    ['/']: (x, y) => {atualizarDisplay(x / y)},
    ['+']: (x, y) => {atualizarDisplay(x + y)},
    ['-']: (x, y) => {atualizarDisplay(x - y)},
    ['*']: (x, y) => {atualizarDisplay(x * y)}
}

const calcular = () => {
  if(operacaoPendente()){
    const numeroAtual = parseFloat(display.textContent.replace(',', '.')) 
    novoNumero = true

    operators[operador](numeroAnterior, numeroAtual)
  }
}



const atualizarDisplay = (texto) => {
  if (novoNumero){
    display.textContent = texto.toLocaleString('BR');
    novoNumero = false
  }else {
    display.textContent += texto;
  }
}

const inserirNumero = (evento) => {
  if (display.textContent.length < 10){
    atualizarDisplay(evento.target.textContent)
  } 
}

numeros.forEach(numero => numero.addEventListener('click', inserirNumero))

const selecionarOperador = (evento) => {
  if (!novoNumero){
    calcular()
    novoNumero = true 
    operador = evento.target.textContent
    numeroAnterior = parseFloat(display.textContent.replace(',', '.')) 
  }
}

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador))

const acionarResultado = () => {
  calcular() 
  operador = undefined
}

document.getElementById('igual').addEventListener('click', acionarResultado)

const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay)

const limparCalculo = () => { 
  limparDisplay(); 
  operador = undefined
  novoNumero = true
  numeroAnterior = undefined
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo)

const removerUltimoNum = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNum)

const inverterSinal = () => {
  novoNumero = true
  atualizarDisplay(display.textContent * -1)

}
document.getElementById('inverter').addEventListener('click', inverterSinal)

const existeDecimal = () => display.textContent.indexOf(',') !== -1
const existeValor = () => display.textContent.length > 0;

const numDecimal = () => {
  if(!existeDecimal()){
    if(existeValor()){
      atualizarDisplay(',')
    }else {
      atualizarDisplay('0,')
    }
  }
}

document.getElementById('decimal').addEventListener('click', numDecimal)


const mapaTeclado = { 
  '0' : 'tecla0',
  '1' : 'tecla1',
  '2' : 'tecla2',
  '3' : 'tecla3',
  '4' : 'tecla4',
  '5' : 'tecla5',
  '6' : 'tecla6',
  '7' : 'tecla7',
  '8' : 'tecla8',
  '9' : 'tecla9',
  '+' : 'operadorAdicionar',
  '9' : 'tecla9',
  '9' : 'tecla9',
  '-' : 'operadorSubtrair',
  '*' : 'operadorMultiplicar',
  ',' : 'decimal',
  '/' : 'operadorDivisao',
  'c' : 'limparDisplay',
  '=' : 'igual',
  'Enter' : 'igual',
  'Backspace' : 'backspace',
  'Escape' : 'limparCalculo'
}

const limitarNumeros = () => {
  if (display.textContent.length < 9) {

  }
}

const mapearTeclado = (evento) => {
  const tecla = evento.key 
  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1
  if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click()
}

document.addEventListener('keydown', mapearTeclado)