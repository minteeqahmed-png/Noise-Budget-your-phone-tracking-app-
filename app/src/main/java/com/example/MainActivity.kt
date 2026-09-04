package com.example

import android.annotation.SuppressLint
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.provider.Settings
import android.view.View
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.viewinterop.AndroidView

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        try {
            // Ensure Chromium Code Cache directories exist so background file enumerator doesn't fail
            java.io.File(cacheDir, "WebView/Default/HTTP Cache/Code Cache/js").mkdirs()
            java.io.File(cacheDir, "WebView/Default/HTTP Cache/Code Cache/wasm").mkdirs()
        } catch (_: Exception) {}
        setContent {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(androidx.compose.ui.graphics.Color(0xFF0A0A0B))
                    .testTag("noise_budget_container")
            ) {
                NoiseBudgetScreen()
            }
        }
    }
}

class NoiseBudgetNativeInterface(private val context: Context) {
    private val notificationManager: NotificationManager? =
        context.getSystemService(Context.NOTIFICATION_SERVICE) as? NotificationManager

    // --- HAPTICS BRIDGE ---
    @JavascriptInterface
    fun triggerOverloadHaptic() {
        triggerOverloadHapticWithIntensity(100)
    }

    @JavascriptInterface
    fun triggerOverloadHapticWithIntensity(intensityPercent: Int) {
        if (intensityPercent <= 0) return
        try {
            val vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                val vibratorManager = context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager
                vibratorManager?.defaultVibrator
            } else {
                @Suppress("DEPRECATION")
                context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
            }

            vibrator?.let { v ->
                if (v.hasVibrator()) {
                    val clamped = intensityPercent.coerceIn(1, 100)
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        // Scale waveform amplitudes based on user-configured haptic intensity (1 to 255)
                        val amp1 = ((180 * clamped) / 100).coerceIn(1, 255)
                        val amp2 = ((220 * clamped) / 100).coerceIn(1, 255)
                        val timings = longArrayOf(0, 45, 60, 45)
                        val amplitudes = intArrayOf(0, amp1, 0, amp2)
                        val effect = VibrationEffect.createWaveform(timings, amplitudes, -1)
                        v.vibrate(effect)
                    } else {
                        val pulse = ((45L * clamped) / 100).coerceAtLeast(10L)
                        @Suppress("DEPRECATION")
                        v.vibrate(longArrayOf(0, pulse, 60, pulse), -1)
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    // --- SYSTEM DO NOT DISTURB (DND) BRIDGE ---
    @JavascriptInterface
    fun isDndAccessGranted(): Boolean {
        return try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                notificationManager?.isNotificationPolicyAccessGranted == true
            } else {
                true
            }
        } catch (e: Exception) {
            false
        }
    }

    @JavascriptInterface
    fun requestDndAccess() {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                val intent = Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS).apply {
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                context.startActivity(intent)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    @JavascriptInterface
    fun setDndMode(enabled: Boolean): Boolean {
        return try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (notificationManager?.isNotificationPolicyAccessGranted == true) {
                    val targetFilter = if (enabled) {
                        NotificationManager.INTERRUPTION_FILTER_PRIORITY
                    } else {
                        NotificationManager.INTERRUPTION_FILTER_ALL
                    }
                    notificationManager.setInterruptionFilter(targetFilter)
                    true
                } else {
                    false
                }
            } else {
                false
            }
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }

    @JavascriptInterface
    fun isDndActive(): Boolean {
        return try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                val current = notificationManager?.currentInterruptionFilter ?: NotificationManager.INTERRUPTION_FILTER_ALL
                current != NotificationManager.INTERRUPTION_FILTER_ALL && current != NotificationManager.INTERRUPTION_FILTER_UNKNOWN
            } else {
                false
            }
        } catch (e: Exception) {
            false
        }
    }
}

// Backward-compatible alias
typealias HapticInterface = NoiseBudgetNativeInterface

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun NoiseBudgetScreen(modifier: Modifier = Modifier) {
    AndroidView(
        factory = { context ->
            WebView(context).apply {
                layoutParams = ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )
                setBackgroundColor(Color.parseColor("#0A0A0B"))
                settings.apply {
                    javaScriptEnabled = true
                    domStorageEnabled = true
                    mediaPlaybackRequiresUserGesture = false
                    useWideViewPort = true
                    loadWithOverviewMode = true
                    allowFileAccess = true
                    allowContentAccess = true
                    cacheMode = WebSettings.LOAD_DEFAULT
                    setSupportZoom(false)
                    builtInZoomControls = false
                    displayZoomControls = false
                }
                val nativeBridge = NoiseBudgetNativeInterface(context)
                addJavascriptInterface(nativeBridge, "AndroidHaptics")
                addJavascriptInterface(nativeBridge, "AndroidDnd")
                addJavascriptInterface(nativeBridge, "AndroidSystem")
                webViewClient = object : WebViewClient() {
                    override fun onRenderProcessGone(view: WebView?, detail: RenderProcessGoneDetail?): Boolean {
                        return true
                    }
                }
                webChromeClient = WebChromeClient()
                loadUrl("file:///android_asset/noisebudget.html")
            }
        },
        modifier = modifier.fillMaxSize()
    )
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    androidx.compose.material3.Text(text = "NOISEBUDGET $name", modifier = modifier)
}

