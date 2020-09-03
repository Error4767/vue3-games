<template>
  <div class="calculator">
    <div class='buttons-area'>
      <div class='result' style='grid-area: result;'>{{state.result}}</div>
      <button @click='clear' style='grid-area: ac;' >AC</button>
      <button @click='plusMinus' style='grid-area: plus-minus;' >±</button>
      <button @click='inputMathSymbol("%")' style='grid-area: percent;' >%</button>
      <button @click='inputMathSymbol("+")' style='grid-area: add;' >+</button>
      <button @click='inputMathSymbol("-")' style='grid-area: subtract;' >-</button>
      <button @click='inputMathSymbol("×")' style='grid-area: multiply;' >×</button>
      <button @click='inputMathSymbol("÷")' style='grid-area: divide;' >÷</button>
      <button @click='calculate' style='grid-area: equal;' >=</button>
      <button style='grid-area: num-1;' @click='inputNumber("1")'>1</button>
      <button style='grid-area: num-2;' @click='inputNumber("2")'>2</button>
      <button style='grid-area: num-3;' @click='inputNumber("3")'>3</button>
      <button style='grid-area: num-4;' @click='inputNumber("4")'>4</button>
      <button style='grid-area: num-5;' @click='inputNumber("5")'>5</button>
      <button style='grid-area: num-6;' @click='inputNumber("6")'>6</button>
      <button style='grid-area: num-7;' @click='inputNumber("7")'>7</button>
      <button style='grid-area: num-8;' @click='inputNumber("8")'>8</button>
      <button style='grid-area: num-9;' @click='inputNumber("9")'>9</button>
      <button style='grid-area: num-0;' @click='inputNumber("0")'>0</button>
      <button style='grid-area: dot;' @click='inputMathSymbol(".")'>.</button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      result: '0',
      isMathSymbol: false
    });
    function inputNumber(num) {
      if(state.result === '0') {
        state.result = num;
      }else {
        state.result += num;
      }
      
      state.isMathSymbol = false;
    }
    function inputMathSymbol(mathSymbol) {
      //上次输入符号就允许输入符号
      if(!state.isMathSymbol) {
        state.result += mathSymbol;
        state.isMathSymbol = true;
      }
    }
    function calculate() {
      const expression = state.result;
      const result = parseFloat(eval(expression.replace(/×/g, '*').replace(/÷/g, '/')).toFixed(8)).toString();
      state.result = result;
    }
    function clear() {
      state.result = '0';
    }
    function plusMinus() {
      if(!state.isMathSymbol) {
        state.result = state.result * -1;
      }
    }
    return {
      state,
      clear,
      inputNumber,
      plusMinus,
      inputMathSymbol,
      calculate
    };
  }
};
</script>
  
<style scoped>
.calculator {
  --button-width: 80px;
  --button-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: inline-block;
}
.result {
  text-align: right;
  line-height: var(--button-height);
  font-size: 48px;
  font-family: Helvetica;
  margin-right: 24px;
}
.buttons-area {
  display: grid;
  background-color: #eee;
  grid-template-areas: 
  'result result result result'
  'ac plus-minus percent divide'
  'num-7 num-8 num-9 multiply'
  'num-4 num-5 num-6 subtract'
  'num-1 num-2 num-3 add'
  'num-0 num-0 dot equal'
  ;
  
  grid-template-columns: repeat(4, var(--button-width));
  grid-template-rows: repeat(6, var(--button-height));
  box-shadow: -8px -8px 16px -10px rgb(255, 255, 255, 1), 8px 8px 16px -10px rgb(0, 0, 0, 0.15);

  padding: 24px;
  border-radius: 20px;
}
.calculator button {
  display: block;
  margin: 8px;
  padding: 0;
  border: 0;
  outline: none;
  border-radius: calc(var(--button-height) / 2);
  font-size: 24px;
  font-family: Helvetica;
  color: #999;
  font-weight: normal;
  background: linear-gradient(135deg, rgba(230, 230, 230, 1) 0%, rgba(245, 245, 245, 1) 100%);
  box-shadow: -4px -4px 10px -8px rgba(255, 255, 255, 1), 4px 4px 10px -8px rgba(0, 0, 0, .3);
}
.calculator button:active {
  box-shadow: -4px -4px 10px -8px rgba(255, 255, 255, 1), 4px 4px 10px -8px rgba(0, 0, 0, .3) inset;
}
</style>