import dataEn from './js/dataEn.js';
import dataRu from './js/dataRu.js';

let lang;
let onShift = false;

function setLocalStorage() {
  localStorage.setItem('lang', lang);
}

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
  } else {
    lang = 'en';
  }
}

window.addEventListener('beforeunload', setLocalStorage);

function generateKeyboard(container, data) {
  let template = '';
  const block = container;
  const dataFirstRow = data.slice(0, 14);
  const dataSecondRow = data.slice(14, 29);
  const dataThirdRow = data.slice(29, 42);
  const dataFourthRow = data.slice(42, 55);
  const dataFifthhRow = data.slice(55, 65);

  template += '<div class ="row">';
  dataFirstRow.forEach((element) => {
    if (element.keyCode === 'Backspace') {
      template += `<div class="key key_backspace" data-index = ${element.keyCode}>${element.letter}`;
      template += '</div>';
    } else {
      template += `<div class="key" data-index = ${element.keyCode}>${element.letter}`;
      template += '</div>';
    }
  });
  template += '</div>';

  template += '<div class="row">';
  dataSecondRow.forEach((element) => {
    if (element.keyCode === 'Tab') {
      template += `<div class="key key_tab" data-index = ${element.keyCode}>${element.letter}`;
      template += '</div>';
    } else {
      template += `<div class="key" data-index = ${element.keyCode}>${element.letter}`;
      template += '</div>';
    }
  });
  template += '</div>';

  template += '<div class="row">';
  dataThirdRow.forEach((element) => {
    if (element.keyCode === 'CapsLock') {
      template += `<div class="key key_caps-lock" data-index = ${element.keyCode}>${element.letter}`;
      template += '</div>';
    } else if (element.keyCode === 'Enter') {
      template += `<div class="key key_enter" data-index = ${element.keyCode}>${element.letter}`;
      template += '</div>';
    } else {
      template += `<div class="key" data-index = ${element.keyCode}>${element.letter}`;
      template += '</div>';
    }
  });
  template += '</div>';

  template += '<div class="row">';
  dataFourthRow.forEach((element) => {
    if (element.keyCode === 'ShiftLeft' || element.keyCode === 'ShiftRight') {
      template += `<div class="key key_shift" data-index = ${element.keyCode}>${element.letter}`;
      template += '</div>';
    } else {
      template += `<div class="key" data-index = ${element.keyCode}>${element.letter}`;
      template += '</div>';
    }
  });
  template += '</div>';

  template += '<div class="row">';
  dataFifthhRow.forEach((element) => {
    if (element.keyCode === 'ControlLeft' || element.keyCode === 'ControlRight') {
      template += `<div class="key key_ctrl" data-index = ${element.keyCode}>${element.letter}`;
      template += '</div>';
    } else if (element.keyCode === 'Space') {
      template += `<div class="key key_space" data-index = ${element.keyCode}>${element.letter}`;
      template += '</div>';
    } else {
      template += `<div class="key" data-index = ${element.keyCode}>${element.letter}`;
      template += '</div>';
    }
  });
  template += '</div>';

  block.innerHTML = template;
  return block;
}

function generateWrapperKeyboard() {
  getLocalStorage();
  const container = document.createElement('div');
  container.className = 'container';
  const title = document.createElement('h1');
  title.className = 'title';
  title.innerText = 'Virtual Keyboard';
  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  const textarea = document.createElement('textarea');
  textarea.className = 'keyboard__input';
  textarea.setAttribute('placeholder', 'Please, write something...');
  textarea.setAttribute('onKeyPress', 'return false');
  keyboard.append(textarea);
  const keyboardKeys = document.createElement('div');
  keyboardKeys.className = 'keyboard__keys';
  keyboard.append(keyboardKeys);
  const description = document.createElement('div');
  description.className = 'description';
  const instruction = document.createElement('p');
  instruction.className = 'instruction';
  instruction.innerText = 'The keyboard has been created in the Windows.';
  const language = document.createElement('p');
  language.innerText = 'Use Left Ctrl + Alt to switch language (keyboard or mouse)';
  language.className = 'instruction';
  description.append(language);
  description.append(instruction);
  container.append(title);
  container.append(keyboard);
  container.append(description);
  document.body.prepend(container);

  if (lang === 'en') {
    generateKeyboard(keyboardKeys, dataEn);
  } else {
    generateKeyboard(keyboardKeys, dataRu);
  }
}

generateWrapperKeyboard();

function addTextareaValue(element) {
  const textarea = document.querySelector('.keyboard__input');
  textarea.setRangeText(element.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
  textarea.focus();
}

function actionBackspaceKey(value, pos) {
  const arr = value.split('');
  arr.splice(pos - 1, 1);
  const result = arr.join('');
  return result;
}

function actionDeleteKey(value, pos) {
  const arr = value.split('');
  arr.splice(pos, 1);
  const result = arr.join('');
  return result;
}

function actionShift(data = dataEn) {
  const keys = document.querySelectorAll('.key');
  const capsLock = document.querySelector('.key_caps-lock');
  let value = data;
  onShift = true;
  if (lang === 'en') {
    value = dataEn;
  } else {
    value = dataRu;
  }
  keys.forEach((element) => {
    const elem = element;
    if (elem.innerText.length === 1) {
      if (capsLock.classList.contains('key_active')) {
        value.forEach((item) => {
          if (elem.dataset.index === item.keyCode) {
            elem.innerText = item.onShift.toLowerCase();
          }
        });
      } else {
        value.forEach((item) => {
          if (elem.dataset.index === item.keyCode) {
            elem.innerText = item.onShift;
          }
        });
      }
    }
  });
}

function deactionShift(data = dataEn) {
  const keys = document.querySelectorAll('.key');
  const capsLock = document.querySelector('.key_caps-lock');
  let value = data;
  onShift = false;
  if (lang === 'en') {
    value = dataEn;
  } else {
    value = dataRu;
  }
  keys.forEach((element) => {
    const elem = element;
    if (elem.innerText.length === 1) {
      if (capsLock.classList.contains('key_active')) {
        value.forEach((item) => {
          if (elem.dataset.index === item.keyCode) {
            elem.innerText = item.letter.toUpperCase();
          }
        });
      } else {
        value.forEach((item) => {
          if (elem.dataset.index === item.keyCode) {
            elem.innerText = item.letter;
          }
        });
      }
    }
  });
}

function addSpecialKeyActions(element, event) {
  const textarea = document.querySelector('.keyboard__input');
  const position = textarea.selectionStart;
  const { value } = textarea;
  if (element.dataset.index === 'Backspace') {
    event.preventDefault();
    textarea.value = actionBackspaceKey(value, position);
    textarea.selectionEnd = position - 1;
    textarea.selectionStart = textarea.selectionEnd;
  }

  if (element.dataset.index === 'Delete') {
    event.preventDefault();
    textarea.value = actionDeleteKey(value, position);
    textarea.selectionEnd = position;
    textarea.selectionStart = textarea.selectionEnd;
  }

  if (element.dataset.index === 'Space') {
    event.preventDefault();
    textarea.setRangeText(' ', textarea.selectionStart, textarea.selectionEnd, 'end');
    textarea.focus();
  }

  if (element.dataset.index === 'Tab') {
    event.preventDefault();
    textarea.setRangeText('    ', textarea.selectionStart, textarea.selectionEnd, 'end');
    textarea.focus();
  }

  if (element.dataset.index === 'Enter') {
    event.preventDefault();
    textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');
    textarea.focus();
  }

  if (element.dataset.index === 'ArrowUp' || element.dataset.index === 'ArrowLeft' || element.dataset.index === 'ArrowDown' || element.dataset.index === 'ArrowRight') {
    event.preventDefault();
    textarea.setRangeText(element.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
    textarea.focus();
  }

  if (element.dataset.index === 'AltRight') {
    event.preventDefault();
  }

  if (element.dataset.index === 'AltLeft') {
    event.preventDefault();
  }

  if (element.dataset.index === 'ShiftLeft' || element.dataset.index === 'ShiftRight') {
    event.preventDefault();
    actionShift();
  }
}

function actionCapsLock() {
  const capsLock = document.querySelector('.key_caps-lock');
  const keys = document.querySelectorAll('.key');
  keys.forEach((element) => {
    const elem = element;
    if (elem.innerText.length === 1) {
      if (capsLock.classList.contains('key_active') && onShift === false) {
        elem.innerText = elem.innerText.toUpperCase();
      } else if (capsLock.classList.contains('key_active') && onShift === true) {
        elem.innerText = elem.innerText.toLowerCase();
      } else if (!capsLock.classList.contains('key_active') && onShift === true) {
        elem.innerText = elem.innerText.toUpperCase();
      } else {
        elem.innerText = elem.innerText.toLowerCase();
      }
    }
  });
}

window.addEventListener('keydown', (event) => {
  const keys = document.querySelectorAll('.key');
  keys.forEach((element) => {
    if (event.code === element.dataset.index && event.code !== 'CapsLock') {
      element.classList.add('key_active');
      if (element.innerText !== 'Backspace' && element.innerText !== 'Tab' && element.innerText !== 'Del' && element.innerText !== 'Enter' && element.innerText !== 'Shift' && element.innerText !== 'Ctrl' && element.innerText !== 'Win' && element.innerText !== 'Alt' && element.innerText !== '' && element.innerText !== '↑' && element.innerText !== '←' && element.innerText !== '↓' && element.innerText !== '→') {
        addTextareaValue(element);
      } else {
        addSpecialKeyActions(element, event);
      }
    } else if (event.code === element.dataset.index && event.code === 'CapsLock') {
      element.classList.toggle('key_active');
      actionCapsLock();
    }
  });
});

window.addEventListener('keyup', (event) => {
  const keys = document.querySelectorAll('.key');
  keys.forEach((element) => {
    if (event.code === element.dataset.index && event.code !== 'CapsLock') {
      element.classList.remove('key_active');
      element.classList.add('key_remove');
    }
    setTimeout(() => {
      element.classList.remove('key_remove');
    }, 200);
  });
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    deactionShift();
    const shiftLeft = document.querySelector('[data-index="ShiftLeft"]');
    const shiftRight = document.querySelector('[data-index="ShiftRight"]');
    shiftLeft.classList.remove('key_active');
    shiftRight.classList.remove('key_active');
  }
});

window.addEventListener('mousedown', (event) => {
  const clickedButton = event.target;
  if (clickedButton.classList.contains('key')) {
    if (clickedButton.innerText !== 'Backspace' && clickedButton.innerText !== 'Tab' && clickedButton.innerText !== 'Del' && clickedButton.innerText !== 'Enter' && clickedButton.innerText !== 'Shift' && clickedButton.innerText !== 'Ctrl' && clickedButton.innerText !== 'Win' && clickedButton.innerText !== 'Alt' && clickedButton.innerText !== '' && clickedButton.innerText !== '↑' && clickedButton.innerText !== '←' && clickedButton.innerText !== '↓' && clickedButton.innerText !== '→' && clickedButton.innerText !== 'CapsLock') {
      addTextareaValue(clickedButton);
    } else {
      addSpecialKeyActions(clickedButton, event);
    }
  }
  if (clickedButton.innerText === 'CapsLock') {
    clickedButton.classList.toggle('key_active');
    actionCapsLock();
  }
});

window.addEventListener('mouseup', (event) => {
  const clickedButton = event.target;
  if (clickedButton.innerText === 'Shift') {
    deactionShift();
  }
});

window.addEventListener('click', () => {
  const textarea = document.querySelector('.keyboard__input');
  textarea.focus();
});

function getTranslate(data = dataEn) {
  const keys = document.querySelectorAll('.key');
  const capsLock = document.querySelector('.key_caps-lock');
  let value = data;
  if (lang === 'en') {
    value = dataRu;
    lang = 'ru';
  } else {
    lang = 'en';
  }
  if (capsLock.classList.contains('key_active') && onShift === true) {
    keys.forEach((element) => {
      const elem = element;
      value.forEach((item) => {
        if (elem.dataset.index === item.keyCode && elem.innerText.length === 1) {
          elem.innerText = item.letter;
        }
      });
    });
  } else if (capsLock.classList.contains('key_active') || onShift === true) {
    keys.forEach((element) => {
      const elem = element;
      value.forEach((item) => {
        if (elem.dataset.index === item.keyCode && elem.innerText.length === 1) {
          elem.innerText = item.letter.toUpperCase();
        }
      });
    });
  } else {
    keys.forEach((element) => {
      const elem = element;
      value.forEach((item) => {
        if (elem.dataset.index === item.keyCode) {
          elem.innerText = item.letter;
        }
      });
    });
  }
  return lang;
}

function setKeyboardShortcut(func, ...codes) {
  const pressed = new Set();

  document.addEventListener('keydown', (event) => {
    pressed.add(event.code);
    const allCodesPressed = codes.every((code) => pressed.has(code));
    if (allCodesPressed) {
      pressed.clear();
      func();
    }
  });

  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
  });
}

setKeyboardShortcut(getTranslate, 'ControlLeft', 'AltLeft');

function setClickCombination(func, ...codes) {
  const pressed = new Set();

  document.addEventListener('mousedown', (event) => {
    pressed.add(event.target.dataset.index);
    if (pressed.size === 2) {
      const allCodesPressed = codes.every((code) => pressed.has(code));
      if (allCodesPressed) {
        pressed.clear();
        func();
      } else {
        pressed.clear();
      }
    }
  });

  document.addEventListener('mouseup', (event) => {
    if (event.target.dataset.index !== 'ControlLeft' && event.target.dataset.index !== 'AltLeft') {
      pressed.delete(event.target.dataset.index);
    }
  });
}

setClickCombination(getTranslate, 'ControlLeft', 'AltLeft');
