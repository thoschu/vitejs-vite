import { webLlm } from 'math-lib';

let counter = 0;

export function setupCounter(element, input, button, result) {
  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };

  const setText = (text) => {
    result.innerHTML = text;
  };

  element.addEventListener('click', () => setCounter(counter + 1));

  button.addEventListener('click', () => {
    const text = input.value;

    if (text.length !== 0) {
      button.disabled = true;

      result.innerHTML = '🄻 🄾 🄰 🄳 🄸 🄽 🄶';

      result.classList.add('animate__heartBeat', 'animate__slow', 'animate__infinite');

      webLlm(text).then((reply) => {
        setText(reply.choices[0].message.content);

        result.classList.remove('animate__heartBeat', 'animate__slow', 'animate__infinite');

        button.disabled = false;

        input.value = '';

        input.disabled = false;
      }).catch((error) => {
        console.error(error);

        result.innerHTML = '...';
        result.classList.remove('animate__heartBeat', 'animate__slow', 'animate__infinite');
        button.disabled = false;
        input.value = '';
        input.disabled = false;
      });

      input.disabled = true;
    } else {
      input.focus();

      setText('Bitte eine Eingabe machen...');
    }


  });

  setCounter(0);
}
