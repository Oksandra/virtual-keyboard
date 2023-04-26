import dataEn from './js/dataEn.js';
import dataRu from './js/dataRu.js';

let lang

function setLocalStorage() {
  localStorage.setItem('lang', lang);
}

function getLocalStorage() {
  if(localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
} else {
  lang = 'en';
}
}

window.addEventListener('beforeunload', setLocalStorage);

function generateWrapperKeyboard() {
  getLocalStorage();
  let container = document.createElement('div');
  container.className = 'container';
  let keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  let textarea = document.createElement('textarea');
  textarea.className = 'keyboard__input';
  textarea.setAttribute('placeholder', 'Please, write something...');
  textarea.setAttribute('onKeyPress', 'return false');
  keyboard.append(textarea);
  let keyboardKeys = document.createElement('div');
  keyboardKeys.className = 'keyboard__keys';
  keyboard.append(keyboardKeys);
  let instruction = document.createElement('p');
  instruction.className = 'instruction';
  instruction.innerText = 'The keyboard was created in the Windows operating system';
  container.append(keyboard);
  container.append(instruction);
  document.body.prepend(container);

  if(lang === 'en') {
    generateKeyboard(keyboardKeys, dataEn);
  } else {
    generateKeyboard(keyboardKeys, dataRu);
  }
}

generateWrapperKeyboard();

function generateKeyboard(container, data) {
  let template = '';
  let dataFirstRow = data.slice(0, 14);
  let dataSecondRow = data.slice(14, 29);
  let dataThirdRow = data.slice(29, 42);
  let dataFourthRow = data.slice(42, 55);
  let dataFifthhRow = data.slice(55, 65);

  template += `<div class="row">`
  dataFirstRow.forEach(element => {
    if(element.keyCode === 'Backspace') {
      template += `<div class="key key_backspace" data-index = ${element.keyCode}>${element.letter}`
      template += `</div>` 
    } else {
      template += `<div class="key" data-index = ${element.keyCode}>${element.letter}`
      template += `</div>`
    } 
  });
  template += `</div>`

  template += `<div class="row">`
  dataSecondRow.forEach(element => {
    if(element.keyCode === 'Tab') {
      template += `<div class="key key_tab" data-index = ${element.keyCode}>${element.letter}`
      template += `</div>` 
    } else {
      template += `<div class="key" data-index = ${element.keyCode}>${element.letter}`
      template += `</div>`
    }
    
  });
  template += `</div>`

  template += `<div class="row">`
  dataThirdRow.forEach(element => {
    if(element.keyCode === 'CapsLock') {
      template += `<div class="key key_caps-lock" data-index = ${element.keyCode}>${element.letter}`
      template += `</div>` 
    } else if(element.keyCode === 'Enter') {
      template += `<div class="key key_enter" data-index = ${element.keyCode}>${element.letter}`
      template += `</div>` 
    }
    else {
      template += `<div class="key" data-index = ${element.keyCode}>${element.letter}`
      template += `</div>`
    }
  });
  template += `</div>`

  template += `<div class="row">`
  dataFourthRow.forEach(element => {
    if(element.keyCode === 'ShiftLeft' || element.keyCode === 'ShiftRight') {
      template += `<div class="key key_shift" data-index = ${element.keyCode}>${element.letter}`
      template += `</div>` 
    } else {
      template += `<div class="key" data-index = ${element.keyCode}>${element.letter}`
      template += `</div>`
    } 
  });
  template += `</div>`

  template += `<div class="row">`
  dataFifthhRow.forEach(element => {
    if(element.keyCode === 'ControlLeft' || element.keyCode === 'ControlRight') {
      template += `<div class="key key_ctrl" data-index = ${element.keyCode}>${element.letter}`
      template += `</div>` 
    } else if(element.keyCode === 'Space') {
      template += `<div class="key key_space" data-index = ${element.keyCode}>${element.letter}`
      template += `</div>` 
    }
    else {
      template += `<div class="key" data-index = ${element.keyCode}>${element.letter}`
      template += `</div>`
    } 
  });
  template += `</div>`

  container.innerHTML = template;
  return container;
}

window.addEventListener('keydown', (event) => {
  const keys = document.querySelectorAll('.key');
  keys.forEach(element => {
    if(event.code === element.dataset.index && event.code !== 'CapsLock') {
      element.classList.add('key_active');
      if(element.innerText !== 'Backspace' && element.innerText !== 'Tab' && element.innerText !== 'Del' && element.innerText !== 'Enter' && element.innerText !== 'Shift' && element.innerText !== 'Ctrl' && element.innerText !== 'Win' && element.innerText !== 'Alt' && element.innerText !== '' && element.innerText !== '↑' && element.innerText !== '←' && element.innerText !== '↓' && element.innerText !== '→') {
        addTextareaValue(element);
      } else {
        addSpecialKeyActions(element, event);
      } 
    } else if (event.code === element.dataset.index && event.code === 'CapsLock'){
      element.classList.toggle('key_active');
      actionCapsLock();
    }
  })
})

window.addEventListener('keyup', (event) => {
  const keys = document.querySelectorAll('.key');
  keys.forEach(element => {
    if(event.code === element.dataset.index && event.code !== 'CapsLock') {
      element.classList.remove('key_active');
      element.classList.add('key_remove');
    }
    setTimeout(()=> {
      element.classList.remove('key_remove');
  }, 200)
  })
})

window.addEventListener('mousedown', (event) => {
  let clickedButton = event.target;
  if(clickedButton.classList.contains('key')) {
    if(clickedButton.innerText !== 'Backspace' && clickedButton.innerText !== 'Tab' && clickedButton.innerText !== 'Del' && clickedButton.innerText !== 'Enter' && clickedButton.innerText !== 'Shift' && clickedButton.innerText !== 'Ctrl' && clickedButton.innerText !== 'Win' && clickedButton.innerText !== 'Alt' && clickedButton.innerText !== '' && clickedButton.innerText !== '↑' && clickedButton.innerText !== '←' && clickedButton.innerText !== '↓' && clickedButton.innerText !== '→' && clickedButton.innerText !== 'CapsLock') {
      addTextareaValue(clickedButton);
    } else {
      addSpecialKeyActions(clickedButton, event);
    } 
  }
   if(clickedButton.innerText === 'CapsLock'){
    console.log('1111')
    clickedButton.classList.toggle('key_active');
    actionCapsLock();
  }

 
})

window.addEventListener('mouseup', (event) => {
})


function addTextareaValue(element) {
  const textarea = document.querySelector('.keyboard__input');
  textarea.setRangeText(element.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
  textarea.focus();
}

function addSpecialKeyActions(element, event) {
  const textarea = document.querySelector('.keyboard__input');
  let position = textarea.selectionStart;
  let value = textarea.value;
 if(element.dataset.index === 'Backspace') {
    event.preventDefault();
    textarea.value = actionBackspaceKey(value, position);
    textarea.selectionStart = textarea.selectionEnd = position - 1;
  } 

  if(element.dataset.index === 'Delete') {
    event.preventDefault();
    textarea.value = actionDeleteKey(value, position);
    textarea.selectionStart = textarea.selectionEnd = position;
  } 

  if(element.dataset.index === 'Space') {
    event.preventDefault();
    textarea.setRangeText(' ', textarea.selectionStart, textarea.selectionEnd, 'end');
    textarea.focus();
   } 

  if(element.dataset.index === 'Tab') {
    event.preventDefault();
    textarea.setRangeText('    ', textarea.selectionStart, textarea.selectionEnd, 'end');
    textarea.focus();
  }

  if(element.dataset.index === 'Enter') {
    event.preventDefault();
    textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');
    textarea.focus();
   } 

   if(element.dataset.index === 'ArrowUp' || element.dataset.index === 'ArrowLeft' || element.dataset.index === 'ArrowDown' || element.dataset.index === 'ArrowRight') {
    event.preventDefault();
    textarea.setRangeText(element.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
    textarea.focus();
   }

   if(element.dataset.index === 'AltRight') {
    event.preventDefault();
   }

   if(element.dataset.index === 'AltLeft') {
    event.preventDefault();
   }
}

function actionBackspaceKey(value, pos) {
  let arr = value.split('');
  arr.splice(pos - 1, 1)
  let result = arr.join('');
     return result;
}

function actionDeleteKey(value, pos) {
  let arr = value.split('');
  arr.splice(pos, 1)
  let result = arr.join('');
     return result;
}

function actionCapsLock() {
  const capsLock = document.querySelector('.key_caps-lock'); 
  const keys = document.querySelectorAll('.key'); 
  keys.forEach(element => {
    if(element.innerText.length === 1) {
      if(capsLock.classList.contains('key_active')) {
        element.innerText = element.innerText.toUpperCase();
      } else {
        element.innerText = element.innerText.toLowerCase();
      }
    } 
  })
}

function getTranslate(data = dataEn) {
  const keys = document.querySelectorAll('.key'); 
  const capsLock = document.querySelector('.key_caps-lock');
  if(lang === 'en') {
    data = dataRu;
    lang = 'ru';
  } else {
    lang = 'en'; 
  }
  if(capsLock.classList.contains('key_active')) {
    keys.forEach(element => {
      data.forEach(item => {
        if(element.dataset.index === item.keyCode && element.innerText.length === 1){
          element.innerText = item.letter.toUpperCase(); 
        }
      } 
        )
    }) 
  } else {
    keys.forEach(element => {
      data.forEach(item => {
        if(element.dataset.index === item.keyCode){
          element.innerText = item.letter; 
        }
      } 
        )
    })
  }
  console.log(lang);
 return lang;
}

console.log(lang);

function setKeyboardShortcut(func, ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', function(event) {
    pressed.add(event.code);

    for (let code of codes) { 
      if (!pressed.has(code)) {
        return;
      }
    }
    pressed.clear();

    func();
  });

  document.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });

}

setKeyboardShortcut(getTranslate, "ControlLeft", "AltLeft");




  //const key = document.querySelector('.key_backspace');
 // console.log(key);
  //key.onkeydown = function(event) {
  //  event.preventDefault();
   // console.log('ffff');
  //};



