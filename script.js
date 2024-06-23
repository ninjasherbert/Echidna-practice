const container = document.getElementById('container');
const successCounter = document.getElementById('hits');
const failCounter = document.getElementById('misses');
let hits = 0;
let misses = 0;
let movingInterval = null;
let timer = null;

function load() {
  setTimeout(() => {
    container.classList.remove('loading');
    container.innerHTML = '';

    const correctIndex = Math.floor(Math.random() * 8);
    const direction = Math.floor(Math.random() * 2);
  
    for (let i = 0; i < 8; i++) {
      const directions = ['left', 'right'];
      const img = document.createElement('img');
      img.src = `mirror-${directions.at(i === correctIndex ? direction : direction - 1)}.png`;
      img.onclick = () => {
        click(i === correctIndex, i);
      };
      img.classList.add(i === correctIndex ? 'correct' : 'incorrect')
      container.append(img);
    }

    let paddingTop = 0;
    movingInterval = setInterval(() => {
      paddingTop++;
      container.style.paddingTop = paddingTop + 'px';
    }, 10);

    timer = setTimeout(() => {
      click(false);
    }, 5000);
  }, 400);
}

function click(hit, index) {
  container.classList.add('loading');
  clearTimeout(timer);
  clearInterval(movingInterval);
  container.children[index]?.classList.add(hit ? 'hit' : 'miss');
  setTimeout(() => {
    container.children[index]?.classList.remove('hit', 'miss');
    load();
  }, 800);

  hits += hit ? 1 : 0;
  misses += hit ? 0 : 1;
  successCounter.innerText = "Success: " + hits;
  failCounter.innerText = "Fail: " + misses;
}

load();
