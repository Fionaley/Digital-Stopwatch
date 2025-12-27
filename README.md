# ⏱ Digital Stopwatch (Analog + Digital)

A high-precision **digital stopwatch with an analog dial**, built using **vanilla HTML, CSS, and JavaScript**.
The application combines a traditional stopwatch interface with modern animation and accurate time measurement.

This project demonstrates **time-based animation, performance timing, and responsive UI design** without external libraries.

---

## 📁 Project Structure

```
stopwatch/
 ├── index.html   # Stopwatch layout and controls
 ├── style.css    # Analog dial, animations, and responsive styling
 └── script.js    # Stopwatch logic and timing calculations
```

* UI structure and controls are defined in `index.html` 
* Styling, analog dial, and animations are handled in `style.css` 
* Stopwatch logic and timing accuracy are implemented in `script.js` 

---

## ✨ Features

### ⏲ Accurate Time Measurement

* Uses `performance.now()` for high-precision timing
* Updates using `requestAnimationFrame` for smooth animation
* Displays time in **HH:MM:SS.CS** (centiseconds)

### 🕰 Analog + Digital Display

* Large circular analog dial with:

  * 60 tick marks
  * Rotating second hand
  * Sub-dial for extended timing
* Digital numeric overlay synchronized with the analog hand

### 🎛 Controls

* **Start** – begins or resumes the stopwatch
* **Stop** – pauses the stopwatch while preserving elapsed time
* **Reset** – clears elapsed time and resets all hands

### ⌨ Keyboard Support

* **Spacebar** → Start / Stop
* **R** → Reset

### 🎨 Visual Feedback

* Animated glowing ring when the stopwatch is running
* Smooth hand rotation and pulse effects
* Glass-style buttons with hover and active states

---

## ▶️ How to Run

### Method 1: Open Directly in Browser

1. Open the project folder
2. Double-click `index.html`
3. The stopwatch runs instantly

---

### Method 2: Using a Local Server (Recommended)

#### Using Python

```bash
python -m http.server 8000
```

Then open:

```
http://localhost:8000/index.html
```

---

## 🧠 How to Use

* Click **Start** or press **Spacebar** to begin
* Click **Stop** or press **Spacebar** again to pause
* Click **Reset** or press **R** to clear the stopwatch
* Observe both analog and digital time updates in real time

---

## 🎯 Technical Highlights

* **High-precision timing** using `performance.now()`
* **Smooth animation loop** via `requestAnimationFrame`
* **DOM-driven analog dial construction**
* **CSS-only visual effects** (no images, no canvas)
* **Responsive design** for desktop and mobile screens

---

## 🌐 Browser Compatibility

* Chrome / Edge ✅
* Firefox ✅
* Safari ✅
* Internet Explorer ❌ (not supported due to modern APIs)

---

## 📜 License

Open source — free to use, modify, and extend for educational or personal purposes.

---


