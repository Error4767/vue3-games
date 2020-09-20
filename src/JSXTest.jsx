import { reactive } from 'vue';
const JSXTest = {
  setup() {
    const state = reactive({
      color: 'red',
      text: 'org'
    })
    return state;
  },
  render() {
    const { color, text } = this;
    return (
      <div style={
        {
          backgroundColor: color
        }
      }>
        <span>{text}</span>
        <span>num2</span>
      </div>
    )
  }
};
const JSXTest2 = {
  props: ['text2'],
  setup(props) {
    const state = reactive({
      color: 'red',
      text: 'org'
    });
    return () => {
      const { text2 } = props;
      return (
      <div
      style={
        {
          backgroundColor: state.color
        }
      }>
        <span>{state.text}</span>
        <span>{text2}</span>
      </div>
      )
    }
  }
};

export default {
  setup() {
    const state = reactive({
      text: '1'
    });
    return () => {
      return (
        <JSXTest2 text2={state.text}></JSXTest2>
      )
    }
  }
};