# NoiseBudget

> **Cognitive Load Monitor & Attention Fragmentation Breaker**

NoiseBudget is an Android application and digital wellness interface engineered to quantify cognitive overhead, detect dopamine-driven task fragmentation, and actively restore focus through multisensory interventions.

---

## Key Features

### 1. Live Cognitive Telemetry
- **Cognitive Noise Index**: Real-time score calibrated from `0` (Calm Baseline) to `100` (Critical Overload).
- **BrainPulse Visualizer**: Dynamic SVG neural network featuring three orbital resonance rings, animated pulse connector lines, and harmonic nodes that speed up under cognitive strain.
- **Budget Metrics**: Continuous estimation of cognitive budget reserves and real-time noise burn rates (`pts/min`).
- **Activity Breakdown**: Live telemetry tracking:
  - **Switching Velocity**: Task-switching frequency (`sw/hr`).
  - **Scroll Speed**: Rapid feed traversal detection (`sc/min`).
  - **Attention Fragmentation**: Qualitative risk status indicator.

### 2. High-Noise Intervention Protocol
When cognitive noise crosses the **70-point overload threshold**:
- **Display Desaturation & Dimming**: Background telemetry is instantly converted to grayscale and dimmed (`brightness(50%) contrast(75%)`) to break visual fixation.
- **Intervention Card**: Displays an acute overload warning ("Dopamine Loop Detected") with actionable guidance.
- **Tactile Vibration Feedback**: Fires a calibrated double-pulse haptic alert (`45ms pulse → 60ms pause → 45ms pulse`) via the Android `VibratorManager` bridge and Web Vibration API.
- **5-Second Friction Delay**: Includes an animated reset progress bar requiring intentional interaction to override and dismiss.

### 3. Weekly Cognitive Pattern View
- **7-Day Trajectory Line Chart**: Tracks daily average noise scores from Monday through Sunday with color-coded overload zones.
- **High-Stress Period Identification**: Highlights sustained multi-day spikes (such as Tuesday afternoon through Wednesday evening).
- **Interactive Day Inspector**: Tap any day to inspect average noise, peak spikes, context switches, and cognitive recovery insights.
- **Daily Breakdown List**: Quick overview of every day's classification (`OPTIMAL`, `MODERATE`, `ELEVATED`, `OVERLOAD`, `CRITICAL`).

### 4. Interactive Simulation & Controls
- **Noise Presets**: Switch instantly between **Low (24)**, **Mid (52)**, and **High Overload (85)** to preview state transitions.
- **Focus Shield**: System-wide protection toggle.
- **Mute Override**: Manual trigger to inspect the intervention state at any noise level.

---

## Technical Architecture

- **Android Host**: Jetpack Compose (`MainActivity.kt`) hosting an optimized hardware-accelerated WebView.
- **Haptic Bridge**: `HapticInterface` exposed via `@JavascriptInterface` using Android 12+ `VibratorManager` and waveform `VibrationEffect` with backwards compatibility.
- **UI Architecture**: Dual-layer implementation featuring both a standalone TypeScript/React component (`NoiseBudget.tsx`) and an offline-capable embedded asset (`app/src/main/assets/noisebudget.html`).
- **Design Tokens**: Dark-mode palette with high-contrast safety accents:
  - Calming Teal / Cyan (`#28B8FF`)
  - Warning / Overload Tangerine (`#FF6B35`)
  - Critical Crimson (`#FF3B30`)
  - Restorative Green (`#39FF88`)
  - Obsidian Surface (`#0A0A0B`)

---

## Build & Run Instructions

### Prerequisites
- Android SDK (API Level 26 minimum, API 34+ target)
- Gradle 8.x with Kotlin DSL

### Compile Application
```bash
gradle :app:assembleDebug
```

The resulting APK will be located at:
`app/build/outputs/apk/debug/app-debug.apk`
