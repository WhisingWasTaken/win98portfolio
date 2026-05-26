document.documentElement.style.cursor = 'url("win98.cur"), auto';
document.body.style.cursor = 'url("win98.cur"), auto';

const startBtn = document.getElementById('startBtn');
const startMenu = document.getElementById('startMenu');
const taskItems = document.getElementById('taskItems');
const icons = document.querySelectorAll('.icon');
const appWindowTemplate = document.getElementById('appWindowTemplate');

let zCounter = 10;
let openWindows = []; 

startBtn.addEventListener('click', () => {
  const visible = startMenu.style.display === 'block';
  startMenu.style.display = visible ? 'none' : 'block';
  startBtn.setAttribute('aria-expanded', String(!visible));
});

document.getElementById('startRestart').addEventListener('click', () => {
  try { 
    window.open('https://whising.space', '_blank', 'noopener'); 
  } catch(e) { 
    window.location.href = 'https://whising.space'; 
  }
  startMenu.style.display = 'none';
});

document.getElementById('startShutdown').addEventListener('click', () => {
  startMenu.style.display = 'none';
  try {
    window.close();
    window.open('https://whising.space', '_blank', 'noopener');
  } catch(e) {
    window.location.href = 'https://whising.space';
  }
});

document.getElementById('startLogout').addEventListener('click', () => {
  startMenu.style.display = 'none';
  window.location.href = 'login.html';
});

const windowPositions = [
  { left: '35%', top: '20%' },    
  { left: '65%', top: '20%' },    
  { left: '35%', top: '60%' },    
  { left: '65%', top: '60%' }     
];

const occupiedPositions = new Map();

icons.forEach((icon, index) => {
  const target = icon.dataset.target;
  const label = icon.querySelector('.label').textContent || 'App';

  function openApp() {
    const existingWindow = openWindows.find(w => {
      const iframe = w.querySelector('iframe');
      return iframe && iframe.src.includes(target.split('/').pop());
    });
    
    if (existingWindow) {
      existingWindow.style.display = 'flex';
      existingWindow.style.zIndex = zCounter++;
      return;
    }

    if (openWindows.length >= 4) {
      alert("You can only open up to 4 windows at once.");
      return;
    }

    const win = appWindowTemplate.cloneNode(true);
    win.id = ''; 
    win.style.display = 'flex';
    win.style.position = 'absolute';
    win.style.zIndex = zCounter++;
    
    let positionIndex = 0;
    for (let i = 0; i < windowPositions.length; i++) {
      if (!occupiedPositions.has(i)) {
        positionIndex = i;
        occupiedPositions.set(i, label);
        break;
      }
    }
    
    const position = windowPositions[positionIndex];
    win.style.width = '500px';
    win.style.height = '350px';
    win.style.left = position.left;
    win.style.top = position.top;

    win.querySelector('.title').textContent = label;
    const iframe = win.querySelector('iframe');
    iframe.src = target;

    const closeBtn = win.querySelector('.closeBtn');
    closeBtn.addEventListener('click', () => {
      win.remove();
      removeTaskItem(label);
      openWindows = openWindows.filter(w => w !== win);
      
      for (const [key, value] of occupiedPositions.entries()) {
        if (value === label) {
          occupiedPositions.delete(key);
          break;
        }
      }
    });

    const minBtn = win.querySelector('.minBtn');
    minBtn.addEventListener('click', () => {
      win.style.display = 'none';
    });

    win.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('btn') || 
          e.target.classList.contains('minBtn') || 
          e.target.classList.contains('closeBtn')) {
        return;
      }
      win.style.zIndex = zCounter++;
    });

    document.body.appendChild(win);
    addTaskItem(label, win);
    openWindows.push(win);
  }

  icon.addEventListener('click', openApp);
  icon.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { 
      e.preventDefault(); 
      openApp(); 
    }
  });
});

function addTaskItem(label, win) {
  removeTaskItem(label);
  
  const el = document.createElement('div');
  el.className = 'btn';
  el.textContent = label;
  el.addEventListener('click', () => {
    win.style.display = 'flex';
    win.style.zIndex = zCounter++;
  });
  taskItems.appendChild(el);
}

function removeTaskItem(label) {
  [...taskItems.children].forEach(c => {
    if (c.textContent === label) c.remove();
  });
}

function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = hh + ':' + mm;
}
updateClock();
setInterval(updateClock, 1000);