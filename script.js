const container = document.getElementById('container');
const timer = document.getElementById('timer');
const successCounter = document.getElementById('hits');
const failCounter = document.getElementById('misses');
let hits = 0;
let misses = 0;

function load() {
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
}

function click(hit, index) {
  container.classList.add('loading');
  container.children[index]?.classList.add(hit ? 'hit' : 'miss');
  setTimeout(() => {
    container.children[index]?.classList.remove('hit', 'miss');
    setTimeout(() => {
      load();
    }, 350);
  }, 800);

  hits += hit ? 1 : 0;
  misses += hit ? 0 : 1;
  successCounter.innerText = "Success: " + hits;
  failCounter.innerText = "Fail: " + misses;
}

function start() {
  container.innerHTML = '';
  const start = Date.now();
  setInterval(() => {
    const elapsedTime = Date.now() - start;
    timer.innerHTML = (elapsedTime / 1000).toFixed(2)
  }, 1);
  load();
}
