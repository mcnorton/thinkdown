<div align="center">

<img src="assets/icon.png" width="88" alt="Thinkdown">

# Thinkdown

### From think it down to mark it down.

Write your thinking down as a tree — it is already Markdown.

[![Latest release](https://img.shields.io/github/v/release/mcnorton/thinkdown?label=latest&color=2563eb)](https://github.com/mcnorton/thinkdown/releases/latest)
![Platform](https://img.shields.io/badge/macOS_·_Windows_·_Linux-000)

**[⬇︎ Download](https://github.com/mcnorton/thinkdown/releases/latest)** · [한국어](README.md)

</div>

![Thinkdown — document explorer, mind map canvas, and Markdown pane](assets/screenshot-light.png)

## Why Thinkdown

Thinking works best as a tree. What you hand over is Markdown. So you do the work twice —
shape the structure in a mind map tool, then reopen an editor and retype it. The hierarchy
drifts on the way across, and later you can't tell which copy is the current one.

Thinkdown **removes the retyping step.** The map *is* the document.
Every node you add is a Markdown block; move a branch and the outline moves with it.
The pane on the right is always current, so shipping it is one **[Copy]** away.

## What people build with it

|  |  |
|---|---|
| **AI prompts, skills, agent definitions** | Split role, input, rules, and output format into branches, then paste clean Markdown. Moving a whole block of rules elsewhere is one drag. |
| **Outlines for specs and proposals** | Block out the big pieces first, fill them in after. Reorder a chapter as a whole when the flow feels wrong. |
| **Meeting and lecture notes** | Hang points off branches as they come, tidy the tree at the end, share it as is. |
| **READMEs and doc tables of contents** | Tables, code blocks, links, and images live in nodes — export the whole document or a single chapter. |

## The map is the Markdown

The map in the screenshot above keeps this Markdown ready on the right. There is no
conversion step in between.

```markdown
# Role

You are a senior code reviewer. Read only the changed code and report what actually breaks.

# Input

- The diff and the target branch
- Test results
- Review depth (low / medium / high)

# Output format

| Field | Value |
| --- | --- |
| Severity | high / medium / low |
| Location | file:line |
```

**Click a heading node and the scope narrows to that chapter** — preview, copy, and export
follow it. Handy when you only need one slice of a long document.

## What makes it good

| | |
|---|---|
| ⌨️ **Your hands never leave the keys** | `Tab` for a child, `Enter` for a sibling. Grow the whole tree without reaching for the mouse. |
| 🧩 **Eight body types** | Paragraph, bullet, outline, quote, code, table, image, link. Tables are edited cell by cell in a real grid; images preview inline. |
| 🌿 **Restructure by dragging** | Drop on a node to move under it (heading depth adjusts itself); drop between nodes to reorder. You're editing the outline, not moving coordinates. |
| ♻️ **Lossless round trip** | Documents are stored as Markdown. Export it, import it back, and the tree comes back intact. |
| 📁 **Folders and search** | Group documents into folders and drag them around. Search spans the current document and every other one, then takes you to the node. |
| ↩️ **Undo / redo** | `⌘Z` and `⇧⌘Z`. A run of typing collapses into a single step. |
| 🌗 **Light and dark** | Follow the system or pick one. An optional colour theme tints each branch. |
| 💾 **Files in, files out** | Import and export `.md`, back up everything to a `.zip` and restore it. |
| 🔄 **Stays current** | New versions download quietly and apply on the next restart — on macOS, Windows, and Linux alike. |

![Dark mode, with the rendered preview on the right](assets/screenshot-dark.png)

The right pane switches between **raw Markdown** and a **rendered preview**, so you can see
how it will actually look before you send it.

## Download

**[⬇︎ Grab the file for your OS from the latest release](https://github.com/mcnorton/thinkdown/releases/latest)**

| OS | File | Install |
|---|---|---|
| **macOS** — Apple Silicon (M1 or newer) | `Thinkdown-<version>-arm64.dmg` | Open it and drag **Thinkdown** into Applications |
| **macOS** — Intel | `Thinkdown-<version>-x64.dmg` | Same as above |
| **Windows** 10 / 11 (64-bit) | `Thinkdown-Setup-<version>.exe` | Run it — no administrator rights needed |
| **Linux** (64-bit) | `Thinkdown-<version>.AppImage` or `.deb` | `chmod +x` the AppImage, or `sudo dpkg -i` the deb |

- Not sure which Mac you have? **Apple menu → About This Mac**. "Apple M…" means arm64,
  "Intel" means x64.
- macOS builds are signed and notarized with an Apple Developer ID, so they open without warnings.
- Windows builds are **code-signed**, so the install screen shows the publisher name
  (**McNorton&Education**). Signing is new, though, so **SmartScreen may still warn** until the
  certificate builds reputation — choose **More info → Run anyway** and it installs.
  - **If there is no "Run anyway" at all**, that PC has **Smart App Control** turned on. It can block
    even signed apps that have no reputation, with no per-app exception. Check under **Settings → Privacy & security →
    Windows Security → App & browser control**; it is only on by default on **clean installs** of
    Windows 11 (not on upgraded PCs or Windows 10).
  - Execution is also blocked if **Reputation-based protection → Check apps and files** is set to
    **Block** on that same screen. Switching it to **Warn** lets you through.
- No account, no sign-in. Every feature is free to use today.

## Your first sixty seconds

1. Click the **document title** in the centre and name it.
2. `Tab` gives you a child heading. `Enter` gives you a sibling on the same level.
3. On a heading, `Shift+Enter` attaches a body node. `Alt+1`–`8` changes its type.
4. **Click a heading** in the map and the Markdown on the right narrows to that chapter.
5. Hit **[Copy]** at the top right — ready to paste.

---

# How to use it

Worth knowing early. Read it in order or come back when you need it.

## A node has three states

One click **selects** it, a double click **edits** it, and otherwise it's read-only.
That's why the same `Enter` does two things: while selected it creates a new node, while
editing it finishes your input. `Enter` or `Esc` ends editing.

**Only `Esc` clears the selection.** Finishing your input doesn't, and neither does clicking
empty canvas — the node you just wrote stays selected until you pick another one. Keyboard
work never loses track of where you are.

**The selected node never leaves the screen.** If adding a node or a late-arriving link
thumbnail pushes the map around, that node comes back to the **centre** of the frame. A node
you scrolled away from yourself is left alone — the view is not yanked back.

**The app leaves the zoom level alone.** Switch on **[Auto Zoom]** above the canvas and, when the
node you pick won't fit on screen together with its heading, the map shrinks a little to show
both — only when you cross into another chapter, and it returns to full size as soon as you
double-click to edit. It starts switched off.

## Growing the tree

| Key | Does |
|---|---|
| `Tab` | Creates a **child heading**. On the document title, that's your first chapter. |
| `Enter` (selected) | Creates a **sibling** — a heading next to a heading, a body node of the same type next to a body node. |
| `Shift+Enter` (on a heading) | Attaches a **body node** to that heading, at any depth. |
| `Esc` | Ends editing and returns to the selected state. |

> A brand-new empty node won't spawn siblings (it shakes instead). It keeps you from
> filling the map with blanks.

## Moving around with the keyboard

Once a node is selected, the arrow keys walk you around the map.

| Key | Does |
|---|---|
| `←` | Goes to the **parent**. From a top-level chapter, that's the document title. |
| `→` | Goes to the **first child**. A heading with folded paragraphs unfolds on the way in. |
| `↑` `↓` | Goes to the node **directly above or below** at the same level — across chapters, too. |
| `Shift`+arrow | Leaves the selection where it is and pages **the view** that way. |

> The arrows move between nodes only while a node is **selected**. While you're editing, they
> move the cursor inside the text as usual.

## Body types — `Alt+1` to `Alt+9`

Press these while a body node has focus.

| Key | Type | Markdown |
|---|---|---|
| `Alt+1` | Paragraph | plain text |
| `Alt+2` | Bullet | `* item` |
| `Alt+3` | Outline | `1. item` |
| `Alt+4` | Quote | `> quote` |
| `Alt+5` | Code | a fenced code block |
| `Alt+6` | Table | a GFM table, edited in a grid |
| `Alt+7` | Image | `![alt](url)` |
| `Alt+8` | Link | `[text](url)` |
| `Alt+9` | Divider | `---`, a horizontal rule (no content, and no connector line) |

You can also **click the type tag** at the node's top-left, or **right-click → change type**.
Note that a node with content only switches among the text types (paragraph, bullet, outline,
quote, code) — turning it into a table, image, or link would throw the text away, so those
conversions are reserved for the `Alt` shortcuts.

**Typing switches types too.** In a paragraph, `1. ` turns it into an outline, `* ` or `- `
into a bullet list, and a `https://…` followed by a space into a link.

## Inside a list (bullet, outline, quote)

A list lives in one node, several lines deep. Markers and numbers take care of themselves.

- `Enter` — next item at the same depth.
- `Tab` / `Shift+Tab` — indent or outdent the item (numbering recalculates).
- `Backspace` at the start of an item — **merges it into the one above.** That's how you undo
  an `Enter` you didn't mean. If it's the only item and it's empty, the marker drops and it
  becomes a plain paragraph.

## Tables, images and links

- **Tables** open on a double click. `Tab` moves to the next cell, `Enter` to the row below
  (adding a row at the end). The gutter's **＋** adds a row or column, **🗑** removes one —
  both appear only while editing.
- **Images and links** are edited on the line you see. Each line is read-only until you
  **double-click the one you want to change**, and it becomes editable right there. `Tab` moves
  to the next field, `Enter` finishes.
  - **A new link only needs the address.** The label line isn't shown at all until it has a
    value — not even while you're editing, so there's no second field asking to be filled in.
    Type `example.com` without the `https://` and it is added for you on confirm.
  - Confirm the address and the node briefly shows `가져오는 중…` before the page's **title and
    cover image land together**. If the title can't be fetched, the label falls back to the
    domain (`example.com`).
  - **Once filled**, the label line appears; double-click to reword it — and a label you wrote
    survives a change of address.
    The **↗** at the end of the address line opens it in your browser after a confirmation.
  - Fetching means contacting that site, so you can turn it off under
    **Settings → General → Link node thumbnails**.
  - **Images behave identically** — everything said above about links applies as written: the
    address is all you enter, the label appears once it has been filled in for you, and you
    double-click it to reword it. Paste a **YouTube URL** and you get the video's poster with a
    **▶** on it, labelled with the video's title. Press ▶ or ↗ and it **opens in a window** to
    play there — nothing plays inside the map itself.
  - The picture itself is **never cropped**, though. A link's thumbnail is trimmed to the card's
    shape, but in an image node the picture *is* the content, so its proportions are kept. For the
    same reason a picture that fails to load **says so**, where a link thumbnail just disappears.

## Restructuring with the mouse

| Gesture | Result |
|---|---|
| Drop a node **onto** another node | It moves **under** that node. Headings re-level themselves (`#` → `##`). |
| Drop a node **between** two nodes | Only the sibling **order** changes; the hierarchy stays. |
| **↑ ↓** above and below a selected heading | Swaps the heading with the one before or after it under the same parent (paragraph siblings in between are skipped). Everything nested under it comes along. |
| **Right-click → delete** | Removes the node. If it has children, it tells you how many go with it first. |

> **Clearing a node's text never deletes it.** Right-click delete is the only way out, so no
> amount of `Backspace` will wipe out a branch by accident.

## Three rules about headings

- **A `#` typed in a paragraph is just a character** — it stays a tag and never promotes,
  so one paragraph can't jump the hierarchy.
- **The `#` mark in front of a heading is display only.** It is set apart from the title in size
  and colour, and it isn't editable, so it can't be deleted by accident. The level (how many `#`)
  changes only when you add a child with `Tab` or drag a branch somewhere else — one stray
  keystroke can never flatten the tree.
- **An empty heading** turns into a paragraph with one `Backspace` (as long as it has no children).

## Documents and panes

| Key | Does |
|---|---|
| `⌘N` | New document (an existing empty one is reused) |
| `⌘B` | Show / hide the explorer on the left |
| `⌘⌥B` | Show / hide the Markdown pane on the right |
| `⌘,` | Settings — theme, font, text size, editing width, connectors, backup, updates |
| `⌘Z` / `⇧⌘Z` | Undo / redo |
| `Ctrl` + wheel, or pinch | Zoom the map (drag empty space to pan) |

The **[Explorer]** and **[MD]** buttons in the bar on the left do the same — press once to open,
again to close. The Markdown pane on the right opens **only when you open it**; editing a
paragraph no longer pops it open, so close it whenever you want the canvas to yourself.

> On Windows and Linux, use `Ctrl` instead of `⌘`.

> While you're editing a node's text, `⌘Z` is the text field's own character-level undo.
> Finish editing (`Esc`) to undo changes to the map itself.

---

## Your data stays on your machine

No account, no server, no telemetry. Documents live on this computer and never leave it.
The app reaches the network for exactly two things — checking whether a newer version exists,
and fetching a link node's thumbnail (only from that link's own site, and you can switch it off).
You can take everything with you at any point via `.zip` backup or `.md` export.

## Development

It's a **vanilla JS ES module** single-page app with no build step, packaged for the desktop
with Electron. No bundler, no framework, no virtual DOM — every mutation goes through
`core/model.js` and a single observer redraws the view. Architecture, module, and data-model
documents live under `docs/` in the repository (written in Korean).

```bash
npm start      # run the Electron desktop app (dev)
npm test       # pure-logic tests (node --test test/*.test.mjs)
npm run dist   # build the desktop app → dist/<version>/
```

---

<div align="center">
<sub>© 2026 mcnorton · Found a problem or want a feature? Open an <a href="https://github.com/mcnorton/thinkdown/issues">issue</a>.</sub>
</div>
