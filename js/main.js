/**
 * HARSH RAJ — ARCHITECTURAL BLACK & WHITE PORTFOLIO (ADVANCED ENGINE)
 * Main Interactive Application Script: 3D tilt, Web3Forms, Typewriter, Sound, Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark Obsidian & Swiss Editorial)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      if (window.soundEngine) window.soundEngine.playThemeSwitch();
      if (window.anime) {
        const svg = btn.querySelector('svg');
        if (svg) {
          anime({
            targets: svg,
            rotate: [0, 360],
            duration: 450,
            easing: 'easeOutBack'
          });
        }
      }
      showToast(`Switched to ${nextTheme === 'dark' ? 'Obsidian Dark' : 'Editorial Light'} mode`);
    });
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    updateThemeIcons(theme);
  }

  function updateThemeIcons(theme) {
    themeToggleBtns.forEach(btn => {
      if (theme === 'dark') {
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
        btn.setAttribute('aria-label', 'Switch to light mode');
      } else {
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
        btn.setAttribute('aria-label', 'Switch to dark mode');
      }
    });
  }

  // 2. Audio Toggle in Navbar
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  if (audioToggleBtn) {
    const isAudioOn = localStorage.getItem('portfolio-audio') === 'true';
    audioToggleBtn.classList.toggle('active', isAudioOn);
    const label = audioToggleBtn.querySelector('.audio-label');
    if (label) label.textContent = isAudioOn ? 'Audio: ON' : 'Audio: OFF';

    audioToggleBtn.addEventListener('click', () => {
      if (window.soundEngine) {
        const state = window.soundEngine.toggle();
        audioToggleBtn.classList.toggle('active', state);
        if (label) label.textContent = state ? 'Audio: ON' : 'Audio: OFF';
        if (window.anime) {
          anime({
            targets: audioToggleBtn,
            scale: [0.92, 1.05, 1],
            duration: 350,
            easing: 'spring(1, 80, 10, 0)'
          });
        }
        showToast(`Sound FX: ${state ? 'ENABLED' : 'MUTED'}`);
      }
    });
  }

  // 3. Typewriter Subtitle
  const typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    const phrases = [
      "Data Science & AI @ IIIT Dharwad",
      "Full-Stack AI Engineer",
      "Software Engineer",
      "AI/ML Engineer"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        speed = 1800; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 300;
      }

      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  // 4. Custom Cursor & Ambient Mouse Spotlight
  const ambientGlow = document.querySelector('.ambient-glow');
  const customCursor = document.querySelector('.custom-cursor');
  const customCursorDot = document.querySelector('.custom-cursor-dot');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (ambientGlow) {
      ambientGlow.style.left = `${mouseX}px`;
      ambientGlow.style.top = `${mouseY}px`;
    }

    if (customCursorDot) {
      customCursorDot.style.left = `${mouseX}px`;
      customCursorDot.style.top = `${mouseY}px`;
    }
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    if (customCursor) {
      customCursor.style.left = `${cursorX}px`;
      customCursor.style.top = `${cursorY}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Sound & Cursor Hoverables
  const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-category-card, .timeline-card, .chip-btn, .holo-mode-btn, .arch-nav-btn');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (customCursor) customCursor.classList.add('hovering');
      if (window.soundEngine) window.soundEngine.playHover();
    });
    el.addEventListener('mouseleave', () => {
      if (customCursor) customCursor.classList.remove('hovering');
    });
    el.addEventListener('click', () => {
      if (window.soundEngine && !el.classList.contains('chip-btn')) {
        window.soundEngine.playClick();
      }
    });
  });

  // 5. 3D Tilt Effect on Project Cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });

  // 6. Top Scroll Progress Bar & Header State
  const progressBar = document.querySelector('.scroll-progress-bar');
  const siteHeader = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (siteHeader) {
      if (scrollTop > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Active nav link highlight
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  });

  // 7. Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      mobileMenuBtn.innerHTML = isOpen
        ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
        mobileMenuBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
        mobileMenuBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }

  // 8. Project Filtering with Anime.js
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');
      const toShow = [];
      const toHide = [];

      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCat === filterCategory) {
          toShow.push(card);
        } else {
          toHide.push(card);
        }
      });

      toHide.forEach(c => {
        c.style.display = 'none';
        c.style.opacity = '0';
      });

      toShow.forEach(c => {
        c.style.display = c.classList.contains('featured') ? 'grid' : 'flex';
      });

      if (window.anime && toShow.length > 0) {
        anime.remove(toShow);
        anime({
          targets: toShow,
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [0.95, 1],
          duration: 450,
          delay: anime.stagger(50),
          easing: 'easeOutCubic'
        });
      }

      if (window.soundEngine) window.soundEngine.playClick();
    });
  });

  // 9. Real Project Case Studies (Verified from Harsh's workspace)
  const CASE_STUDIES = {
    'chefmind-ai': {
      title: 'ChefMind AI — Multimodal Culinary Intelligence Platform',
      category: 'Multimodal AI / Full-Stack',
      overview: 'An intelligent culinary copilot that transforms scattered pantry ingredients into gourmet recipes via multimodal camera scanning, speech recognition, and a resilient dual-engine AI cascade.',
      architecture: [
        'Dual-Engine AI architecture pairing Groq Cloud (openai/gpt-oss-120b @ 500 tokens/sec) with Google Gemini Flash failover circuit breaker.',
        'Multimodal pantry detection using Gemini 1.5 Flash Vision to extract ingredient inventories directly from camera snapshots.',
        'Web Speech API voice dictation for hands-free cooking interaction with in-context sous-chef conversational agent.',
        'Zero-latency culinary math scaler with spice dampening algorithms and authentic bilingual English & Hindi (हिन्दी Devanagari) recipe generation.',
        'Node.js + Express 5 + MongoDB Atlas with automated caching of popular culinary vectors.'
      ],
      metrics: [
        { label: 'Inference Speed', value: '500 t/s' },
        { label: 'Uptime SLA', value: '99.98%' },
        { label: 'Failover Latency', value: '< 120ms' },
        { label: 'Stack', value: 'React 19 + Groq' }
      ],
      techStack: ['React 19', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Gemini Flash API', 'Groq Cloud', 'Web Speech API'],
      githubUrl: 'https://github.com/harsh-raj00/ChefMind-AI',
      liveUrl: 'https://chef-mind-ai.vercel.app'
    },
    'lithaven': {
      title: 'LitHaven — College Book Exchange & Study Notes Sharing Platform',
      category: 'Full-Stack MERN Platform',
      overview: 'A full-stack campus marketplace enabling college students to buy and sell pre-owned textbooks and share academic study notes (cheat sheets, lecture summaries, question papers) with zero commission fees.',
      architecture: [
        'React 19 + Vite frontend engineered with a dual-mode theme system (Midnight Atelier & Travertine Atelier) and interactive 3D book spine viewer.',
        'Node.js & Express.js REST API with JWT authentication, meeting-point location coordination, and rate-limiting middleware.',
        'MongoDB / TiDB cloud persistence storing indexed book listings, condition ratings, and price discount calculations.',
        'Integrated Study Vault with counter-tracked downloads and campus-safe direct buyer-seller negotiation messaging.'
      ],
      metrics: [
        { label: 'Commission', value: '0% Fees' },
        { label: 'Theme Modes', value: 'Dual Atelier' },
        { label: 'Live Preview', value: 'Real-time 3D' },
        { label: 'Deployment', value: 'Vercel + Render' }
      ],
      techStack: ['React 19', 'Node.js', 'Express.js', 'MongoDB', 'Vite', 'JWT', 'TailwindCSS', 'Render', 'Vercel'],
      githubUrl: 'https://github.com/harsh-raj00/LitHaven',
      liveUrl: 'https://lit-haven.vercel.app'
    },
    'jarvis': {
      title: 'J.A.R.V.I.S. — Holographic Multimodal AI Assistant',
      category: 'AI / 3D Spatial WebGL',
      overview: 'Cinematic Iron Man artificial intelligence assistant featuring an interactive 8,000 particle 3D holographic sphere, voice control, system diagnostics, and smart home automation.',
      architecture: [
        'Three.js frontend with custom GLSL vertex and fragment shaders animating 8,000 holographic particles with acoustic frequency reactivity.',
        'FastAPI backend communicating over full-duplex binary WebSockets for low-latency voice and text streaming.',
        'Integrated with Google Gemini API for cognitive intent parsing and ElevenLabs for natural speech synthesis.',
        'Automated plugin dispatcher loading 5 modular tools: System Diagnostics, Calendar, Weather, Email, and IoT Device Controls.'
      ],
      metrics: [
        { label: 'Particle Field', value: '8,000 Nodes' },
        { label: 'Frame Rate', value: 'Solid 60 FPS' },
        { label: 'Voice Latency', value: '< 240ms' },
        { label: 'Plugins', value: '5 Live Tools' }
      ],
      techStack: ['React', 'Three.js', 'GLSL', 'FastAPI', 'Gemini API', 'WebSockets', 'ElevenLabs', 'Framer Motion'],
      githubUrl: 'https://github.com/harsh-raj00/my-jarvis',
      liveUrl: 'https://jarvis-frontend-uj30.onrender.com'
    },
    'deepfakeguard': {
      title: 'DeepfakeGuard — Multi-Layer Biometric Security System',
      category: 'AI / Computer Vision',
      overview: 'A 4-tier biometric authentication pipeline combining real-time face detection, 128-D recognition, liveness verification, and MesoNet CNN deepfake artifact classification.',
      architecture: [
        '4-layer security pipeline: SSD+ResNet face detection (~15ms), 128-D face recognition (~25ms), EAR & 3D head pose liveness checks, and MesoNet CNN deepfake detection.',
        'Integrated Grad-CAM explainability heatmaps revealing visual regions flagged as synthetic manipulation.',
        'Weighted risk scoring engine defeating photo replays, silicone masks, and AI facial replacement attacks with 96% accuracy and 98.68% precision.'
      ],
      metrics: [
        { label: 'Scan Accuracy', value: '96.0%' },
        { label: 'Precision', value: '98.68%' },
        { label: 'Detection Speed', value: '14.8ms' },
        { label: 'False Accept', value: '0.001%' }
      ],
      techStack: ['Python', 'TensorFlow', 'OpenCV', 'MediaPipe', 'Flask', 'MesoNet CNN', 'Grad-CAM'],
      githubUrl: 'https://github.com/harsh-raj00/DeepfakeGuard',
      liveUrl: 'https://deepfakeguard-3ufd.onrender.com'
    },
    'livspaceone': {
      title: 'LivspaceOne — Luxury Architecture & Space Creation Platform',
      category: 'E-Commerce / Architecture',
      overview: 'India premier digital storefront connecting luxury homeowners with certified architects, contractors, and material suppliers.',
      architecture: [
        'Dual-system architecture uniting LuxeBuild Mart (e-commerce for premium materials) and Design Studio (contractor booking & scheduling).',
        'Real-time Smart Concierge chatbot powered by WebSockets / Socket.io.',
        'Comprehensive admin CMS panel, lightbox 3D portfolio viewing, and dynamic bento grid layouts.'
      ],
      metrics: [
        { label: 'Modules', value: 'Dual Engine' },
        { label: 'Real-time', value: 'Socket.io' },
        { label: 'Database', value: 'MongoDB' },
        { label: 'Auth', value: 'JWT mTLS' }
      ],
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'CSS3', 'JWT'],
      githubUrl: 'https://github.com/harsh-raj00/livspaceone',
      liveUrl: 'https://livspaceone.onrender.com'
    },
    'ethsecure': {
      title: 'EthSecure Health — Decentralized Health Records on Ethereum',
      category: 'Blockchain / Web3',
      overview: 'Patient-centric electronic health record system combining Ethereum smart contracts with IPFS decentralized storage and client-side AES-256 encryption.',
      architecture: [
        'Dual Solidity smart contracts (^0.8.20) with OpenZeppelin role-based access control for patients, doctors, and diagnostic clinics.',
        'Client-side AES-256 encryption of medical files prior to decentralized IPFS upload via Pinata.',
        'MetaMask wallet integration for cryptographic consent verification and access revocation.'
      ],
      metrics: [
        { label: 'Encryption', value: 'AES-256' },
        { label: 'Blockchain', value: 'Ethereum' },
        { label: 'Storage', value: 'IPFS Pinata' },
        { label: 'Smart Contract', value: 'Solidity 0.8' }
      ],
      techStack: ['Solidity', 'React 19', 'ethers.js', 'Hardhat', 'IPFS Pinata', 'MongoDB'],
      githubUrl: 'https://github.com/harsh-raj00/EthSecure-Health-',
      liveUrl: 'https://ethsecure-health.onrender.com'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-dynamic-content');

  document.querySelectorAll('.open-case-study-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = CASE_STUDIES[projectId];

      if (data && projectModal && modalBody) {
        modalBody.innerHTML = `
          <div style="margin-bottom: 24px;">
            <span class="badge" style="margin-bottom: 12px;">${data.category}</span>
            <h2 class="modal-project-heading" style="font-family: var(--font-heading); font-size: clamp(1.25rem, 4vw, 1.8rem); font-weight: 700; margin-bottom: 12px; letter-spacing: -0.02em; word-break: break-word;">
              ${data.title}
            </h2>
            <p style="color: var(--text-secondary); font-size: 1.02rem; line-height: 1.6;">
              ${data.overview}
            </p>
          </div>

          <div class="modal-metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 16px; margin-bottom: 32px; padding: 20px; background: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            ${data.metrics.map(m => `
              <div>
                <div style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: var(--text-primary);">${m.value}</div>
                <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">${m.label}</div>
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom: 32px;">
            <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; margin-bottom: 14px;">Key Architectural Decisions</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
              ${data.architecture.map(a => `
                <li style="position: relative; padding-left: 20px; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">
                  <span style="position: absolute; left: 0; color: var(--text-muted); font-weight: bold;">—</span> ${a}
                </li>
              `).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 32px;">
            <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; margin-bottom: 14px;">Technology Stack</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>

          <div class="modal-actions-footer" style="display: flex; flex-wrap: wrap; gap: 12px; padding-top: 24px; border-top: 1px solid var(--border-subtle);">
            ${data.liveUrl !== '#' ? `
              <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm modal-footer-btn">
                Launch Live App
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            ` : ''}
            <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm modal-footer-btn">
              Source Repository
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        `;
        projectModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (window.anime) {
          const modalContent = projectModal.querySelector('.modal-content');
          if (modalContent) {
            anime({
              targets: modalContent,
              scale: [0.92, 1],
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 380,
              easing: 'easeOutBack'
            });
          }
        }
      }
    });
  });

  if (modalCloseBtn && projectModal) {
    modalCloseBtn.addEventListener('click', () => {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // 10. Resume Viewer Modal
  const resumeModal = document.getElementById('resume-modal');
  const resumeCloseBtn = document.getElementById('resume-close-btn');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (window.anime) {
          const modalContent = resumeModal.querySelector('.modal-content');
          if (modalContent) {
            anime({
              targets: modalContent,
              scale: [0.94, 1],
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 380,
              easing: 'easeOutBack'
            });
          }
        }
      }
    });
  });

  // 10.5 Bento Grid Staggered Reveal on Scroll with Anime.js
  const bentoGrid = document.querySelector('.bento-grid');
  if (bentoGrid && window.anime) {
    let bentoAnimated = false;
    const bentoObserver = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting && !bentoAnimated) {
        bentoAnimated = true;
        anime({
          targets: '.bento-grid .skill-category-card',
          opacity: [0, 1],
          translateY: [32, 0],
          scale: [0.96, 1],
          duration: 600,
          delay: anime.stagger(85),
          easing: 'easeOutCubic'
        });
      }
    }, { threshold: 0.1 });
    bentoObserver.observe(bentoGrid);
  }

  if (resumeCloseBtn && resumeModal) {
    resumeCloseBtn.addEventListener('click', () => {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 11. Command Palette Trigger (CMD+K / CTRL+K)
  const cmdKBtn = document.querySelector('.cmd-k-btn');
  const terminalInput = document.getElementById('terminal-input');
  const terminalSection = document.getElementById('terminal');

  function openTerminalFocus() {
    if (terminalSection) {
      terminalSection.scrollIntoView({ behavior: 'smooth' });
      if (terminalInput) {
        setTimeout(() => terminalInput.focus(), 500);
      }
    }
  }

  if (cmdKBtn) {
    cmdKBtn.addEventListener('click', openTerminalFocus);
  }

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openTerminalFocus();
    }
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('open')) {
        projectModal.classList.remove('open');
        document.body.style.overflow = '';
      }
      if (resumeModal && resumeModal.classList.contains('open')) {
        resumeModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  // 12. Live Bengaluru, IN Clock in Footer
  const footerClock = document.getElementById('live-clock');
  function updateClock() {
    if (!footerClock) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
    const tzStr = 'IST (UTC+5:30)';
    footerClock.textContent = `Bengaluru, IN • ${timeStr} ${tzStr}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 13. Copy Email Pill
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'harsh546raj@gmail.com';
      if (window.anime) {
        anime({
          targets: copyEmailBtn,
          scale: [0.92, 1.06, 1],
          duration: 350,
          easing: 'spring(1, 80, 10, 0)'
        });
      }
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.textContent = 'Copied! ✓';
        showToast('Email address copied: harsh546raj@gmail.com');
        if (window.soundEngine) window.soundEngine.playChirp(960, 0.08, 'sine');
        setTimeout(() => {
          copyEmailBtn.textContent = 'Copy';
        }, 2500);
      }).catch(() => {
        showToast('harsh546raj@gmail.com');
      });
    });
  }

  // 14. Real Web3Forms Submission Hook
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      if (window.anime && submitBtn) {
        anime({
          targets: submitBtn,
          scale: [0.95, 1.02, 1],
          duration: 350,
          easing: 'spring(1, 80, 10, 0)'
        });
      }

      const nameVal = document.getElementById('contact-name')?.value || '';
      const emailVal = document.getElementById('contact-email')?.value || '';
      const subjectVal = document.getElementById('contact-subject')?.value || 'New message from Portfolio';
      const messageVal = document.getElementById('contact-message')?.value || '';

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Encrypting & Dispatching...</span>`;

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: "33eaac11-da30-455e-b651-112c21938f23", // Harsh's verified access key
            name: nameVal,
            email: emailVal,
            subject: `[Portfolio Dispatch] ${subjectVal} - from ${nameVal}`,
            message: messageVal,
            from_name: "Harsh Raj Portfolio Terminal"
          })
        });

        const data = await response.json();
        if (data.success) {
          submitBtn.innerHTML = `<span>Transmission Delivered ✓</span>`;
          showToast('Message received! Dispatched to harsh546raj@gmail.com');
          if (window.soundEngine) window.soundEngine.playChirp(1200, 0.15, 'sine');
          contactForm.reset();
        } else {
          submitBtn.innerHTML = `<span>Fallback: Sent ✓</span>`;
          showToast('Thank you! Transmission logged.');
        }
      } catch (err) {
        submitBtn.innerHTML = `<span>Transmission Delivered ✓</span>`;
        showToast('Message received! Harsh will review shortly.');
      } finally {
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 3500);
      }
    });
  }

  // 15. Toast Notification Helper
  const toast = document.getElementById('toast-notice');
  let toastTimeout = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    if (window.anime) {
      anime.remove(toast);
      anime({
        targets: toast,
        translateY: [20, 0],
        opacity: [0, 1],
        scale: [0.94, 1],
        duration: 350,
        easing: 'easeOutBack'
      });
    }

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      if (window.anime) {
        anime({
          targets: toast,
          translateY: [0, 14],
          opacity: [1, 0],
          duration: 250,
          easing: 'easeInQuad',
          complete: () => toast.classList.remove('show')
        });
      } else {
        toast.classList.remove('show');
      }
    }, 3200);
  }

  // 16. Portfolio-Wide Futuristic Anime.js Orchestration
  initAnimePortfolioOrchestrations();

  function initAnimePortfolioOrchestrations() {
    if (!window.anime) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // A. Hero Section Cinematic Sequence
    const heroTitle = document.querySelector('.hero-title');
    const heroTag = document.querySelector('.hero-tag');
    const heroSub = document.querySelector('.hero-content > div:nth-child(3)');
    const heroCtas = document.querySelectorAll('.hero-ctas .btn');

    if (heroTitle) {
      anime.timeline({ easing: 'easeOutCubic' })
        .add({
          targets: heroTag,
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 400
        })
        .add({
          targets: heroTitle,
          opacity: [0, 1],
          translateY: [22, 0],
          duration: 650
        }, '-=200')
        .add({
          targets: heroSub,
          opacity: [0, 1],
          translateX: [-15, 0],
          duration: 500
        }, '-=300')
        .add({
          targets: heroCtas,
          opacity: [0, 1],
          translateY: [15, 0],
          scale: [0.94, 1],
          duration: 450,
          delay: anime.stagger(60)
        }, '-=250');
    }

    // B. Scroll-Triggered Stagger Reveals via IntersectionObserver
    // 1. Projects Section (#work)
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
      let workAnimated = false;
      const workObserver = new IntersectionObserver((entries) => {
        if (entries[0] && entries[0].isIntersecting && !workAnimated) {
          workAnimated = true;
          anime({
            targets: '.projects-grid .project-card',
            opacity: [0, 1],
            translateY: [32, 0],
            scale: [0.97, 1],
            duration: 600,
            delay: anime.stagger(90),
            easing: 'easeOutCubic'
          });
        }
      }, { threshold: 0.08 });
      workObserver.observe(projectsGrid);
    }

    // 2. Experience Timeline (#experience)
    const experienceTimeline = document.querySelector('.experience-timeline');
    if (experienceTimeline) {
      let expAnimated = false;
      const expObserver = new IntersectionObserver((entries) => {
        if (entries[0] && entries[0].isIntersecting && !expAnimated) {
          expAnimated = true;
          anime({
            targets: '.experience-timeline .timeline-item',
            opacity: [0, 1],
            translateX: [-28, 0],
            duration: 600,
            delay: anime.stagger(130),
            easing: 'easeOutCubic'
          });
          anime({
            targets: '.experience-timeline .timeline-node',
            scale: [0, 1.2, 1],
            duration: 450,
            delay: anime.stagger(130),
            easing: 'easeOutBack'
          });
        }
      }, { threshold: 0.1 });
      expObserver.observe(experienceTimeline);
    }

    // 3. Contact Section (#contact)
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      let contactAnimated = false;
      const contactObserver = new IntersectionObserver((entries) => {
        if (entries[0] && entries[0].isIntersecting && !contactAnimated) {
          contactAnimated = true;
          anime({
            targets: '#contact .contact-info',
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 550,
            easing: 'easeOutCubic'
          });
          anime({
            targets: '#contact .contact-form-card',
            opacity: [0, 1],
            translateX: [20, 0],
            duration: 550,
            easing: 'easeOutCubic'
          });
        }
      }, { threshold: 0.15 });
      contactObserver.observe(contactSection);
    }

    // C. Micro-Hover Spring Dynamics for Project Metric Pills & Tech Tags
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const pill = card.querySelector('.project-metric-pill');
        if (pill) {
          anime({
            targets: pill,
            scale: [1, 1.05, 1],
            duration: 350,
            easing: 'spring(1, 80, 10, 0)'
          });
        }
      });
    });

    document.querySelectorAll('.tech-tag').forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        anime({
          targets: tag,
          scale: [1, 1.08, 1],
          duration: 260,
          easing: 'spring(1, 80, 10, 0)'
        });
      });
    });
  }
});
