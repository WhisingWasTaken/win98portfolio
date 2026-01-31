document.documentElement.style.cursor = 'url("win98.cur"), auto';
document.body.style.cursor = 'url("win98.cur"), auto';

const startBtn = document.getElementById('startBtn');
const startMenu = document.getElementById('startMenu');
startBtn.addEventListener('click', () => {
  const visible = startMenu.style.display === 'block';
  startMenu.style.display = visible ? 'none' : 'block';
  startBtn.setAttribute('aria-expanded', String(!visible));
});

document.getElementById('startRestart').addEventListener('click', () => {
  try { window.open('https://whising.space','_blank','noopener'); }
  catch(e){ window.location.href='https://whising.space'; }
  startMenu.style.display='none';
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
  startMenu.style.display='none';
  window.location.href='login.html';
});

const icons = document.querySelectorAll('.icon');
const appWindow = document.getElementById('appWindow');
const appFrame = document.getElementById('appFrame');
const appTitle = document.getElementById('appTitle');
const closeBtn = document.getElementById('closeBtn');
const minBtn = document.getElementById('minBtn');

icons.forEach(icon => {
  const target = icon.dataset.target;
  const label = icon.querySelector('.label').textContent || 'App';
  function openApp() {
    appTitle.textContent = label;
    appFrame.src = target;
    appWindow.style.display = 'flex';
    appWindow.setAttribute('aria-hidden','false');
    addTaskItem(label);
  }
  icon.addEventListener('click', openApp);
  icon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openApp(); }
  });
});

closeBtn.addEventListener('click', () => {
  appWindow.style.display = 'none';
  appWindow.setAttribute('aria-hidden','true');
  appFrame.src = '';
  removeTaskItems();
});

minBtn.addEventListener('click', () => {
  appWindow.style.display = 'none';
  appWindow.setAttribute('aria-hidden','true');
});

const taskItems = document.getElementById('taskItems');
function addTaskItem(label) {
  if ([...taskItems.children].some(c => c.textContent === label)) return;
  const el = document.createElement('div');
  el.className = 'btn';
  el.textContent = label;
  el.addEventListener('click', () => {
    appWindow.style.display = 'flex';
    appWindow.setAttribute('aria-hidden','false');
  });
  taskItems.appendChild(el);
}
function removeTaskItems() { taskItems.innerHTML = ''; }

function updateClock(){
  const now=new Date();
  const hh=String(now.getHours()).padStart(2,'0');
  const mm=String(now.getMinutes()).padStart(2,'0');
  document.getElementById('clock').textContent=hh+':'+mm;
}
updateClock();
setInterval(updateClock,1000);

(function makeDraggable() {
  let dragging = false, offsetX = 0, offsetY = 0;
  const title = appWindow.querySelector('.titlebar');
  title.style.cursor = 'move';
  title.addEventListener('mousedown', (e) => {
    dragging = true;
    const rect = appWindow.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    appWindow.style.transition = 'none';
  });
  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    appWindow.style.left = (e.clientX - offsetX) + 'px';
    appWindow.style.top = (e.clientY - offsetY) + 'px';
    appWindow.style.transform = 'none';
  });
  document.addEventListener('mouseup', () => { dragging = false; appWindow.style.transition = ''; });
})();
