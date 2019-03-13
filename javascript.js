console.log("tets");
var data = {
  stack: []
}

function calc (number1, operator, number2) {
  let result = '';

  if ( operator === 'plus' ) {
     result = parseFloat(number1) + parseFloat(number2);
  } else if ( operator === 'subtract' ) {
      result = parseFloat(number1) - parseFloat(number2);
  } else if ( operator === 'multiply' ) {
      result = parseFloat(number1) * parseFloat(number2);
  } else if ( operator === 'divide' ) {
      result = parseFloat(number1) / parseFloat(number2);
  }
  return result;
}

function delElem (input) {
  let output = '';
  var divide = input.split('');
  if ( divide.length === 1 ) {
    output = 0;
    return output;
  } else {
    divide.pop();
    for ( var i = 0; i <divide.length; i++ ) {
    output += divide[i];
  }
    return output;
  }
}

document.querySelector('.button-section').addEventListener("click", functionality, false);


var displayValue = document.querySelector('#inputValue');

function functionality (e) {
    if ( e.target !== e.currentTarget ) {
        var clickedItem = e.target;
        var getValue = clickedItem.textContent;
        var displayedValue = document.querySelector('#inputValue').textContent;
        var clickedSign = clickedItem.dataset.value;
        var frame = document.querySelector('.button-section');
        var previousType = frame.dataset.previousType;
        var smallerScreen = document.querySelector('.up-left');
        var smallerScreenText = document.querySelector('.up-left').textContent;

        if( !isNaN(getValue) && getValue.trim() !== '' ) {

          frame.dataset.previousType = 'number';
          if ( displayedValue === '0' || previousType === 'operator' ) {
            displayValue.textContent = getValue;
          } else {
           displayValue.textContent += getValue;
          }
           if ( smallerScreen.textContent === '0' ) {
            smallerScreen.textContent = getValue;
          } else {
            smallerScreen.textContent += getValue;
          }

        } else {
          if ( clickedSign === 'plus' || clickedSign === 'subtract' || clickedSign === 'multiply' || clickedSign === 'divide' ) {
            var firstValue = frame.dataset.firstValue;
            var secondValue = displayedValue;
            var operator = frame.dataset.operator;
            if ( smallerScreen.textContent !== '0' && (smallerScreenText.slice(-1) === '+' || smallerScreenText.slice(-1) === '−' || smallerScreenText.slice(-1) === '×' || smallerScreenText.slice(-1) === '÷') ) {
                document.querySelector('.up-left').textContent = delElem (smallerScreen.textContent) + getValue;

            }  else {
               smallerScreen.classList.add('visible');
               smallerScreen.textContent += getValue;


          }
            if ( firstValue && operator && previousType !== 'operator' ) {
                var calculatedVal = calc (firstValue, operator, secondValue);
                displayValue.textContent = calculatedVal;

                frame.dataset.firstValue = calculatedVal;
            } else {
              frame.dataset.firstValue = displayedValue;
            }

            frame.dataset.previousType = 'operator';
            frame.dataset.operator = clickedSign;

          } else if ( clickedSign === 'C' ) {
              displayValue.textContent = '0';
              frame.removeAttribute('data-first-value');
              smallerScreen.classList.remove('visible');
              smallerScreen.textContent = '0';

          } else if ( clickedSign === 'del' ) {
                console.log('item clicked');
                if ( !isNaN(smallerScreenText.slice(-1)) ) {
                    displayValue.textContent = delElem (displayedValue);
                smallerScreen.textContent = delElem (smallerScreenText);
                    }

          } else if ( clickedSign === 'decimal' ) {
              if (!displayedValue.includes('.')) {
                displayValue.textContent += getValue;
                smallerScreen.textContent += getValue;
             }

          } else if ( clickedSign === 'equals' ) {
              var firstValue = frame.dataset.firstValue;
              var secondValue = displayedValue;
              var operator = frame.dataset.operator;
              frame.dataset.firstValue = '';
            document.querySelector('#inputValue').textContent = calc (firstValue, operator, secondValue);
            smallerScreen.textContent = calc (firstValue, operator, secondValue);
            smallerScreen.classList.remove('visible');

          } else if ( clickedSign === 'plus-minus' ) {
              if (Math.sign(displayedValue) === 1) {
                document.querySelector('#inputValue').textContent = displayedValue*(-1);
              } else if (Math.sign(displayedValue) === -1) {
                document.querySelector('#inputValue').textContent = displayedValue*(-1);
              } else {
                document.querySelector('#inputValue').textContent = displayedValue;
              }

         } else if ( clickedSign === 'CE' ) {
              displayValue.textContent = '0';

              if( isNaN(smallerScreenText) && frame.dataset.firstValue ) {
               smallerScreen.textContent = smallerScreen.textContent.replace(/[0-9]+$/g, '');
               } else {
                 smallerScreen.textContent = '0';
               }

            }

         }

        }

    e.stopPropagation();

}
