# 💣 Minesweeper: The 20-Year Evolution (2003 – Present)

> *"Minesweeper was my first attempt at making (re-creating) a game. I have captured some of the different iterations over the years."* — Wally Atkins

Welcome to the **Minesweeper Archive**, a digital time capsule documenting the evolution of web development, gaming logic, and browser platforms over more than two decades.

---

## ⏳ The Eras of Web Gaming

```
 2003: Web 1.0 DHTML                   2006: The Flash Golden Age            2026: The Cyberpunk Revival
 [Internet Explorer 6 & DOM]           [NeoSwiff: C# WinForms to SWF]        [React 19, Web Audio & Konami Code]
  - document.all DOM traversal          - Written in C# Windows Forms         - Neon cyber-arcade aesthetic
  - Table & IMG sprite tiles            - Compiled to Flash .swf bytecode     - First-click protection & radar scans
  - Recursive flood-fill                - Rare preserved SWF artifact         - Easter egg on wallyatkins.com
```

---

## 🕹️ 1. The 2003 Edition: Pure DHTML & The Browser Wars

Located in [`2003/`](./2003/):
* **Context**: Built during the reign of Internet Explorer 6 for **Cavalier Web Design** (`cavalierwebdesign.com`).
* **Technology**: Vanilla JavaScript, HTML 4.01 Transitional, and CSS.
* **Architectural Highlights**:
  * **DOM Quirks**: Built when `document.all` was the primary high-performance way to access DOM elements in IE.
  * **Hungarian Notation**: Strict semantic prefixes (`boolGameOver`, `arrRows`, `strStatus`, `intSurroundingMines`, `intGameTime`).
  * **Sprite System**: Hand-crafted classic 16x16 GIF images (`0.gif` through `8.gif`, `mine.gif`, `flag.gif`, `question.gif`, `unclicked.gif`).
  * **Recursive Flood-Fill**:
    ```javascript
    this.displaySurroundings = function(row, col) {
        // Recursively inspects adjacent nodes and reveals zero-mine clearings
    }
    ```
* **How to Run**: Simply open [`2003/mine.htm`](./2003/mine.htm) in any web browser.

---

## ⚡ 2. The 2006 Edition: NeoSwiff & The Flash Frontier

Located in [`2006/`](./2006/):
* **Context**: The mid-2000s saw the peak of Macromedia / Adobe Flash as the undisputed king of casual web gaming and animation.
* **The NeoSwiff Experiment**:
  * **NeoSwiff** was a revolutionary, short-lived compiler that allowed developers to write standard **C# (.NET / Windows Forms)** code and compile it directly into an **Adobe Flash `.swf` file**.
  * Class structure: `com.wallyatkins.games.neomines.NeoMines`, `NeoMineBoard`, `NeoMineNode`.
  * Preserved artifact: [`2006/bin/Release/NeoMines.swf`](./2006/bin/Release/NeoMines.swf) (156 KB). Because the NeoSwiff compiler has since vanished from the web, this binary remains as a rare historical snapshot of early cross-compilation.

---

## 💎 3. The 2026 Edition: Neo-Mines Turbo Bling

In 2026, Minesweeper was reimagined as a hidden, tricked-out arcade experience embedded inside [wallyatkins.com](https://wallyatkins.com):
* **Trigger**: Activated via the legendary **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`) on the personal website.
* **Features**:
  * **Cyberpunk / Turbo Bling Aesthetics**: Glowing neon cell borders, diamond mines, CRT scanlines, and screen shake.
  * **First-Click Protection**: Guarantees you never detonate a mine on click #1.
  * **Power-Ups**: 🔍 *Radar Scan* (uncovers safe zones) and 🛡️ *Mine Shield* (absorbs an accidental blast).
  * **Combo System**: Rapid sweeps build a score multiplier with floating arcade feedback.
  * **Chiptune Audio Synthesizer**: Procedural 8-bit sound effects synthesized live in-browser with the Web Audio API.

---

## 📂 Repository Structure

```
├── 2003/                      # The original DHTML / Web 1.0 implementation
│   ├── mine.htm               # Classic IE-era game page
│   ├── mine_files/            # mine.js and mine.css
│   └── *.gif                  # Original 16x16 tile assets
├── 2006/                      # The C# to Flash / NeoSwiff port
│   ├── NeoMines.ccs           # C# WinForms main window
│   ├── NeoMineBoard.ccs       # C# Board and matrix logic
│   ├── NeoMineNode.ccs        # Node entity representation
│   └── bin/Release/           # Preserved NeoMines.swf Flash binary
├── index.html                 # Interactive retro museum runner (Play 2003 & 2006)
└── README.md                  # This chronicle
```
