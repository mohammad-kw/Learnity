# Learnity — Issues & Fixes

A detailed log of the **problems encountered** during development and **how each was resolved**, including the full diagnostic approach. Useful for interviews and for future maintainers.

---

## 1. Razorpay key never reached the browser

**Symptom:** Razorpay checkout wouldn't open; the payment key was `undefined` in the browser.

**Investigation:**

- Traced the checkout code in `src/services/operations/studentFeaturesAPI.js`.
- Found it read `process.env.RAZORPAY_KEY`.
- Recalled that **Create React App only injects environment variables prefixed with `REACT_APP_`** into the client bundle. Any other variable is `undefined` in the browser.

**Fix:** Changed the frontend reference to `process.env.REACT_APP_RAZORPAY_KEY` and documented `REACT_APP_RAZORPAY_KEY` in `.env.example`.

**Lesson:** Server secrets (like the Razorpay **secret**) must stay on the server; only the **public** key belongs in the frontend, and it must be `REACT_APP_`-prefixed.

---

## 2. SMTP emails at risk of rejection

**Symptom:** The mail `from` field was a bare label (`'Learnity'`) rather than a valid address, which many SMTP servers reject or mark as spam.

**Fix:** Updated `server/utils/mailSender.js` to use a properly formatted named sender: `` `Learnity <${process.env.MAIL_USER}>` ``.

**Lesson:** Always send a valid, authenticated `from` address matching the SMTP account.

---

## 3. `ffmpeg` unavailable for video compression

**Symptom:** Wanted to compress a large (~2.5 MB) hero video to speed up startup, which needed `ffmpeg`.

**Investigation & attempts:**

- `winget` install was blocked by corporate **group policy**.
- Installing `ffmpeg-static` via npm/pnpm failed due to a corporate **TLS proxy** (`UNABLE_TO_GET_ISSUER_CERT_LOCALLY`).

**Resolution:** Skipped compression (network-blocked). Instead mitigated startup cost with `preload="none"` on the video and lazy-loading routes. Removed the unused `ffmpeg-static` dependency.

**Lesson:** In locked-down environments, prefer solutions that don't require external binary downloads; achieve the goal (faster load) a different way.

---

## 4. Uneven review card heights

**Symptom:** Cards in the ReviewSlider had different heights, breaking the visual grid.

**Root cause:** Swiper doesn't stretch slides to equal height by default.

**Fix:**

- Added a scoped `reviewSwiper` class and CSS rules to stretch slide wrappers (`align-items: stretch`, `height: auto`).
- Made each card `h-full` and pushed the rating to the bottom with `mt-auto`.
- Added `!h-auto` on `SwiperSlide`.

**Lesson:** Flex/`stretch` alignment plus explicit slide auto-height fixes uneven carousel cards.

---

## 5. About-page hero text overlapping images

**Symptom:** The hero heading text touched/overlapped the banner images positioned below it.

**Root cause:** The banner images were absolutely positioned with a `translate-y-[50%]` offset, but the header didn't reserve enough bottom space.

**Fix:** Increased the header's bottom padding (`pb-40 lg:pb-48`) to create room for the overlapping images.

---

## 6. Duplicate default export broke four pages

**Symptom:** Build failed with `Only one default export allowed per module`, and the browser threw `Element type is invalid. ... Lazy element type must resolve to a class or function` on the four legal pages.

**Investigation:**

- A mid-edit state briefly left a file with **two `export default` statements**.
- This made webpack fail to build those lazy-loaded chunks.
- `React.lazy` had **cached the rejected/invalid module promise**, so even after fixing the source, the running page kept throwing until the bundle was reloaded fresh.

**Fix:**

- Corrected the files to a single default export each.
- Cleared the CRA/webpack cache (`node_modules/.cache`) and restarted the dev server to emit clean chunks.
- Advised a hard refresh / "Empty Cache and Hard Reload" / incognito to drop the stale in-memory lazy chunk.

**Lesson:** `React.lazy` memoizes the import promise; a poisoned chunk persists across soft refreshes. A clean rebuild + full reload is required.

---

## 7. Editor buffer vs. disk desync (0-byte files)

**Symptom:** Terminal reported the four legal page files as **0 bytes**, while the editor still showed old content; edits weren't sticking.

**Root cause:** A faulty PowerShell read/write loop wrote empty strings to disk, while VS Code held **unsaved buffers** with older content — the two were out of sync.

**Fix:**

- Rewrote each file's full, correct Learnity-branded content **directly to disk** via `System.IO.File.WriteAllText` using here-strings.
- Verified non-zero byte sizes and absence of old branding/placeholders on disk.
- Warned to **Revert File** (not Ctrl+S) on any stale editor tabs so the good disk versions weren't overwritten.

**Lesson:** When automating file writes, beware of unsaved editor buffers; verify on-disk byte size and content after writing, and reconcile the editor state.

---

## 8. Leftover build warning (`Course_Card`)

**Symptom:** Persistent lint warning: _Imported JSX component `Course_Card` must be in PascalCase or SCREAMING_SNAKE_CASE._

**Fix:** Aliased the import to `CourseCard` in `AllCourses.jsx` (keeping the underlying file name) and updated its usage. Warning cleared; build became warning-free.

---

## 9. Slow startup investigation

**Symptom:** The site took a long time to load on startup.

**Findings:** Combination of development mode (unminified, HMR), a large hero video asset, and initial API calls (categories, etc.).

**Mitigations applied:** Lazy-loaded routes (code-splitting), `preload="none"` on the hero video, removed unnecessary eager imports. (Video compression was blocked by network policy — see #3.)

---

## General Debugging Approach Used

1. **Reproduce** and read the exact error text.
2. **Locate** the responsible file(s) via search/grep.
3. **Form a hypothesis** about the root cause (not just the symptom).
4. **Verify** the hypothesis (inspect env, bytes, build output, caches).
5. **Apply the minimal correct fix.**
6. **Confirm** with `get_errors`, a clean rebuild, and a browser check.
7. **Document** the lesson to prevent recurrence.
