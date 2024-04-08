let submit = document.getElementById('button');
submit.addEventListener('click', returnValue);
let resultado = document.getElementById('resultado')

const actions = [
     { name: 'Punch', value: 2 },
     { name: 'Bend', value: 7 },
     { name: 'Upset', value: 13 },
     { name: 'Shrink', value: 16 },
     { name: 'Light Hit', value: -3 },
     { name: 'Medium Hit', value: -6 },
     { name: 'Heavy Hit', value: -9 },
     { name: 'Draw', value: -15 }
];

function returnValue() {
     const select1 = document.getElementById('campo1');
     const value = parseInt(select1.options[select1.selectedIndex].value);
     const text = select1.options[select1.selectedIndex].text;
     const select2 = document.getElementById('campo2');
     const value2 = parseInt(select2.options[select2.selectedIndex].value);
     const text2 = select2.options[select2.selectedIndex].text;
     const select3 = document.getElementById('campo3');
     const value3 = parseInt(select3.options[select3.selectedIndex].value);
     const text3 = select3.options[select3.selectedIndex].text;

     if (isNaN(value) || isNaN(value2) || isNaN(value3)) {
          resultado.innerHTML = `<p>Preencha todos os campos corretamente.</p>`;
          return;
     }

     let soma = value + value2 + value3;
     let actionsUsed = []

     for (let i = 0; i < actions.length; i++) {
          for (let j = i + 1; j < actions.length; j++) {
               for (let k = j + 1; k < actions.length; k++) {
                    if (actions[i].value + actions[j].value + actions[k].value === -soma) {
                         soma = 0;
                         actionsUsed = [actions[i].name, actions[j].name, actions[k].name];
                         break;
                    }
               }
               if (soma === 0) {
                    break;
               }
          }
          if (soma === 0) {
               break;
          }
     }
     if (soma !== 0) {
          for (let i = 0; i < actions.length; i++) {
               for (let j = 0; j < actions.length; j++) {
                    for (let k = 0; k < actions.length; k++) {
                         for (let l = 0; l < actions.length; l++) {
                              if (actions[i].value + actions[j].value + actions[k].value + actions[l].value === -soma) {
                                   soma = 0;
                                   actionsUsed = [actions[i].name, actions[j].name, actions[k].name, actions[l].name];
                                   break;
                              }
                         }
                         if (soma === 0) {
                              break;
                         }
                    }
                    if (soma === 0) {
                         break;
                    }
               }
               if (soma === 0) {
                    break;
               }
          }
     }
     if (soma !== 0) {
          resultado.innerHTML = `<p>Unable to find actions that result in zero.</p>`;
     } else {
          let actionsHTML = actionsUsed.map(action => {
               const actionData = actions.find(a => a.name === action);
               return `<p class="resultado-numero ${actionData.value > 0 ? "positivo" : "negativo"}">${actionData.name}</p>`;
          }).join('');

          const numerosHTML = `
              <p class='resultado-numero ${value > 0 ? "positivo" : "negativo"}'>${text3}</p>
              <p class='resultado-numero ${value2 > 0 ? "positivo" : "negativo"}'>${text2}</p>
              <p class='resultado-numero ${value3 > 0 ? "positivo" : "negativo"}'>${text}</p>
          `;

          resultado.innerHTML = actionsHTML + numerosHTML;
     }
     // if (soma !== 0) {
     //      resultado.innerHTML = `<p>Não foi possível encontrar ações que resultem em zero.</p>`;
     // } else {
     //      resultado.innerHTML = actionsUsed.map(action => `<p>${action}</p>`).join('') + `
     //      <p class='verde'>${text3}</p>
     //      <p>${text2}</p>
     //      <p>${text}</p>
     //      `;
     // }
     submit.removeEventListener('click', returnValue);
     submit.addEventListener('click', returnValue);
}