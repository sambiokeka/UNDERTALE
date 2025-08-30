const falaAtaque = document.getElementById("falaAtaque");
const barraAtaque = document.getElementById("barraAtaque");
const dialogo = document.getElementById("dialogo");

let pos = 0;
let goingRight = true;
let attackInterval;
let temporizador; 

function resetar() {
  if (temporizador) clearTimeout(temporizador); 
  temporizador = setTimeout(() => {
    dialogo.textContent = "Sans te encara com desaprovação";
  }, 2000);
}

function fight() {
  dialogo.textContent = "* Você ATACA!";
  barraAtaque.style.display = "block";
  pos = 0;
  goingRight = true;
  clearInterval(attackInterval);

  attackInterval = setInterval(() => {
    if (goingRight) {
      pos += 5;
      if (pos >= barraAtaque.offsetWidth - falaAtaque.offsetWidth) goingRight = false;
    } else {
      pos -= 5;
      if (pos <= 0) goingRight = true;
    }
    falaAtaque.style.left = pos + "px";
  }, 30);
  
  barraAtaque.onclick = () => {
    stopAttack(pos, barraAtaque.offsetWidth); 
    resetar(); 
  };
}

function stopAttack(position, maxWidth) {
  clearInterval(attackInterval);

  const middle = maxWidth / 2;
  const distance = Math.abs(position - middle);
  const damage = Math.max(0, 100 - Math.floor((distance / middle) * 100));

  dialogo.textContent = "* Você deu " + damage + " de dano!";
  barraAtaque.style.display = "none";
}

function act() {
  dialogo.textContent = "* Você escolheu AGIR.";
  resetar();
}

function mercy() {
  dialogo.textContent = "* Você escolheu POUPAR.";
  resetar(); 
}

function item() {
  dialogo.textContent = "* Você usa um ITEM.";
  resetar(); 
}
