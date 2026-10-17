/**
 * HARSH RAJ — 3D HOLOGRAPHIC SPATIAL ENGINE (ADVANCED V2)
 * Features dynamic particle morphing between distinct topologies:
 * 1. JARVIS 3D Sphere (Holographic Arc-Reactor core)
 * 2. 5-Layer Deep Neural Network (Multi-Layer Perceptron with synaptic pulse signals)
 * 3. Vortex Galaxy (Swirling cosmic accretion disk)
 * 4. Cyber Wave (Topographical terrain matrix)
 */

class HologramCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.mode = 'sphere'; // 'sphere' | 'neural' | 'vortex' | 'wave'
    this.numPoints = 550;
    this.points = [];
    this.synapses = [];
    this.pulses = [];
    this.radius = 160;

    this.rotX = 0;
    this.rotY = 0;
    this.velocityX = 0.002;
    this.velocityY = 0.003;

    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.initCanvasSize();
    this.generateParticles();
    this.buildSynapses();
    this.bindEvents();
    this.animate();
  }

  initCanvasSize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width || 480;
    this.height = Math.min(rect.height || 420, 480);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(dpr, dpr);
    this.radius = Math.min(this.width, this.height) * 0.38;
  }

  generateParticles() {
    this.points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < this.numPoints; i++) {
      // 1. Sphere Geometry Coordinates
      const y = 1 - (i / (this.numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const sx = Math.cos(theta) * radiusAtY * this.radius;
      const sy = y * this.radius;
      const sz = Math.sin(theta) * radiusAtY * this.radius;

      // 2. 5-Layer Deep Neural Network Architecture
      const numLayers = 5;
      const layer = i % numLayers;
      // Layers arranged along X-axis: Input (-130), Hidden1 (-65), Hidden2 (0), Hidden3 (+65), Output (+130)
      const nx = (layer - 2) * 65;
      const subIdx = Math.floor(i / numLayers);
      const pointsInLayer = Math.ceil(this.numPoints / numLayers);
      const layerRadius = Math.sqrt((subIdx + 1) / pointsInLayer) * (this.radius * 0.88);
      const layerAngle = subIdx * 2.399963; // Dispersion angle

      const ny = Math.cos(layerAngle) * layerRadius;
      const nz = Math.sin(layerAngle) * layerRadius;

      // 3. Grid Coordinates (for Wave & Vortex initial baselines)
      const gridCols = 25;
      const gx = ((i % gridCols) - gridCols / 2) * 14;
      const gz = (Math.floor(i / gridCols) - (this.numPoints / gridCols) / 2) * 14;

      this.points.push({
        id: i,
        layer: layer,
        // Current morphing coordinates
        baseX: sx,
        baseY: sy,
        baseZ: sz,
        // Specific target baselines
        sphereX: sx,
        sphereY: sy,
        sphereZ: sz,
        neuralX: nx,
        neuralY: ny,
        neuralZ: nz,
        gridX: gx,
        gridZ: gz,
        size: 1 + Math.random() * 1.6,
        pulseOffset: Math.random() * Math.PI * 2,
        active: false
      });
    }
  }

  buildSynapses() {
    this.synapses = [];
    // Connect selected representative nodes from Layer L to Layer L+1
    const nodesByLayer = [[], [], [], [], []];
    this.points.forEach(p => nodesByLayer[p.layer].push(p));

    for (let l = 0; l < 4; l++) {
      const fromLayer = nodesByLayer[l];
      const toLayer = nodesByLayer[l + 1];

      // Create sparse, aesthetic neural axons between layers
      for (let i = 0; i < fromLayer.length; i += 3) {
        const fromNode = fromLayer[i];
        // Connect to 2-3 closest nodes in next layer
        for (let j = 0; j < toLayer.length; j += 4) {
          const toNode = toLayer[j];
          const dist = Math.hypot(fromNode.neuralY - toNode.neuralY, fromNode.neuralZ - toNode.neuralZ);
          if (dist < 75) {
            this.synapses.push({
              from: fromNode,
              to: toNode,
              weight: Math.random() * 0.4 + 0.2
            });
          }
        }
      }
    }

    // Spawn 12 continuous neural action potential data pulses
    this.pulses = [];
    for (let k = 0; k < 14; k++) {
      this.pulses.push({
        synapseIdx: Math.floor(Math.random() * this.synapses.length),
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.initCanvasSize());

    // Mouse drag rotation
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.lastMouseX;
      const deltaY = e.clientY - this.lastMouseY;

      this.velocityY = deltaX * 0.005;
      this.velocityX = -deltaY * 0.005;

      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch support
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.lastMouseX;
      const deltaY = e.touches[0].clientY - this.lastMouseY;

      this.velocityY = deltaX * 0.006;
      this.velocityX = -deltaY * 0.006;

      this.lastMouseX = e.touches[0].clientX;
      this.lastMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Mode Buttons
    const modeBtns = document.querySelectorAll('.holo-mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setMode(btn.getAttribute('data-mode'), btn);
        if (window.soundEngine) window.soundEngine.playClick();
      });
    });
  }

  setMode(mode, btn) {
    this.mode = mode;

    const titles = {
      sphere: "ARC-REACTOR // 3D FIBONACCI SPHERE",
      neural: "SYNAPSE-CORE // 5-LAYER NEURAL NET",
      vortex: "ACCRETION-DISK // VORTEX GALAXY",
      wave: "TERRAIN-MATRIX // CYBERNETIC WAVE"
    };

    const hudTitle = document.getElementById('holo-hud-title');
    if (hudTitle && titles[mode]) {
      if (window.anime) {
        anime({
          targets: hudTitle,
          opacity: [0, 1],
          translateX: [-10, 0],
          duration: 320,
          easing: 'easeOutQuad'
        });
      }
      hudTitle.textContent = titles[mode];
    }

    if (btn && window.anime) {
      anime({
        targets: btn,
        scale: [0.93, 1],
        duration: 300,
        easing: 'easeOutBack'
      });
    }

    const card = document.querySelector('.hologram-card');
    if (card && window.anime) {
      anime({
        targets: card,
        borderColor: ['rgba(255,255,255,0.45)', 'var(--border-subtle)'],
        duration: 450,
        easing: 'easeOutQuad'
      });
    }
  }

  rotatePoint(p, pitch, yaw) {
    // Rotate around Y
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    let x1 = p.x * cosY - p.z * sinY;
    let z1 = p.z * cosY + p.x * sinY;

    // Rotate around X
    const cosX = Math.cos(pitch);
    const sinX = Math.sin(pitch);
    let y1 = p.y * cosX - z1 * sinX;
    let z2 = z1 * cosX + p.y * sinX;

    return { x: x1, y: y1, z: z2 };
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const primaryColor = isDark ? 255 : 15;
    const fov = 400;
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Inertia decay
    if (!this.isDragging) {
      this.velocityY *= 0.96;
      this.velocityX *= 0.96;
      if (Math.abs(this.velocityY) < 0.001) this.velocityY = 0.002;
      if (Math.abs(this.velocityX) < 0.001) this.velocityX = 0.001;
    }

    this.rotY += this.velocityY;
    this.rotX += this.velocityX;

    const time = performance.now() * 0.0015;
    const projectedPoints = [];

    // Fluid particle morphing & 3D projection
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      let targetX, targetY, targetZ;

      if (this.mode === 'sphere') {
        // True JARVIS 3D Hologram Sphere
        targetX = p.sphereX;
        targetY = p.sphereY;
        targetZ = p.sphereZ;
      } else if (this.mode === 'neural') {
        // Distinct 5-Layer Deep Neural Network Architecture
        // Add gentle synaptic pulsing oscillation
        const layerPulse = Math.sin(time * 3 + p.layer * 1.2) * 4;
        targetX = p.neuralX;
        targetY = p.neuralY + layerPulse;
        targetZ = p.neuralZ;
      } else if (this.mode === 'vortex') {
        // Cosmic Accretion Vortex
        const angle = Math.sqrt(p.gridX * p.gridX + p.gridZ * p.gridZ) * 0.03 - time * 1.5;
        const rad = Math.sqrt(p.gridX * p.gridX + p.gridZ * p.gridZ) * 1.4;
        targetX = Math.cos(angle) * rad;
        targetY = Math.sin(angle * 2) * 18;
        targetZ = Math.sin(angle) * rad;
      } else if (this.mode === 'wave') {
        // Cyber Terrain Wave
        targetX = p.gridX * 1.3;
        targetY = Math.sin(p.gridX * 0.05 + time * 3) * 25 + Math.cos(p.gridZ * 0.05 + time * 2) * 20;
        targetZ = p.gridZ * 1.3;
      }

      // Smooth Morphing Interpolation
      p.baseX += (targetX - p.baseX) * 0.09;
      p.baseY += (targetY - p.baseY) * 0.09;
      p.baseZ += (targetZ - p.baseZ) * 0.09;

      // 3D Matrix Rotation
      const rotated = this.rotatePoint({ x: p.baseX, y: p.baseY, z: p.baseZ }, this.rotX, this.rotY);

      // Perspective Projection
      const scale = fov / (fov + rotated.z);
      const projX = centerX + rotated.x * scale;
      const projY = centerY + rotated.y * scale;
      const alpha = Math.max(0.1, Math.min(1, (rotated.z + this.radius) / (2 * this.radius) * 0.85 + 0.15));

      p.projX = projX;
      p.projY = projY;
      p.projZ = rotated.z;
      p.scale = scale;
      p.alpha = alpha;

      projectedPoints.push(p);
    }

    // Sort by depth
    projectedPoints.sort((a, b) => a.projZ - b.projZ);

    // =========================================================================
    // NEURAL NETWORK MODE: Draw Synaptic Pathways & Action Potential Pulses
    // =========================================================================
    if (this.mode === 'neural') {
      // 1. Draw Layer Ring Guides
      const layerNames = ['INPUT // IN', 'CONV // L1', 'DENSE // L2', 'ATTN // L3', 'OUTPUT // OUT'];
      for (let l = 0; l < 5; l++) {
        const lx = (l - 2) * 65;
        // Transform layer center
        const layerCenter = this.rotatePoint({ x: lx, y: 0, z: 0 }, this.rotX, this.rotY);
        const lScale = fov / (fov + layerCenter.z);
        const lX = centerX + layerCenter.x * lScale;
        const lY = centerY + layerCenter.y * lScale;

        // Draw faint layer plane boundary
        this.ctx.beginPath();
        this.ctx.ellipse(lX, lY, 14 * lScale, 80 * lScale, this.rotX, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(${primaryColor}, ${primaryColor}, ${primaryColor}, 0.08)`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        // Draw subtle layer label
        if (lScale > 0.8) {
          this.ctx.font = `${Math.floor(8 * lScale)}px "JetBrains Mono", monospace`;
          this.ctx.fillStyle = `rgba(${primaryColor}, ${primaryColor}, ${primaryColor}, 0.4)`;
          this.ctx.fillText(layerNames[l], lX - 25, lY - 88 * lScale);
        }
      }

      // 2. Draw Synaptic Axon Connections
      this.ctx.lineWidth = 0.5;
      for (let s = 0; s < this.synapses.length; s++) {
        const syn = this.synapses[s];
        if (syn.from.projX && syn.to.projX) {
          const synAlpha = syn.weight * Math.min(syn.from.alpha, syn.to.alpha) * 0.35;
          this.ctx.strokeStyle = `rgba(${primaryColor}, ${primaryColor}, ${primaryColor}, ${synAlpha})`;
          this.ctx.beginPath();
          this.ctx.moveTo(syn.from.projX, syn.from.projY);
          this.ctx.lineTo(syn.to.projX, syn.to.projY);
          this.ctx.stroke();
        }
      }

      // 3. Draw Action Potential Data Pulses traveling across Synapses
      for (let k = 0; k < this.pulses.length; k++) {
        const pulse = this.pulses[k];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.synapseIdx = Math.floor(Math.random() * this.synapses.length);
        }

        const syn = this.synapses[pulse.synapseIdx];
        if (syn && syn.from.projX && syn.to.projX) {
          const px = syn.from.projX + (syn.to.projX - syn.from.projX) * pulse.progress;
          const py = syn.from.projY + (syn.to.projY - syn.from.projY) * pulse.progress;

          this.ctx.beginPath();
          this.ctx.arc(px, py, 2.2 * syn.from.scale, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(${primaryColor}, ${primaryColor}, ${primaryColor}, 0.95)`;
          this.ctx.fill();

          if (isDark) {
            this.ctx.beginPath();
            this.ctx.arc(px, py, 4.5 * syn.from.scale, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, 0.35)`;
            this.ctx.fill();
          }
        }
      }
    }

    // =========================================================================
    // DRAW PARTICLES / NEURONS
    // =========================================================================
    for (let i = 0; i < projectedPoints.length; i++) {
      const p = projectedPoints[i];
      let pSize = Math.max(0.8, p.size * p.scale);

      // In neural mode, nodes with connections are drawn slightly larger with rings
      if (this.mode === 'neural' && p.id % 4 === 0) {
        pSize = Math.max(1.8, pSize * 1.4);
      }

      this.ctx.beginPath();
      this.ctx.arc(p.projX, p.projY, pSize, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${primaryColor}, ${primaryColor}, ${primaryColor}, ${p.alpha})`;
      this.ctx.fill();

      // Glowing aura for foreground nodes
      if (p.projZ > 0 && isDark) {
        this.ctx.beginPath();
        this.ctx.arc(p.projX, p.projY, pSize * 2, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.16})`;
        this.ctx.fill();
      }
    }

    // Central Core Arc-Reactor HUD
    if (this.mode === 'sphere') {
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(${primaryColor}, ${primaryColor}, ${primaryColor}, 0.6)`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      this.ctx.setLineDash([3, 5]);
      this.ctx.strokeStyle = `rgba(${primaryColor}, ${primaryColor}, ${primaryColor}, 0.3)`;
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.hologramCanvas = new HologramCanvas('hologram-canvas');
});
