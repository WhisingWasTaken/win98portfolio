const FS = {
  'My Computer': {
    type: 'root',
    children: ['C:\\']
  },
  'C:\\': {
    type: 'drive',
    children: ['C:\\WINDOWS', 'C:\\Program Files', 'C:\\My Documents']
  },
  'C:\\WINDOWS': {
    type: 'folder',
    children: ['C:\\WINDOWS\\System32', 'C:\\WINDOWS\\Fonts', 'C:\\WINDOWS\\Media']
  },
  'C:\\WINDOWS\\System32': {
    type: 'folder',
    files: [
      { name: 'kernel32.dll',  type: 'dll',  size: '471 KB' },
      { name: 'ntdll.dll',     type: 'dll',  size: '668 KB' },
      { name: 'user32.dll',    type: 'dll',  size: '562 KB' },
      { name: 'regedit.exe',   type: 'exe',  size: '148 KB' },
      { name: 'cmd.exe',       type: 'exe',  size: '32 KB'  },
      { name: 'taskmgr.exe',   type: 'exe',  size: '111 KB' },
    ],
    photo: { src: '../photos/photo1.jpg', caption: 'photo1.jpg', top: '60px', left: '340px', rotate: '-3deg' }
  },
  'C:\\WINDOWS\\Fonts': {
    type: 'folder',
    files: [
      { name: 'arial.ttf',     type: 'font', size: '188 KB' },
      { name: 'times.ttf',     type: 'font', size: '202 KB' },
      { name: 'cour.ttf',      type: 'font', size: '95 KB'  },
    ],
    photo: { src: './icons/profile.png', caption: 'photo2.jpg', top: '80px', left: '280px', rotate: '2deg' }
  },
  'C:\\WINDOWS\\Media': {
    type: 'folder',
    files: [
      { name: 'chimes.wav',    type: 'wav',  size: '74 KB' },
      { name: 'chord.wav',     type: 'wav',  size: '24 KB' },
      { name: 'ding.wav',      type: 'wav',  size: '12 KB' },
    ],
    photo: { src: '../photos/photo3.jpg', caption: 'photo3.jpg', top: '50px', left: '310px', rotate: '4deg' }
  },
  'C:\\Program Files': {
    type: 'folder',
    children: ['C:\\Program Files\\Common Files', 'C:\\Program Files\\Internet Explorer']
  },
  'C:\\Program Files\\Common Files': {
    type: 'folder',
    files: [
      { name: 'msvcrt.dll',    type: 'dll',  size: '302 KB' },
      { name: 'oleaut32.dll',  type: 'dll',  size: '627 KB' },
      { name: 'comctl32.dll',  type: 'dll',  size: '534 KB' },
    ]
  },
  'C:\\Program Files\\Internet Explorer': {
    type: 'folder',
    files: [
      { name: 'iexplore.exe',  type: 'ie',  size: '91 KB' },
      { name: 'iecompat.dll',  type: 'dll',  size: '42 KB' },
      { name: 'iertutil.dll',  type: 'dll',  size: '1.3 MB' },
    ]
  },
  'C:\\My Documents': {
    type: 'folder',
    files: []
  },
  'C:\\Desktop': { type: 'folder', files: [] },
  'Desktop': { type: 'folder', children: ['C:\\', 'C:\\My Documents'] }
};

function iconSrc(type) {
  const map = {
    folder: './icons/folder.png',
    drive:  './icons/drive.png',
    dll:    './icons/dll.png',
    exe:    './icons/exe.png',
    ie:    './icons/ie.png', //IE get special treatment fs
    font:   './icons/font.png',
    wav:    './icons/wav.png',
  };
  return map[type] || '';
}
let currentPath = 'C:\\WINDOWS';

function navigate(label, path) {
  currentPath = path;
  document.getElementById('addr-input').value = path;
  renderContent(path);
}

function renderContent(path) {
  const area = document.getElementById('file-area');
  const pane = document.getElementById('content-pane');
  area.innerHTML = '';

  pane.querySelectorAll('.scattered-photo').forEach(el => el.remove());

  const node = FS[path];
  if (!node) {
    document.getElementById('status-count').textContent = '0 object(s)';
    return;
  }

  let count = 0;
  const items = [];

  if (node.children) {
    node.children.forEach(childPath => {
      const name = childPath.split('\\').pop() || childPath;
      items.push({ name, type: 'folder', size: '' });
      count++;
    });
  }

  if (node.files) {
    node.files.forEach(f => {
      items.push(f);
      count++;
    });
  }

  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'file-item';

    const icon = document.createElement('div');
    icon.className = 'file-icon';
    const src = iconSrc(item.type);
    if (src) {
      icon.innerHTML = `<img src="${src}" onerror="this.style.display='none'">`;
    }

    const lbl = document.createElement('div');
    lbl.className = 'file-label';
    lbl.textContent = item.name;

    el.appendChild(icon);
    el.appendChild(lbl);

    el.onclick = (e) => {
      document.querySelectorAll('.file-item').forEach(x => x.classList.remove('selected'));
      el.classList.add('selected');
      document.getElementById('status-size').textContent = item.size || '';
      e.stopPropagation();
    };

    if (item.type === 'folder') {
      el.ondblclick = () => {
        const childPath = node.children.find(c => c.endsWith(item.name));
        if (childPath) navigate(item.name, childPath);
      };
    }

    area.appendChild(el);
  });

  document.getElementById('status-count').textContent = count + ' object(s)';

  if (node.photo) {
    const p = node.photo;
    const photoEl = document.createElement('div');
    photoEl.className = 'scattered-photo';
    photoEl.style.top = p.top;
    photoEl.style.left = p.left;
    photoEl.style.transform = `rotate(${p.rotate})`;
    photoEl.innerHTML = `
      <img src="${p.src}" alt="${p.caption}" onerror="this.style.background='#c0c0c0';this.alt='[photo]'">
      <div class="photo-caption">${p.caption}</div>
    `;
    makeDraggable(photoEl, pane);
    pane.appendChild(photoEl);
  }

  pane.onclick = () => {
    document.querySelectorAll('.file-item').forEach(x => x.classList.remove('selected'));
    document.getElementById('status-size').textContent = '';
  };
}

function toggleNode(nodeId, e) {
  e && e.stopPropagation();
  const ch = document.getElementById(nodeId);
  const tog = document.getElementById('toggle-' + nodeId);
  if (!ch) return;
  if (ch.classList.contains('open')) {
    ch.classList.remove('open');
    if (tog) tog.textContent = '+';
  } else {
    ch.classList.add('open');
    if (tog) tog.textContent = '-';
  }
}

function selectNode(el) {
  document.querySelectorAll('.tree-node').forEach(n => n.classList.remove('selected'));
  el.classList.add('selected');
}

function makeDraggable(el, container) {
  let ox = 0, oy = 0, dragging = false;

  el.addEventListener('mousedown', e => {
    dragging = true;
    ox = e.clientX - el.offsetLeft;
    oy = e.clientY - el.offsetTop;
    el.style.zIndex = 20;
    e.preventDefault();
    e.stopPropagation();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    let x = e.clientX - ox;
    let y = e.clientY - oy;
    const cr = container.getBoundingClientRect();
    x = Math.max(0, Math.min(x, cr.width - el.offsetWidth));
    y = Math.max(0, Math.min(y, cr.height - el.offsetHeight));
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
    el.style.zIndex = 10;
  });
}

// for init
document.getElementById('node-desktop').classList.add('open');
document.getElementById('toggle-node-desktop').textContent = '-';
document.getElementById('node-mycomputer-ch').classList.add('open');
document.getElementById('toggle-node-mycomputer-ch').textContent = '-';

navigate('WINDOWS', 'C:\\WINDOWS');