/**
 * HARSH RAJ — COMMAND CENTER / INTERACTIVE TERMINAL (V2 ADVANCED)
 * Full-featured interactive CLI engine with filesystem, neofetch, and benchmark modules
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const chipButtons = document.querySelectorAll('.chip-btn');
  const terminalBody = document.querySelector('.terminal-body');

  if (!terminalInput || !terminalHistory) return;

  const VIRTUAL_FS = {
    'about.txt': `Harsh Raj — Data Science & Artificial Intelligence student at Indian Institute of Information Technology (IIIT) Dharwad (Minor in Cybersecurity).
Specializing in real-time multilingual voice assistant pipelines (ASR→LLM→TTS), RAG systems, and enterprise cybersecurity telemetry.
Email: harsh546raj@gmail.com | GitHub: harsh-raj00 | LinkedIn: harsh-raj10`,
    'experience.txt': `# Professional Experience & Internships

1. AI Intern (AI Advocacy & Voice Systems) — Head Held High Foundation (May - Aug 2025, Remote)
   • Built production-oriented AI workflows (a domain chatbot, a full RAG pipeline and a real-time multilingual voice assistant), owning the full lifecycle from problem framing through live inference and monitoring.
   • Developed a retrieval-augmented generation (RAG) pipeline that grounds LLM responses in domain documents, reducing unsupported answers in the chatbot.
   • Designed an end-to-end real-time Language ID → ASR → LLM → TTS pipeline with dynamic language tagging.
   • Evaluated open-source LLMs (Gemma, Qwen) and tuned prompts for low-resource languages like Sanskrit.
   • Explored 4-bit edge quantization (GGUF, ONNX, TensorRT) to minimize latency across production voice and chatbot deployments.

2. Cybersecurity Intern — Trend Micro AMEA (Jun - Jul 2025, Remote / Dubai)
   • Monitored live enterprise telemetry and performed anomaly detection with Trend Micro Vision One XDR.
   • Conducted event triage, root-cause analysis, and authored technical threat intelligence reports.
   • Certified: Trend Micro Vision One XDR Certified Professional.

3. Undergraduate Academics — Indian Institute of Information Technology Dharwad
   • Period    : Aug 2023 — May 2027 • Dharwad, India
   • Degree    : B.Tech in Data Science & Artificial Intelligence (Minor: Cyber Security)
   • Coursework: Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Cloud Computing, Software Engineering.`,
    'projects/chefmind.md': `# ChefMind AI
Multimodal culinary intelligence platform.
- Dual-Engine Inference: Groq Cloud (openai/gpt-oss-120b ) + Gemini Flash failover.
- Features: Gemini Vision pantry detection, Web Speech voice dictation, zero-latency culinary scaler.
- Live: https://chef-mind-ai.vercel.app
- Code: https://github.com/harsh-raj00/ChefMind-AI`,
    'projects/lithaven.md': `# LitHaven
Campus book exchange & study notes sharing platform with 0% commission fees.
- React 19, Node.js, Express, MongoDB, JWT authentication, dual-mode theme engine.
- Live: https://lit-haven.vercel.app
- Code: https://github.com/harsh-raj00/LitHaven`,
    'projects/jarvis.md': `# J.A.R.V.I.S.
Cinematic Iron Man AI Assistant.
- 8,000 particle 3D WebGL holographic sphere with custom GLSL shaders.
- FastAPI backend with Gemini API, duplex WebSockets, and ElevenLabs speech synthesis.
- Live: https://jarvis-frontend-uj30.onrender.com
- Code: https://github.com/harsh-raj00/my-jarvis`,
    'projects/deepfakeguard.md': `# DeepfakeGuard
4-layer biometric security system.
- SSD+ResNet face detection (~15ms) + 128-D Face Net vector encoding (~25ms).
- EAR + Head pose liveness detection + MesoNet CNN deepfake artifact analysis.
- Live: https://deepfakeguard-3ufd.onrender.com
- Code: https://github.com/harsh-raj00/DeepfakeGuard`,
    'projects/livspaceone.md': `# LivspaceOne
Luxury architectural marketplace and digital space creation platform.
- Dual systems: LuxeBuild Mart e-commerce + Design Studio booking.
- Node.js, Express, MongoDB, Socket.io real-time concierge.
- Live: https://livspaceone.onrender.com
- Code: https://github.com/harsh-raj00/livspaceone`,
    'projects/ethsecure.md': `# EthSecure Health
Decentralized Electronic Health Records on Ethereum.
- Dual Solidity smart contracts with OpenZeppelin RBAC.
- Client-side AES-256 encryption + IPFS Pinata decentralized storage.
- Live: https://ethsecure-health.onrender.com
- Code: https://github.com/harsh-raj00/EthSecure-Health-`
  };

  const getSep = (len) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    return '-'.repeat(len || (isMobile ? 38 : 65));
  };

  const COMMANDS = {
    help: () => `
Available directives in Harsh Raj Systems Console:
  • neofetch    : Display host configuration, hardware specs, and system summary
  • ls          : List virtual project archives & configuration files
  • cat <file>  : Read file contents (e.g. 'cat experience.txt' or 'cat projects/chefmind.md')
  • experience  : Career trajectory, internships & verified credentials
  • benchmark   : Run simulated token throughput and microservice latency test
  • projects    : Index of verified production applications
  • skills      : Systems engineering, AI, and full-stack matrix
  • sound       : Toggle Web Audio haptic feedback engine (ON/OFF)
  • theme       : Toggle between Obsidian Dark & Editorial Light
  • contact     : Official coordinates and verified communication channels
  • resume      : Open printable Curriculum Vitae modal
  • matrix      : Stream monochromatic binary cyber matrix
  • date        : Query system timestamp
  • clear       : Purge terminal buffer
`,
    neofetch: () => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      if (isMobile) {
        return `
██   ██  ██████
██   ██  ██   ██
███████  ██████
██   ██  ██   ██
██   ██  ██   ██

harsh@raj
----------------------------------------
OS          : macOS Sequoia (Darwin 24.3.0)
Host        : Apple M3 Max (16C / 36GB)
Institute   : Indian Institute of Information Technology Dharwad
Degree      : B.Tech in Data Science & Artificial Intelligence
Timeline    : Aug 2023 — May 2027 (Dharwad, India)
Minor       : Cyber Security
Shell       : zsh 5.9 / Web Audio Engine
Terminal    : HR-Systems Monochromatic v3.0

AI Engine   : Groq Cloud (500 t/s) + Gemini Flash + RAG
Primary Lang: JavaScript, Python, TypeScript, FastAPI, React 19, SQL
Credentials : Trend Micro Vision One XDR Certified Professional
Coursework  : DSA, OOP, DBMS, OS, Networks, Cloud
Location    : Bengaluru, India (IST UTC+5:30)
`;
      }

      return `
██   ██  ██████  harsh@raj
██   ██  ██   ██ ---------
███████  ██████  OS          : macOS Sequoia (Darwin 24.3.0)
██   ██  ██   ██ Host        : Apple M3 Max (16 Cores / 36GB Unified)
██   ██  ██   ██ Institute   : Indian Institute of Information Technology Dharwad
                 Degree      : B.Tech in Data Science & Artificial Intelligence
                 Timeline    : Aug 2023 — May 2027 (Dharwad, India)
                 Minor       : Cyber Security
                 Shell       : zsh 5.9 / Web Audio Engine
                 Terminal    : HR-Systems Monochromatic v3.0

AI Engine   : Groq Cloud  + Gemini 1.5 Flash (RAG Pipeline)
Primary Lang: JavaScript, Python, TypeScript, FastAPI, React 19, SQL
Credentials : Trend Micro Vision One XDR Certified Professional
Coursework  : DSA, OOP, DBMS, OS, Computer Networks, Cloud Computing, Software Eng.
Location    : Bengaluru, India (IST UTC+5:30)
`;
    },
    ls: () => `
about.txt
experience.txt
projects/
  ├── chefmind.md
  ├── lithaven.md
  ├── jarvis.md
  ├── deepfakeguard.md
  ├── livspaceone.md
  └── ethsecure.md

Tip: Type 'cat <filename>' to inspect any record.
`,
    cat: (args) => {
      const filename = args[0];
      if (!filename) return `Usage: cat <filename> (e.g. 'cat projects/chefmind.md')`;
      if (VIRTUAL_FS[filename]) {
        return VIRTUAL_FS[filename];
      }
      return `File not found: '${filename}'. Type 'ls' to view directory tree.`;
    },
    benchmark: () => `
[RUNNING PRODUCTION PERFORMANCE BENCHMARKS...]
${getSep()}
Testing Dual-Engine Inference Pipeline:
  • Groq Cloud (openai/gpt-oss-120b) : 512.4 tokens/sec [⚡ Ultra-low latency]
  • Google Gemini 1.5 Flash          : 182.0 tokens/sec [Reliable failover]
  • Multimodal Pantry Vision Scan    : 178ms end-to-end
  • MesoNet Face Deepfake Scan       : 14.8ms / frame (98.68% precision)
  • Redis Cluster In-Memory Read     : 0.38ms (p99)
  • Go Distributed Worker Pipeline   : 140,000+ peak RPS sustained

OVERALL SCORE: 99.8 / 100 — Production Grade SLA
`,
    projects: () => `
[HARSH RAJ — VERIFIED PRODUCTION SYSTEMS]
${getSep()}
1. ChefMind AI
   • Dual-engine culinary intelligence with Groq  & Gemini Flash
   • Multimodal pantry vision & bilingual Devanagari recipe generation
   • URL: https://chef-mind-ai.vercel.app

2. LitHaven
   • Campus textbook marketplace & study notes sharing platform (MERN)
   • URL: https://lit-haven.vercel.app

3. J.A.R.V.I.S. (Iron Man HUD)
   • 8K Particle WebGL holographic sphere with GLSL shaders & voice orb
   • FastAPI, Gemini API, duplex WebSockets, and ElevenLabs speech
   • URL: https://jarvis-frontend-uj30.onrender.com

4. DeepfakeGuard
   • 4-layer biometric anti-spoofing AI: SSD+ResNet, 128D FaceNet, MesoNet
   • 96% accuracy, 98.68% precision with Grad-CAM explainability
   • URL: https://deepfakeguard-3ufd.onrender.com

5. LivspaceOne
   • Luxury interior & space creation marketplace with Socket.io concierge
   • URL: https://livspaceone.onrender.com

6. EthSecure Health
   • Decentralized EHR on Ethereum, AES-256 client encryption, IPFS Pinata
   • URL: https://ethsecure-health.onrender.com
`,
    experience: () => `
[VERIFIED PROFESSIONAL INTERNSHIPS & CREDENTIALS]
${getSep()}
1. AI Intern (AI Advocacy & Voice Systems) — Head Held High Foundation
   • Period   : May 2025 — Aug 2025 (4 months, Remote)
   • Scope    : Production AI workflows (domain chatbot, full RAG pipeline & multilingual voice assistant)
   • Core Work:
     - Built production-oriented AI workflows (a domain chatbot, a full RAG pipeline and a real-time multilingual voice assistant), owning the full lifecycle from problem framing through live inference and monitoring.
     - Developed a retrieval-augmented generation (RAG) pipeline that grounds LLM responses in domain documents, reducing unsupported answers in the chatbot.
     - Real-time Language ID → ASR → LLM → TTS pipeline with dynamic language tagging.
     - Benchmarked Gemma and Qwen for Indic translation, cultural nuance, and Sanskrit prompt conditioning.
     - Explored 4-bit edge quantization (GGUF/ONNX/TensorRT) for minimal latency deployments.

2. Cybersecurity Intern — Trend Micro AMEA
   • Period   : Jun 2025 — Jul 2025 (Remote / Dubai)
   • Scope    : Enterprise telemetry monitoring, anomaly detection, and threat reporting
   • Core Work:
     - Monitored real-time telemetry with Trend Micro Vision One XDR.
     - Anomaly detection, threat triage, root-cause tracing, and data-quality precision.
     - Authored executive threat intelligence reports for incident responders.
   • Credential: Trend Micro Vision One XDR Certified Professional
`,
    skills: () => `
[TECHNICAL CAPABILITIES & PROFICIENCIES]
${getSep()}
Academics   : IIIT Dharwad — B.Tech in Data Science & AI (Minor: Cyber Security, 2023-2027)
Coursework  : DSA, OOP, DBMS, OS, Computer Networks, Cloud Computing, Software Engineering
Languages   : TypeScript, JavaScript, Python, Go, Rust, Solidity, SQL, HTML5/CSS3
AI / ML     : RAG (Retrieval-Augmented Generation), Gemini API, Groq, PyTorch, TensorFlow, OpenCV, Vector DBs
Full-Stack  : React 19, Next.js, Node.js, Express.js, FastAPI, Flask, Three.js
Security    : Trend Micro Vision One XDR, Anomaly Detection, SOC Triage
Data & Cloud: MongoDB, PostgreSQL, Redis, Docker, Kubernetes, AWS, IPFS, Render
`,
    sound: () => {
      if (window.soundEngine) {
        const state = window.soundEngine.toggle();
        const soundBtn = document.getElementById('audio-toggle-btn');
        if (soundBtn) {
          soundBtn.classList.toggle('active', state);
          soundBtn.querySelector('.audio-label').textContent = state ? 'Audio: ON' : 'Audio: OFF';
        }
        return `Web Audio Haptic Engine: ${state ? 'ENABLED [✓]' : 'MUTED [✕]'}.`;
      }
      return `Audio engine initialized.`;
    },
    theme: () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      if (window.soundEngine) window.soundEngine.playThemeSwitch();
      return `Theme switched to: ${next.toUpperCase()} MONOCHROME.`;
    },
    contact: () => `
[DIRECT COMMS CHANNELS]
${getSep()}
Email    : harsh546raj@gmail.com
GitHub   : https://github.com/harsh-raj00
LinkedIn : https://linkedin.com/in/harsh-raj10
Status   : Open to select principal engineering, high-leverage roles & advisory.
`,
    resume: () => {
      const resumeModal = document.getElementById('resume-modal');
      if (resumeModal) {
        resumeModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (window.soundEngine) window.soundEngine.playClick();
        return `Triggering curriculum vitae viewer modal... Done.`;
      }
      return `Resume viewer is currently opening.`;
    },
    date: () => {
      return `Current System Time: ${new Date().toLocaleString('en-US', { timeZoneName: 'short' })}`;
    },
    matrix: () => {
      return `01001000 01000001 01010010 01010011 01001000 00100000 01010010 01000001 01010010
[SYSTEM CORE] Streaming neural state...
Groq Cloud: 512 t/s | Gemini 1.5: 99.9% | MesoNet: ACTIVE | Status: ALL SYSTEMS NOMINAL`;
    },
    clear: () => {
      terminalHistory.innerHTML = '';
      return null;
    }
  };

  function executeCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const entry = document.createElement('div');
    entry.className = 'term-entry';

    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-cmd-line';
    cmdLine.innerHTML = `<span class="term-prompt">harsh@systems:~$</span> <span>${escapeHTML(trimmed)}</span>`;
    entry.appendChild(cmdLine);

    if (cmd === 'clear') {
      COMMANDS.clear();
      return;
    }

    let outputText = '';
    if (COMMANDS[cmd]) {
      outputText = COMMANDS[cmd](args);
    } else {
      outputText = `Command not recognized: "${cmd}". Type "help" for valid directives.`;
    }

    if (outputText !== null) {
      const outLine = document.createElement('div');
      outLine.className = 'term-output';
      if (cmd === 'neofetch' || cmd === 'matrix') {
        outLine.classList.add('term-output-pre');
      }
      outLine.textContent = outputText.trim();
      entry.appendChild(outLine);
      terminalHistory.appendChild(entry);

      if (window.anime) {
        anime({
          targets: entry,
          opacity: [0, 1],
          translateY: [6, 0],
          duration: 220,
          easing: 'easeOutQuad'
        });
      }
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (window.soundEngine) window.soundEngine.playTerminalKey();
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      executeCommand(val);
      terminalInput.value = '';
    }
  });

  chipButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        if (window.anime) {
          anime({
            targets: btn,
            scale: [0.92, 1],
            duration: 250,
            easing: 'easeOutBack'
          });
        }
        terminalInput.value = cmd;
        executeCommand(cmd);
        terminalInput.value = '';
        if (window.soundEngine) window.soundEngine.playClick();
      }
    });
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
});
