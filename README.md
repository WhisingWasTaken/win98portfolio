# WebEmu

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Hack Club](https://img.shields.io/badge/Hack_Club-%23EC3750.svg?style=flat&logo=Hack-Club&logoColor=white)](https://hackclub.com/)
[![Netlify](https://img.shields.io/badge/deployed%20on-Netlify-00C7B7)](https://netlify.com)
[![Nostalgist.js](https://img.shields.io/badge/nostalgist.js.org-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black)](https://nostalgist.js.org)
[![libretro](https://img.shields.io/badge/cores-libretro-orange)](https://github.com/libretro)

Browser-based retro emulator. Drop a ROM and play. No installs, no accounts, no plugins.

**Live Demo:** [your-site.netlify.app](https://your-site.netlify.app)

## Features

- 6 systems: NES, SNES, Game Boy / GBC / GBA, Game & Watch, Genesis / Mega Drive, Game Gear
- Save states and load states
- Rewind and fast forward
- Automatic cover art via libretro-thumbnails
- Volume control via Web Audio API GainNode
- Dark mode, persisted across pages via localStorage
- Drag and drop ROM loading or URL input
- Vanilla JS and CSS

## Systems and Cores

| System | Core |
|---|---|
| NES / Famicom | fceumm |
| Super NES / Super Famicom | snes9x |
| Game Boy / GBC / GBA | mGBA |
| Game & Watch | gw |
| Genesis / Mega Drive | genesis_plus_gx |
| Game Gear | gearsystem |

## How it works

Emulation runs entirely in the browser via [Nostalgist.js](https://nostalgist.js.org), which wraps libretro cores compiled to WebAssembly through Emscripten. Cover art is fetched from the [libretro-thumbnails](https://github.com/libretro-thumbnails) CDN on jsDelivr, matched against the ROM filename with region-tag stripping.

## Getting Started
```bash
git clone https://github.com/Whisingdilli71/webemu.git
cd webemu
open index.html
```

No build step required. Open `index.html` in any modern browser.

## Star the repository

I would really appreciate it!
