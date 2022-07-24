const body = document.querySelector('body');
const app = document.createElement('div');
app.classList.add('app');
body.appendChild(app);

const RenderContainer = (props) => {
  const container = document.createElement('div');
  container.classList.add('container');

  const h1 = document.createElement('h1');
  h1.innerText = 'RSS Виртуальная клавиатура';
  h1.classList.add('title');

  const textArea = document.createElement('textarea');
  textArea.classList.add('text_area');


  container.appendChild(h1);
  container.appendChild(textArea);

  return container;
};

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');


const renderText = () => {
  const div = document.createElement('div');
  const text = document.createElement('p');
  const text2 = document.createElement('p');
  text.innerText = 'Клавиатура создана в операционной системе Windows';
  text2.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
  div.classList.add('textEnd');
  div.appendChild(text);
  div.appendChild(text2);
  return div;
};

const RenderKeyboard = (data, activeKey, upKey, shift) => {
  keyboard.innerHTML = '';

  data.forEach((el) => {
    const key = document.createElement('div');
    key.classList.add('key');
    const value = Object.values(el)[0];
    const id = Object.keys(el)[0];

    key.id = id;

    if (value === 'Backspace') key.classList.add('backspace');
    if (value === 'Tab') key.classList.add('tab');
    if (value === 'CapsLock') key.classList.add('capsLock');
    if (value === 'Enter') key.classList.add('enter');
    if (value === 'Ctrl') key.classList.add('ctrl');
    if (value === 'Alt') key.classList.add('alt');
    if (value === 'Win') key.classList.add('win');
    if (value === 'Shift') key.classList.add('shift');
    if (value === 'Del') key.classList.add('del');
    key.innerText = `${value}`;
    if (value === ' ') {
      key.classList.add('space');
      key.innerText = ` `;
    }

    if (upKey === true && value === 'CapsLock') key.classList.add('active_key');
    if (activeKey === 'ShiftLeft' && id === '16' && shift === 'on') key.classList.add('active_key');
    if (activeKey === 'ShiftRight' && id === '16_right' && shift === 'on') key.classList.add('active_key');


    keyboard.appendChild(key);
  });
};

const Render = (props, activeKey, upKey) => {
  app.appendChild(RenderContainer());
  app.appendChild(keyboard);
  RenderKeyboard(props, activeKey, upKey);
  keyboard.after(renderText());
};


switch (localStorage.getItem('language')) {
  case 'ru':
    Render(layoutRusDown);
    break;
  case 'ruUp':
    Render(layoutRusUp, 0, true);
    break;
  case 'en':
    Render(layoutEngDown);
    break;
  case 'enUp':
    Render(layoutEngUp, 0, true);
    break;
  default:
    Render(layoutEngDown);
    break;
}
