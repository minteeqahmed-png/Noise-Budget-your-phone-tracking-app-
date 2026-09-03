package com.example

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.view.ViewGroup
import android.webkit.JavascriptInterface
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

class HapticInterface(private val context: Context) {
    @JavascriptInterface
    fun triggerOverloadHaptic() {
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
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        // Subtle double-pulse tactile alert: 45ms pulse, 60ms break, 45ms pulse
                        val timings = longArrayOf(0, 45, 60, 45)
                        val amplitudes = intArrayOf(0, 180, 0, 220)
                        val effect = VibrationEffect.createWaveform(timings, amplitudes, -1)
                        v.vibrate(effect)
                    } else {
                        @Suppress("DEPRECATION")
                        v.vibrate(longArrayOf(0, 45, 60, 45), -1)
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}

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
                    useWideViewPort = true
                    loadWithOverviewMode = true
                    allowFileAccess = true
                    allowContentAccess = true
                    cacheMode = WebSettings.LOAD_DEFAULT
                    setSupportZoom(false)
                    builtInZoomControls = false
                    displayZoomControls = false
                }
                addJavascriptInterface(HapticInterface(context), "AndroidHaptics")
                webViewClient = WebViewClient()
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

