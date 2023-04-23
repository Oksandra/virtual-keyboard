const dataEn = [
  { letter: '`', keyCode: 'Backquote' },
  { letter: '1', keyCode: 'Digit1' },
  { letter: '2', keyCode: 'Digit2' },
  { letter: '3', keyCode: 'Digit3' },
  { letter: '4', keyCode: 'Digit4' },
  { letter: '5', keyCode: 'Digit5' },
  { letter: '6', keyCode: 'Digit6' },
  { letter: '7', keyCode: 'Digit7' },
  { letter: '8', keyCode: 'Digit8' },
  { letter: '9', keyCode: 'Digit9' },
  { letter: '0', keyCode: 'Digit0' },
  { letter: '-', keyCode: 'Minus' },
  { letter: '=', keyCode: 'Equal' },
  { letter: 'Backspace', keyCode: 'Backspace' },
  { letter: 'Tab', keyCode: 'Tab' },
  { letter: 'q', keyCode: 'KeyQ' },
  { letter: 'w', keyCode: 'KeyW' },
  { letter: 'e', keyCode: 'KeyE' },
  { letter: 'r', keyCode: 'KeyR' },
  { letter: 't', keyCode: 'KeyT' },
  { letter: 'y', keyCode: 'KeyY' },
  { letter: 'u', keyCode: 'KeyU' },
  { letter: 'i', keyCode: 'KeyI' },
  { letter: 'o', keyCode: 'KeyO' },
  { letter: 'p', keyCode: 'KeyP' },
  { letter: '[',  keyCode: 'BracketLeft' },
  { letter: ']',  keyCode: 'BracketRight' },
  { letter: ' \\',  keyCode: 'Backslash' },
  { letter: 'Del', keyCode: 'Delete' },
  { letter: 'CapsLock', keyCode: 'CapsLock' },
  { letter: 'a', keyCode: 'KeyA' },
  { letter: 's', keyCode: 'KeyS' },
  { letter: 'd', keyCode: 'KeyD' },
  { letter: 'f', keyCode: 'KeyF' },
  { letter: 'g', keyCode: 'KeyG' },
  { letter: 'h', keyCode: 'KeyH' },
  { letter: 'j', keyCode: 'KeyJ' },
  { letter: 'k', keyCode: 'KeyK' },
  { letter: 'l', keyCode: 'KeyL' },
  { letter: ';', keyCode: 'Semicolon' },
  { letter: "'", keyCode: 'Quote' },
  { letter: 'Enter', keyCode: 'Enter' },
  { letter: 'Shift', keyCode: 'ShiftLeft' },
  { letter: 'z', keyCode: 'KeyZ' },
  { letter: 'x', keyCode: 'KeyX' },
  { letter: 'c', keyCode: 'KeyC' },
  { letter: 'v', keyCode: 'KeyV' },
  { letter: 'b', keyCode: 'KeyB' },
  { letter: 'n', keyCode: 'KeyN' },
  { letter: 'm', keyCode: 'KeyM' },
  { letter: ',', keyCode: 'Comma' },
  { letter: '.', keyCode: 'Period' },
  { letter: '/', keyCode: 'Slash' },
  { letter: '↑', keyCode: 'ArrowUp' },
  { letter: 'Shift ', keyCode: 'ShiftRight' },
  { letter: 'Ctrl', keyCode: 'ControlLeft' },
  { letter: 'Win', keyCode: 'MetaLeft' },
  { letter: 'Alt', keyCode: 'AltLeft' },
  { letter: '', keyCode: 'Space' },
  { letter: 'Alt', keyCode: 'AltRight' },
  { letter: '←', keyCode: 'ArrowLeft' },
  { letter: '↓', keyCode: 'ArrowDown' },
  { letter: '→', keyCode: 'ArrowRight' },
  { letter: 'Ctrl', keyCode: 'ControlRight' },
];


function generateWrapperKeyboard() {
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

  generateKeyboard(keyboardKeys, dataEn)
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
    if(event.code === element.dataset.index) {
      element.classList.add('key_active');
      if(element.innerText !== 'Backspace' && element.innerText !== 'Tab' && element.innerText !== 'Del' && element.innerText !== 'CapsLock' && element.innerText !== 'Enter' && element.innerText !== 'Shift' && element.innerText !== 'Ctrl' && element.innerText !== 'Win' && element.innerText !== 'Alt') {
        addTextareaValue(element);
      } else if(element.innerText === 'Backspace') {
        event.preventDefault();
        console.log('1111');
      } 
      else if(element.innerText === 'Tab') {
        event.preventDefault();
        console.log('222');
      }   
      
    }
  })
})

window.addEventListener('keyup', (event) => {
  const keys = document.querySelectorAll('.key');
  keys.forEach(element => {
    if(event.code === element.dataset.index) {
      element.classList.remove('key_active');
      element.classList.add('key_remove');
    }
    setTimeout(()=> {
      element.classList.remove('key_remove');
  }, 200)
  })
})


function addTextareaValue(element) {
  const textarea = document.querySelector('.keyboard__input');
  textarea.value += element.innerText;
}


  //const key = document.querySelector('.key_backspace');
 // console.log(key);
  //key.onkeydown = function(event) {
  //  event.preventDefault();
   // console.log('ffff');
  //};



