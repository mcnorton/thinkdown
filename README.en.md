<div align="center">

<img src="assets/icon.png" width="88" alt="Thinkdown">

# Thinkdown

### Think it down to mark it down.

Light on the mind, sharp on the output.

[![Latest release](https://img.shields.io/github/v/release/mcnorton/thinkdown?label=latest&color=2563eb)](https://github.com/mcnorton/thinkdown/releases/latest)
![Platform](https://img.shields.io/badge/macOS_·_Windows_·_Linux-000)
![No sign-up](https://img.shields.io/badge/sign--up-none-16a34a)

**[⬇︎ Download](#download)** · [Guide](https://www.thinkdown.net/guide.html) · [Website](https://www.thinkdown.net/) · [한국어](README.md)

</div>

![Thinkdown — document explorer, mind map canvas, and Markdown pane](assets/screenshot-light.png)

<p align="center"><sub>Spread your thinking out as a mind map, a Markdown document appears on the right, and <code>F5</code> turns it into a presentation.</sub></p>

## Sound familiar?

**The cursor blinks in the AI chat box.** The screens, the rules, the edge cases are all in your
head — but where do you even start? So you type whatever comes first, and the one reason that
mattered gets left out.

**A blank editor is open.** You know there is something to say, but nothing starts until the
first sentence does. Writing isn't the hard part — having to pick the order first is.

Thoughts never arrive in order. Thinkdown removes the wall between the freest way to get them
out — a **mind map** — and the clearest way to hand them over — a **written document**. **The map
is the document**, so there is nothing to retype. Get it all out first, put things in place
later, and the order appears then.

## How it gets used

- **A prompt the AI gets the first time** — name what you're building, then branch out screens,
  logic and edge cases. On the right, a Markdown prompt with headings and items is already
  written; one **[Copy]** and it's in the AI chat. The why travels along with the what.
- **When the first draft won't come** — "Don't write — just make a box for each thing you think
  of." Drop words and short sentences, drag the boxes around like blocks, and a beginning, middle
  and end take shape on their own. The draft is already waiting on the right.
- **Plans, meeting notes, lecture notes** — rough out the big pieces, then fill them in. Hang
  ideas on branches as they come, tidy the tree at the end, and share it as is.

## Four steps

| | |
|---|---|
| **1. Spill it out** | `Tab` goes a level down, `Enter` stays on the same level. Keep up with your thinking without touching the mouse — whole sentences and long paragraphs welcome. |
| **2. Shape it** | Drop a box onto another and it goes underneath; drop it between two and the order changes. Move a whole chapter and the heading levels follow. |
| **3. Harvest it** | The document is already on the right. No export, no conversion — just **[Copy]**. Click a chapter to take only that part. |
| **4. Show it** | Press `F5` and the document becomes a slideshow as it is. Spend the time on what you'll say, not on making slides. |

While you build the map, Markdown like this is already written on the right:

```markdown
# Role

You are a senior code reviewer. Read only the changed code, and report what actually breaks first.

# Input

- The diff and its target branch
- Test results

# Output format

| Field | Content |
| --- | --- |
| Severity | high / medium / low |
| Location | file:line |
```

![Dark theme — the right pane switched to the rendered preview](assets/screenshot-dark.png)

![The same document running as a slideshow](assets/screenshot-slideshow.png)

## And also

- **Nine kinds of standard Markdown content** — paragraphs, lists, quotes, code, tables, images, links and more. Tables are edited cell by cell; links show up as cards with a title and thumbnail
- Several layouts, including a **butterfly** layout that spreads long documents to both sides
- **Folders**, and **search** that jumps you straight to the line
- Polished on all three operating systems so Korean (IME) input never breaks or doubles up
- Colour themes, **dark mode**, and a bright colour for every chapter
- **Undo** and redo — try things freely; deleted documents wait in the **Trash**
- Back everything up as **one .zip** and restore it on a new computer; import and export single documents as **.md**
- Updates download without interrupting your work and install on the next start — after backing your documents up first

## Pricing

**Every feature is free.** Documents, folders, search, import and export, backup, the slideshow,
and every feature added later — no account, no sign-in.

**Gift 🎁** — Finding it useful? [A cup of coffee](https://buymeacoffee.com/mcnorton) for the
developer, and a thank-you gift for you. One donation opens up to 3 devices, for life.

- 🎁 Seoul City · Seoul Palace colour themes
- 🎁 Fruit tree · Root vegetable layouts
- 🎁 Custom fonts

> 📣 **Beta event: Open the gift box** — the 🎁 gifts are open to everyone until the beta ends.
> Receiving gifts in the app as a supporter is coming soon.

## Download

**[⬇︎ Get the file for your OS from the latest release](https://github.com/mcnorton/thinkdown/releases/latest)**

| OS | File | Install |
|---|---|---|
| **macOS** 13+ — Apple Silicon (M1 or newer) | `Thinkdown-<version>-arm64.dmg` | Open it and drag **Thinkdown** into Applications |
| **macOS** 13+ — Intel | `Thinkdown-<version>-x64.dmg` | Same as above |
| **Windows** 10 · 11 (64-bit) | `Thinkdown-Setup-<version>.zip` (or `.exe`) | Unzip and run `Thinkdown-Setup` — no administrator rights needed |
| **Linux** (64-bit) | `Thinkdown-<version>.AppImage` or `.deb` | `chmod +x` the AppImage, or `sudo dpkg -i` the deb |

- Not sure which Mac you have? **Apple menu → About This Mac**. "Apple M…" means arm64, "Intel" means x64.
- The macOS build is signed and notarised by Apple, so it opens without any warning.
- On macOS 11 · 12, v0.22.100 is the last version.

<details>
<summary><b>If Windows shows a warning</b></summary>

<br>

The installer is code-signed, so the install screen shows the publisher name
(**McNorton&Education**). Signing is new, though, so **SmartScreen** may still warn until the
certificate builds reputation — choose **More info → Run anyway** and it installs.

- **If there is no "Run anyway" at all**, that PC has **Smart App Control** turned on. You can
  check it under **Settings → Privacy & security → Windows Security → App & browser control**;
  it is only on by default on clean installs of Windows 11.
- If **Reputation-based protection → Check apps and files** on the same screen is set to
  **Block**, the app is blocked too. Switching it to **Warn** lets you through.

</details>

## Getting started

1. Double-click the **document title** in the middle and give it a name.
2. `Tab` — a heading one level down. `Enter` — another one on the same level.
3. `Shift+Enter` — a paragraph under the heading. Headings are the skeleton, paragraphs the flesh.
4. Move between nodes with the arrow keys, double-click to edit, `Esc` to finish.
5. **[Copy]** at the top right — ready to paste into an AI chat, an email, anywhere.

Typing `- ` at the start of a paragraph makes a bullet, `1. ` a numbered list, `> ` a quote. You
don't need to know Markdown — it's just faster if you do.

The full guide lives in the app: the **Thinkdown Guide** folder on the left holds a **Quick
guide** and the **Manual** (if you deleted them, **Help → Restore Guides**). On the web, see the
[guide page](https://www.thinkdown.net/guide.html).

## Questions

<details>
<summary><b>How is this different from other mind-map apps?</b></summary>

<br>

Branches hold **sentences**, not keywords. A traditional mind map records keywords meant to
trigger recall, so the detailed thinking stays inside the author's head. In Thinkdown a branch
holds the body text itself, so branches arranged along your train of thought end up being the
document. It exists as three views at once — map, Markdown and preview — and you can select any
branch to copy or export just that part.

</details>

<details>
<summary><b>Do I need to know Markdown?</b></summary>

<br>

You don't. Markdown is the output, not the input method. Write sentences on branches and grow
them with `Tab` and `Enter`. You never have to type a marker, though they work if you do. Tables
are filled cell by cell. A `#` inside a sentence you've already written stays plain text, so a
stray keystroke can't scramble your outline.

</details>

<details>
<summary><b>Does it work alongside Obsidian and other note apps?</b></summary>

<br>

They fit together well. Note apps shine at linking what you've already written; Thinkdown
focuses on building the skeleton of one piece from a blank screen. Shape it as a map, then
[Copy] it or export it as `.md` into your note app — it's standard Markdown, so it reads as is.

</details>

<details>
<summary><b>Will the AI draw the map for me?</b></summary>

<br>

Quite the opposite. **Don't hand the thinking over to AI** — that is what this project is about.
Students who drew a concept map themselves learned far more than those handed a finished one
([STEM concept-mapping meta-analysis](https://link.springer.com/article/10.1186/s40594-025-00554-2)).
We think AI fits best where it points at what is missing in a structure you have already made.
[Read more →](https://www.thinkdown.net/think.html)

</details>

<details>
<summary><b>Can I back up or move to a new computer?</b></summary>

<br>

Back up every document and your folder structure as a single `.zip`; on a new computer, install
the app and restore from that file. Individual documents also export as `.md`. And every time
the app updates, it first backs your documents up automatically and keeps the last three.

</details>

## Your documents stay on your machine

No account, no server, no tracking. Every document lives on this computer and none of it leaves.
The app touches the network for two things only — **checking for updates** and **fetching link
thumbnails** (only from that link's site, and you can turn it off). Opening, editing, saving and
exporting all work with no connection at all. Take everything out any time as a `.zip` backup or
`.md` files — nothing you've written is ever locked behind a paywall.

---

<div align="center">
<sub>© 2026 McNorton &amp; Education · Found a problem or want a feature? Tell us in <a href="https://github.com/mcnorton/thinkdown/issues">Issues</a>.</sub>
</div>
