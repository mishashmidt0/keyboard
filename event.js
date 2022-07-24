const textArea = document.querySelector('.text_area');
const pressed = new Set();
let language = 'en';
let upKey = false;
let shift = 'off';
switch (localStorage.getItem('language')) {
  case 'ru':
    language = 'ru';
    upKey = false;
    break;
  case 'ruUp':
    language = 'ruUp';
    upKey = true;
    break;
  case 'en':
    language = 'en';
    upKey = false;
    break;
  case 'enUp':
    language = 'enUp';
    upKey = true;
    break;
  default:
    language = 'en';
    upKey = false;
    break;
}
let selectionStart = null;
let selectionEnd = null;

const eventClick = (el) => {
  const id = el.path[0].id;
  const value = el.target.innerText;

  const activeKey = document.getElementById(`${id}`);

  if (id === '20' && upKey === false) {
    upKey = true;
    switch (language) {
      case 'en':
        language = 'enUp';
        localStorage.setItem('language', 'enUp');
        return RenderKeyboard(layoutEngUp, el.which, upKey);
      case 'ru':
        language = 'ruUp';
        localStorage.setItem('language', 'ruUp');
        return RenderKeyboard(layoutRusUp, el.which, upKey);
    }
  } else if (id === '20' && upKey === true) {
    upKey = false;
    switch (language) {
      case 'enUp':
        language = 'en';
        localStorage.setItem('language', 'en');
        return RenderKeyboard(layoutEngDown, el.which, upKey);
      case 'ruUp':
        language = 'ru';
        localStorage.setItem('language', 'ru');
        return RenderKeyboard(layoutRusDown, el.which, upKey);
    }
  }


  pressed.add(id);
  const [a, b] = [...pressed];
  if (a === '17' && b === '18') {
    switch (language) {
      case 'en':
        language = 'ru';
        localStorage.setItem('language', language);
        return RenderKeyboard(layoutRusDown);
      case 'ru':
        language = 'en';
        localStorage.setItem('language', language);
        return RenderKeyboard(layoutEngDown);

      case 'enUp':
        language = 'ruUp';
        localStorage.setItem('language', language);
        return RenderKeyboard(layoutRusUp, 0, true);
      case 'ruUp':
        language = 'enUp';
        localStorage.setItem('language', language);
        return RenderKeyboard(layoutEngUp, 0, true);
    }
  }

  if ((id === '16' || id === '16_right') && upKey === false) {
    switch (language) {
      case 'en':
        shift = 'on';

        return RenderKeyboard(layoutEngUp, el.code, upKey, shift);
      case 'ru':
        shift = 'on';

        return RenderKeyboard(layoutRusUp, el.code, upKey, shift);
    }
  } else if ((id === '16' || id === '16_right') && upKey === true) {
    switch (language) {
      case 'enUp':
        shift = 'on';
        return RenderKeyboard(layoutEngDown, el.code, upKey, shift);
      case 'ruUp':
        shift = 'on';
        return RenderKeyboard(layoutRusDown, el.code, upKey, shift);
    }
  }

  textArea.setAttribute('readonly', '');
  textArea.focus();


  const keycode1 = id;
  if (keycode1 === '0' || keycode1 === '9') {
    el.preventDefault();
    el.stopPropagation();
    textArea.value += '\t';
  }
  if (keycode1 === '0' || keycode1 === '9' || keycode1 === '17' || keycode1 === '18') {
    el.preventDefault();
    el.stopPropagation();
  }


  if (value === 'Alt' || value === 'Ctrl' || value === 'Tab' || value === 'CapsLock' || value === 'Shift') return '';

  if (value === 'Enter') return textArea.value += '\r\n';

  if (value === '>') {
    selectionStart++;
    return textArea.value += '>';
  }
  if (value === '<') {
    selectionStart++;
    return textArea.value += '<';
  }
  if (value === '∨') {
    selectionStart++;
    return textArea.value += '∨';
  }
  if (value === '∧') {
    selectionStart++;
    return textArea.value += '∧';
  }
  if (id === '32') {
    selectionStart++;
    return textArea.value += ' ';
  }
  if (id === '255') return ' ';


  if (selectionEnd === selectionStart) {
    selectionEnd = null;
  }

  if (value === 'Backspace' && !selectionEnd) {
    if (selectionStart === 0) return '';
    selectionStart--;
    return textArea.value = textArea.value.slice(0, selectionStart) + textArea.value.slice(selectionStart + 1, textArea.value.length);
  } else if (value === 'Backspace') {
    textArea.value = textArea.value.slice(0, selectionStart) + textArea.value.slice(selectionEnd, textArea.value.length - 1);
    return selectionEnd = null;
  }

  console.log(selectionStart);
  if (id === '46') {
    return textArea.value = textArea.value.slice(0, selectionStart) + textArea.value.slice(selectionStart + 1, textArea.value.length);
  }


  textArea.value += activeKey.innerText;

  selectionStart = textArea.value.length;
};

const clickDocument = () => {
  selectionStart = textArea.selectionStart;
  selectionEnd = textArea.selectionEnd;
  textArea.removeAttribute('readonly');
};

const activeKey = (el) => {
  let activeKey = document.getElementById(`${el.which}`);

  if (el.which === 20 && upKey === false) {
    upKey = true;
    switch (language) {
      case 'en':
        language = 'enUp';
        localStorage.setItem('language', 'enUp');
        return RenderKeyboard(layoutEngUp, el.which, upKey);
      case 'ru':
        language = 'ruUp';
        localStorage.setItem('language', 'ruUp');
        return RenderKeyboard(layoutRusUp, el.which, upKey);
    }
  } else if (el.which === 20 && upKey === true) {
    upKey = false;
    switch (language) {
      case 'enUp':
        language = 'en';
        localStorage.setItem('language', 'en');
        return RenderKeyboard(layoutEngDown, el.which, upKey);
      case 'ruUp':
        language = 'ru';
        localStorage.setItem('language', 'ru');
        return RenderKeyboard(layoutRusDown, el.which, upKey);
    }
  }

  switch (el.code) {
    case 'AltRight':
      activeKey = document.getElementById(`${el.which}_right`);
      activeKey.classList.add('active_key');
      break;
    case 'AltLeft':
      activeKey = document.getElementById(`${el.which}`);
      activeKey.classList.add('active_key');
      break;
    case 'ControlLeft':
      activeKey = document.getElementById(`${el.which}`);
      activeKey.classList.add('active_key');
      break;
    case 'ControlRight':
      activeKey = document.getElementById(`${el.which}_right`);
      activeKey.classList.add('active_key');
      break;
    default:
      activeKey.classList.add('active_key');
  }


  pressed.add(el.which);
  const [a, b] = [...pressed];
  if (a === 17 && b === 18) {
    switch (language) {
      case 'en':
        language = 'ru';
        localStorage.setItem('language', language);
        return RenderKeyboard(layoutRusDown);
      case 'ru':
        language = 'en';
        localStorage.setItem('language', language);
        return RenderKeyboard(layoutEngDown);

      case 'enUp':
        language = 'ruUp';
        localStorage.setItem('language', language);
        return RenderKeyboard(layoutRusUp, 0, true);
      case 'ruUp':
        language = 'enUp';
        localStorage.setItem('language', language);
        return RenderKeyboard(layoutEngUp, 0, true);
    }
  }

  if (el.which === 16 && upKey === false) {
    switch (language) {
      case 'en':
        shift = 'on';

        return RenderKeyboard(layoutEngUp, el.code, upKey, shift);
      case 'ru':
        shift = 'on';

        return RenderKeyboard(layoutRusUp, el.code, upKey, shift);
    }
  } else if (el.which === 16 && upKey === true) {
    switch (language) {
      case 'enUp':
        shift = 'on';
        return RenderKeyboard(layoutEngDown, el.code, upKey, shift);
      case 'ruUp':
        shift = 'on';
        return RenderKeyboard(layoutRusDown, el.code, upKey, shift);
    }
  }

  textArea.setAttribute('readonly', '');
  textArea.focus();


  const keycode1 = (el.keyCode ? el.keyCode : el.which);
  if (keycode1 === 0 || keycode1 === 9) {
    el.preventDefault();
    el.stopPropagation();
    textArea.value += '\t';
  }
  if (keycode1 === 0 || keycode1 === 9 || keycode1 === 17 || keycode1 === 18) {
    el.preventDefault();
    el.stopPropagation();
  }


  if (el.key === 'Alt' || el.key === 'Control' || el.key === 'Tab' || el.key === 'CapsLock' || el.key === 'Shift') return '';

  if (el.key === 'Enter') return textArea.value += '\r\n';

  if (el.key === 'ArrowRight') {
    selectionStart++;
    return textArea.value += '>';
  }
  if (el.key === 'ArrowLeft') {
    selectionStart++;
    return textArea.value += '<';
  }
  if (el.key === 'ArrowDown') {
    selectionStart++;
    return textArea.value += '∨';
  }
  if (el.key === 'ArrowUp') {
    selectionStart++;
    return textArea.value += '∧';
  }
  if (el.which === 32) {
    selectionStart++;
    return textArea.value += ' ';
  }
  if (el.which === 255) return ' ';


  if (selectionEnd === selectionStart) {
    selectionEnd = null;
  }

  if (el.key === 'Backspace' && !selectionEnd) {
    if (selectionStart === 0) return '';
    selectionStart--;
    return textArea.value = textArea.value.slice(0, selectionStart) + textArea.value.slice(selectionStart + 1, textArea.value.length);
  } else if (el.key === 'Backspace') {
    textArea.value = textArea.value.slice(0, selectionStart) + textArea.value.slice(selectionEnd, textArea.value.length - 1);
    return selectionEnd = null;
  }


  if (el.which === 46) {
    return textArea.value = textArea.value.slice(0, selectionStart) + textArea.value.slice(selectionStart + 1, textArea.value.length);
  }

  // textArea.value = textArea.value.slice(0, selectionStart) + activeKey.innerText + textArea.value.slice(selectionStart, textArea.value.length)

  textArea.value += activeKey.innerText;

  selectionStart = textArea.value.length;
};
const disableKey = (el) => {
  if ([...pressed][0] != 17 || [...pressed].length >= 2) pressed.clear();

  let activeKey = document.getElementById(`${el.which}`);
  if (el.which === 20) return;
  switch (el.code) {
    case 'AltRight':
      activeKey = document.getElementById(`${el.which}_right`);
      activeKey.classList.remove('active_key');
      break;
    case 'AltLeft':
      activeKey = document.getElementById(`${el.which}`);
      activeKey.classList.remove('active_key');
      break;
    case 'ControlLeft':
      activeKey = document.getElementById(`${el.which}`);
      activeKey.classList.remove('active_key');
      break;
    case 'ControlRight':
      activeKey = document.getElementById(`${el.which}_right`);
      activeKey.classList.remove('active_key');
      break;
    default:
      activeKey.classList.remove('active_key');
  }

  if (el.which === 16 && upKey === false) {
    switch (language) {
      case 'en':
        pressed.clear();
        shift = 'off';
        return RenderKeyboard(layoutEngDown, el.code, upKey, shift);
      case 'ru':
        pressed.clear();
        shift = 'off';
        return RenderKeyboard(layoutRusDown, el.code, upKey, shift);
    }
  } else if (el.which === 16 && upKey === true) {
    switch (language) {
      case 'enUp':
        shift = 'off';
        return RenderKeyboard(layoutEngUp, el.code, upKey, shift);
      case 'ruUp':
        shift = 'off';
        return RenderKeyboard(layoutRusUp, el.code, upKey, shift);
    }
    pressed.delete(el.which);
  }
};
const eventClickUp = (el) => {
  const id = el.path[0].id;

  if ([...pressed][0] != 17 || [...pressed].length >= 2) pressed.clear();

  const activeKey = document.getElementById(`${id}`);
  if (id === '20') return;


  if ((id === '16' || id === '16_right') && upKey === false) {
    switch (language) {
      case 'en':
        pressed.clear();
        shift = 'off';
        return RenderKeyboard(layoutEngDown, el.code, upKey, shift);
      case 'ru':
        pressed.clear();
        shift = 'off';
        return RenderKeyboard(layoutRusDown, el.code, upKey, shift);
    }
  } else if ((id === '16' || id === '16_right') && upKey === true) {
    switch (language) {
      case 'enUp':
        shift = 'off';
        return RenderKeyboard(layoutEngUp, el.code, upKey, shift);
      case 'ruUp':
        shift = 'off';
        return RenderKeyboard(layoutRusUp, el.code, upKey, shift);
    }
    pressed.delete(el.which);
  }
};

document.addEventListener('keydown', activeKey);
document.addEventListener('keyup', disableKey);

keyboard.addEventListener('mousedown', eventClick);
keyboard.addEventListener('mouseup', eventClickUp);

textArea.addEventListener('click', clickDocument);


