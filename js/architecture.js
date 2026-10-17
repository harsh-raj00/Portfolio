/**
 * HARSH RAJ — INTERACTIVE SYSTEM ARCHITECTURE PIPELINE INSPECTOR (V3 ADVANCED)
 * Ultra-high-fidelity pipeline simulator powered by Anime.js
 * Features SVG photon packet beam, spring physics, numerical telemetry rollups, and audio haptics
 */

document.addEventListener('DOMContentLoaded', () => {
  const PIPELINES = {
    chefmind: {
      title: "ChefMind AI — Dual-Engine Cascade Architecture",
      subtitle: "Groq Cloud (500 tokens/s) paired with Gemini Flash failover and multimodal vision",
      packetSize: "1.4 MB",
      totalLatency: "22ms RTT",
      sla: "99.98% UPTIME",
      steps: [
        {
          id: "step-1",
          title: "01 // Pantry Vision",
          desc: "Gemini 1.5 Flash multimodal detection extracts raw ingredients and counts from camera snapshot.",
          metricTarget: 180,
          metricSuffix: "ms",
          hopName: "VISION_SCAN"
        },
        {
          id: "step-2",
          title: "02 // Primary Engine",
          desc: "Groq Cloud ultra-fast inference (openai/gpt-oss-120b) streaming culinary recipes at 500 t/s.",
          metricTarget: 500,
          metricSuffix: " t/s",
          hopName: "GROQ_500TPS"
        },
        {
          id: "step-3",
          title: "03 // Circuit Breaker",
          desc: "Continuous latency & error watchdog monitors token rate. If timeout > 2.0s, triggers failover.",
          metricPrefix: "< ",
          metricTarget: 5,
          metricSuffix: "ms check",
          hopName: "WATCHDOG"
        },
        {
          id: "step-4",
          title: "04 // Gemini Failover",
          desc: "Resilient secondary pipeline absorbs request with zero user dropouts if Groq experiences rate limits.",
          metricTarget: 99.98,
          metricSuffix: "% uptime",
          isFloat: true,
          decimals: 2,
          hopName: "GEMINI_BACKUP"
        },
        {
          id: "step-5",
          title: "05 // Culinary Serving",
          desc: "Devanagari Hindi/English bilingual formatter, spice dampening scaler, and MongoDB Atlas persistence.",
          metricTarget: 0.42,
          metricSuffix: "s latency",
          isFloat: true,
          decimals: 2,
          hopName: "PAYLOAD_SERVE"
        }
      ],
      packetLog: [
        "📸 Multimodal pantry image ingested [1080x1920 JPG • 1.4 MB]",
        "🧠 Gemini Flash Vision detected: [Paneer, Tomatoes, Kasuri Methi, Cream]",
        "⚡ Forwarding prompt to Groq Cloud (openai/gpt-oss-120b @ 500 t/s)...",
        "✓ Groq response streaming at 512 tokens/sec. Latency: 22ms",
        "🌐 Recipe generated: Shahi Paneer (English & हिन्दी Devanagari) in 0.42s"
      ]
    },
    jarvis: {
      title: "J.A.R.V.I.S. — Holographic Multimodal Engine",
      subtitle: "Cinematic Iron Man 8K Particle WebGL HUD with FastAPI, Gemini API, and WebSockets",
      packetSize: "840 KB",
      totalLatency: "16ms RTT",
      sla: "60 FPS SOLID",
      steps: [
        {
          id: "step-1",
          title: "01 // Voice Capture",
          desc: "Web Speech API & browser Web Audio VAD captures acoustic waveform with ambient noise filtering.",
          metricTarget: 12,
          metricSuffix: "ms VAD",
          hopName: "AUDIO_INGEST"
        },
        {
          id: "step-2",
          title: "02 // WebSocket Relay",
          desc: "Bi-directional low-latency binary WebSocket connection to Python FastAPI backend.",
          metricTarget: 4,
          metricSuffix: "ms RTT",
          hopName: "WSS_SOCKET"
        },
        {
          id: "step-3",
          title: "03 // Gemini Brain",
          desc: "Google Gemini API parses user intent, manages conversation state, and matches active tools.",
          metricTarget: 240,
          metricSuffix: "ms parse",
          hopName: "GEMINI_INTENT"
        },
        {
          id: "step-4",
          title: "04 // Plugin Engine",
          desc: "Auto-dispatches to 5 local plugins: System Monitor, Calendar, Weather, Email, and IoT Smart Home.",
          metricTarget: 8,
          metricSuffix: "ms dispatch",
          hopName: "TOOL_DISPATCH"
        },
        {
          id: "step-5",
          title: "05 // 3D HUD & Audio",
          desc: "8,000 particle Three.js sphere vibrates to synthesized ElevenLabs voice stream in real-time.",
          metricTarget: 60,
          metricSuffix: " FPS",
          hopName: "HOLO_RENDER"
        }
      ],
      packetLog: [
        "🎙 Voice input detected: 'JARVIS, run system diagnostic and check weather'",
        "📡 WebSocket transmission relayed to FastAPI server [Binary Proto 4ms]",
        "🤖 Gemini cognitive model executed intent: [SystemPlugin.diagnostic, WeatherPlugin.fetch]",
        "⚙ CPU utilization: 14% | Memory: 32% | Weather: 26°C Bengaluru clear sky",
        "✨ 8,000 particles modulated via Three.js GLSL vertex shaders at 60 FPS"
      ]
    },
    deepfake: {
      title: "DeepfakeGuard — 4-Layer Biometric Security Pipeline",
      subtitle: "Multi-stage anti-spoofing defense combining SSD, 128D FaceNet, and MesoNet CNN",
      packetSize: "2.1 MB",
      totalLatency: "28ms Frame",
      sla: "0.001% FAR",
      steps: [
        {
          id: "step-1",
          title: "01 // Face Detection",
          desc: "SSD+ResNet framework extracts facial bounding box and 68 landmark coordinates.",
          metricTarget: 14.8,
          metricSuffix: "ms frame",
          isFloat: true,
          decimals: 1,
          hopName: "SSD_RESNET"
        },
        {
          id: "step-2",
          title: "02 // Feature Encoding",
          desc: "128-dimensional Deep Neural Network encodes facial geometry for identity matching.",
          metricTarget: 25,
          metricSuffix: "ms vector",
          hopName: "FACENET_128D"
        },
        {
          id: "step-3",
          title: "03 // Liveness Verification",
          desc: "Eye Aspect Ratio (EAR) blink rate & 3D head pose estimation defeats photo/screen replay.",
          metricTarget: 98.2,
          metricSuffix: "% conf",
          isFloat: true,
          decimals: 1,
          hopName: "EAR_HEADPOSE"
        },
        {
          id: "step-4",
          title: "04 // MesoNet CNN",
          desc: "Deep convolutional network scrutinizes compression artifacts & warping for AI synthesis.",
          metricTarget: 96.0,
          metricSuffix: "% accuracy",
          isFloat: true,
          decimals: 1,
          hopName: "MESONET_CNN"
        },
        {
          id: "step-5",
          title: "05 // Risk Scoring",
          desc: "Weighted composite trust assessment with Grad-CAM visual heatmaps explaining verdict.",
          metricTarget: 0.001,
          metricSuffix: "% FAR",
          isFloat: true,
          decimals: 3,
          hopName: "GRAD_CAM_VERDICT"
        }
      ],
      packetLog: [
        "📷 Video frame ingested [60 FPS HD stream • 2.1 MB]",
        "📍 SSD+ResNet identified 68 facial coordinates in 14.8ms",
        "👁 Liveness confirmed: natural blink frequency 18/min, 3D yaw 4.2°",
        "🛡 MesoNet CNN scan complete: 0.02% GAN distortion probability",
        "✅ Verdict: GENUINE HUMAN (Confidence 98.68% - Access Granted)"
      ]
    }
  };

  const navBtns = document.querySelectorAll('.arch-nav-btn');
  const archTitle = document.getElementById('arch-pipeline-title');
  const archSubtitle = document.getElementById('arch-pipeline-sub');
  const archStepsContainer = document.getElementById('arch-steps-container');
  const archSimulateBtn = document.getElementById('arch-simulate-btn');
  const archLogOutput = document.getElementById('arch-log-output');
  const archLogMeta = document.getElementById('arch-log-meta');

  // Telemetry HUD Elements
  const hudStatus = document.getElementById('arch-hud-status');
  const hudLatency = document.getElementById('arch-hud-latency');
  const hudHop = document.getElementById('arch-hud-hop');
  const hudIntegrity = document.getElementById('arch-hud-integrity');

  // SVG Circuit Elements
  const circuitProgressLine = document.getElementById('arch-circuit-progress-line');
  const circuitNodes = document.querySelectorAll('.arch-circuit-node');
  const packetBeam = document.getElementById('arch-packet-beam');

  let currentKey = 'chefmind';
  let isSimulating = false;

  // Node X coordinates along the 1000px wide SVG circuit
  const NODE_X_COORDS = [100, 300, 500, 700, 900];

  function resetCircuitVisuals() {
    if (circuitProgressLine) circuitProgressLine.setAttribute('x2', '40');
    if (packetBeam) {
      packetBeam.setAttribute('cx', '40');
      packetBeam.style.opacity = '0';
    }
    circuitNodes.forEach(node => {
      node.classList.remove('active', 'passed');
    });
  }

  function renderPipeline(key) {
    const data = PIPELINES[key];
    if (!data) return;

    currentKey = key;

    // Cross-fade Title & Subtitle with Anime.js
    if (window.anime && (archTitle || archSubtitle)) {
      anime({
        targets: [archTitle, archSubtitle],
        opacity: [0, 1],
        translateY: [-6, 0],
        duration: 350,
        easing: 'easeOutCubic'
      });
    }

    if (archTitle) archTitle.textContent = data.title;
    if (archSubtitle) archSubtitle.textContent = data.subtitle;

    // Reset Telemetry HUD
    if (hudStatus) hudStatus.textContent = 'STANDBY // READY';
    if (hudLatency) hudLatency.textContent = '0.00 ms';
    if (hudHop) hudHop.textContent = 'HOP 00 / 05';
    if (hudIntegrity) hudIntegrity.textContent = data.sla;

    // Reset Circuit
    resetCircuitVisuals();

    // Render Steps
    if (archStepsContainer) {
      archStepsContainer.innerHTML = data.steps.map((s, idx) => `
        <div class="arch-step-card" id="${s.id}" data-step-index="${idx}">
          <div class="arch-step-header">
            <span class="arch-step-num">${s.title}</span>
            <span class="arch-step-badge" id="badge-${s.id}">
              ${s.metricPrefix || ''}${s.metricTarget}${s.metricSuffix}
            </span>
          </div>
          <p class="arch-step-desc">${s.desc}</p>
          <div class="arch-step-pulse-line"></div>
        </div>
      `).join('');

      // Anime.js Staggered Entrance Animation
      if (window.anime) {
        anime({
          targets: '.arch-step-card',
          opacity: [0, 1],
          translateY: [24, 0],
          scale: [0.94, 1],
          duration: 500,
          delay: anime.stagger(60, { start: 40 }),
          easing: 'easeOutBack'
        });
      }
    }

    // Reset Log Output
    if (archLogMeta) archLogMeta.textContent = 'STREAM: READY';
    if (archLogOutput) {
      archLogOutput.innerHTML = `<span style="color: #71717a;">System ready. Click "Transmit Pipeline Packet" to simulate live data flow across ${data.title.split('—')[0].trim()}.</span>`;
    }
  }

  // Nav Button Listeners
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isSimulating) return;
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-arch');
      renderPipeline(key);
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });

  // Main Anime.js Orchestrated Packet Transmission
  if (archSimulateBtn) {
    archSimulateBtn.addEventListener('click', () => {
      if (isSimulating) return;
      isSimulating = true;
      archSimulateBtn.disabled = true;
      archSimulateBtn.classList.add('loading');
      if (window.soundEngine) window.soundEngine.playClick();

      const data = PIPELINES[currentKey];
      if (!data || !archLogOutput) return;

      archLogOutput.innerHTML = '';
      if (archLogMeta) archLogMeta.textContent = 'STREAM: IN-FLIGHT';
      if (hudStatus) hudStatus.textContent = `IN-FLIGHT // ${data.packetSize}`;

      const stepCards = document.querySelectorAll('.arch-step-card');
      stepCards.forEach(c => {
        c.classList.remove('active', 'success');
        const pulse = c.querySelector('.arch-step-pulse-line');
        if (pulse) pulse.style.width = '0%';
      });

      resetCircuitVisuals();

      let currentStepIndex = 0;
      let accumulatedLatency = 0;

      function executeHop(stepIndex) {
        if (stepIndex >= data.steps.length) {
          // Transmission Complete
          isSimulating = false;
          archSimulateBtn.disabled = false;
          archSimulateBtn.classList.remove('loading');
          if (hudStatus) {
            hudStatus.textContent = 'COMPLETED // 200 OK';
            hudStatus.classList.add('pulse');
            setTimeout(() => hudStatus.classList.remove('pulse'), 1500);
          }
          if (hudHop) hudHop.textContent = 'HOP 05 / 05 [VERIFIED]';
          if (archLogMeta) archLogMeta.textContent = 'STREAM: COMPLETED';

          // Final Completion Chime
          if (window.soundEngine) window.soundEngine.playChirp(1200, 0.18, 'sine');
          return;
        }

        const step = data.steps[stepIndex];
        const card = stepCards[stepIndex];
        const prevTargetX = (stepIndex === 0) ? 40 : NODE_X_COORDS[stepIndex - 1];
        const targetX = NODE_X_COORDS[stepIndex];
        const hopDuration = 280;

        // 1. Update Telemetry HUD
        if (hudHop) hudHop.textContent = `HOP 0${stepIndex + 1} / 05 // ${step.hopName}`;

        // 2. Animate Traveling SVG Photon Beam & Conduit Line with Anime.js
        if (window.anime && packetBeam && circuitProgressLine) {
          packetBeam.style.opacity = '1';

          anime({
            targets: packetBeam,
            cx: [prevTargetX, targetX],
            duration: hopDuration,
            easing: 'easeInOutQuad'
          });

          anime({
            targets: circuitProgressLine,
            x2: targetX,
            duration: hopDuration,
            easing: 'easeInOutQuad'
          });
        }

        // 3. When beam reaches node after hopDuration
        setTimeout(() => {
          // Highlight circuit node
          const circuitNode = document.querySelector(`.arch-circuit-node[data-node="${stepIndex}"]`);
          if (circuitNode) {
            circuitNode.classList.add('active');
            circuitNodes.forEach((cn, idx) => {
              if (idx < stepIndex) cn.classList.add('passed');
            });
          }

          // Card active state & Spring Recoil with Anime.js
          if (card) {
            card.classList.add('active');

            if (window.anime) {
              anime({
                targets: card,
                translateY: [0, -8, 0],
                scale: [1, 1.04, 1],
                duration: 400,
                easing: 'spring(1, 80, 10, 0)'
              });
            }

            // Pulse line charging
            const pulse = card.querySelector('.arch-step-pulse-line');
            if (pulse && window.anime) {
              anime({
                targets: pulse,
                width: ['0%', '100%'],
                duration: 350,
                easing: 'easeOutQuad'
              });
            }
          }

          // 4. Numerical Telemetry Rollup on Badge with Anime.js
          const badge = document.getElementById(`badge-${step.id}`);
          if (badge && window.anime) {
            const counterObj = { val: 0 };
            anime({
              targets: counterObj,
              val: step.metricTarget,
              duration: 380,
              easing: 'easeOutExpo',
              update: () => {
                let formatted;
                if (step.decimals) {
                  formatted = counterObj.val.toFixed(step.decimals);
                } else if (step.isFloat) {
                  formatted = counterObj.val.toFixed(2);
                } else {
                  formatted = Math.round(counterObj.val);
                }
                badge.textContent = `${step.metricPrefix || ''}${formatted}${step.metricSuffix}`;
              }
            });
          }

          // 5. Update Latency in HUD
          accumulatedLatency += Math.floor(12 + Math.random() * 8);
          if (hudLatency && window.anime) {
            const latObj = { val: parseFloat(hudLatency.textContent) || 0 };
            anime({
              targets: latObj,
              val: accumulatedLatency,
              duration: 300,
              easing: 'easeOutQuad',
              update: () => {
                hudLatency.textContent = `${latObj.val.toFixed(2)} ms`;
              }
            });
          }

          // 6. Sound FX
          if (window.soundEngine) {
            window.soundEngine.playChirp(720 + stepIndex * 130, 0.06, 'triangle');
          }

          // 7. Append Real-Time Log Line with Anime.js Staggered Reveal
          if (data.packetLog[stepIndex]) {
            const logLine = document.createElement('div');
            logLine.className = 'arch-log-line';
            logLine.innerHTML = `
              <span class="arch-log-ts">[T+${(stepIndex * 0.18).toFixed(2)}s]</span>
              <span class="arch-log-msg">${data.packetLog[stepIndex]}</span>
            `;
            archLogOutput.appendChild(logLine);
            archLogOutput.scrollTop = archLogOutput.scrollHeight;

            if (window.anime) {
              anime({
                targets: logLine,
                opacity: [0, 1],
                translateX: [-18, 0],
                duration: 320,
                easing: 'easeOutCubic'
              });
            }
          }

          // Transition to next hop
          setTimeout(() => {
            if (card) {
              card.classList.remove('active');
              card.classList.add('success');
            }
            if (circuitNode) {
              circuitNode.classList.remove('active');
              circuitNode.classList.add('passed');
            }
            currentStepIndex++;
            executeHop(currentStepIndex);
          }, 380);

        }, hopDuration);
      }

      // Initiate first hop
      executeHop(0);
    });
  }

  // Initial render
  renderPipeline('chefmind');
});
