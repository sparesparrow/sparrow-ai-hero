// app.js - SPARROW AI HERO: Gonzo Portfolio Engine

// Gemini AI Configuration
// Replace 'YOUR_GEMINI_API_KEY' with your actual Gemini API key
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
let geminiModel = null;

// Initialize Gemini AI
function initGeminiAI() {
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY') {
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });
      console.log('Gemini AI initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
      geminiModel = null;
    }
  } else {
    console.log('Gemini API key not configured - using fallback responses');
  }
}

// Theme and Language Management
const themes = ['cyberpunk', 'professional', 'minimal', 'matrix'];
const languages = ['en', 'cs'];
let currentTheme = localStorage.getItem('theme') || 'cyberpunk';
let currentLanguage = localStorage.getItem('language') || 'en';

// Language data
const translations = {
  en: {
    nav: {
      home: 'Home',
      stats: 'Stats',
      expertise: 'Expertise',
      weapons: 'Weapons',
      manifestos: 'Manifestos',
      tools: 'Tools',
      contact: 'Contact'
    },
    hero: {
      title: 'SPARROW AI HERO',
      subtitle: 'Tales from Cyberpunk Underground',
      tagline: 'AI Developer & MCP Protocol Specialist',
      cta1: 'Explore My Work',
      cta2: 'View Projects'
    },
    stats: {
      title: 'DIGITAL WARRIOR STATS',
      projects: 'MCP Projects',
      coverage: 'Test Coverage',
      response: 'Faster Response',
      bugs: 'Fewer Bugs'
    },
    expertise: {
      title: 'EXPERTISE AREAS',
      mcp: {
        title: 'MCP Protocol Development',
        desc: 'Building standardized AI tool integrations',
        gonzoName: 'PROTOCOL REVOLUTION FORGE'
      },
      ai: {
        title: 'AI System Orchestration',
        desc: 'Coordinating complex AI workflows and pipelines',
        gonzoName: 'CHAOS COORDINATION ENGINE'
      },
      security: {
        title: 'Infrastructure & Security',
        desc: 'Robust system architecture and security practices',
        gonzoName: 'DIGITAL FORTRESS ARCHITECTURE'
      }
    },
    weapons: {
      title: 'PROJECT PORTFOLIO'
    },
    manifestos: {
      title: 'PUBLICATIONS'
    },
    tools: {
      title: 'INTERACTIVE DEMOS',
      mermaid: {
        title: 'Mermaid Diagram Editor',
        desc: 'Create live flowcharts and diagrams'
      },
      voice: {
        title: 'Voice Assistant Demo',
        desc: 'Experience voice-enabled AI interaction'
      },
      chatbot: {
        title: 'AI Chatbot Interface',
        desc: 'Test conversational AI capabilities'
      },
      infographics: {
        title: 'Data Visualizations',
        desc: 'Interactive charts and analytics'
      }
    },
    contact: {
      title: 'GET IN TOUCH',
      desc: 'Let\'s discuss your next project or collaboration opportunity.'
    }
  },
  cs: {
    nav: {
      home: 'Domů',
      stats: 'Statistiky',
      expertise: 'Expertízy',
      weapons: 'Zbraně',
      manifestos: 'Manifesty',
      tools: 'Nástroje',
      contact: 'Kontakt'
    },
    hero: {
      title: 'SPARROW AI HERO',
      subtitle: 'Příběhy z Kyberpunkového Podzemí',
      tagline: 'Vývojář AI & Specialista na MCP Protokoly',
      cta1: 'Prozkoumat Práci',
      cta2: 'Zobrazit Projekty'
    },
    stats: {
      title: 'DIVOKÉ STATISTIKY DIGITÁLNÍHO VÁLEČNÍKA',
      projects: 'MCP Projekty',
      coverage: 'Pokrytí Testy',
      response: 'Rychlejší Odezva',
      bugs: 'Méně Chyb'
    },
    expertise: {
      title: 'KLÍČOVÉ OBLASTI EXPERTÍZY',
      mcp: {
        title: 'Vývoj MCP',
        desc: 'Digitální zbraně masového osvobození',
        gonzoName: 'PROTOCOL REVOLUTION FORGE'
      },
      ai: {
        title: 'AI Orchestrace',
        desc: 'Orchestrující vzpouru',
        gonzoName: 'CHAOS COORDINATION ENGINE'
      },
      security: {
        title: 'Bezpečnost & Infrastruktura',
        desc: 'Neprůstřelné systémy pro revoluci',
        gonzoName: 'DIGITAL FORTRESS ARCHITECTURE'
      }
    },
    weapons: {
      title: 'ARSENÁL ZBRANÍ'
    },
    manifestos: {
      title: 'MANIFESTY Z DIGITÁLNÍHO PODZEMÍ'
    },
    tools: {
      title: 'DIGITÁLNÍ ZBRANĚ & NÁSTROJE',
      mermaid: {
        title: 'Mermaid Editor Diagramů',
        desc: 'Vytvářejte živé vývojové diagramy'
      },
      voice: {
        title: 'SPAREBOT Hlasový Asistent',
        desc: 'Povídejte si s digitálním revolucionářem'
      },
      chatbot: {
        title: 'AI Chatbot Rozhraní',
        desc: 'Zažijte budoucnost konverzace'
      },
      infographics: {
        title: 'MCP Infografiky',
        desc: 'Vizualizujte ekosystém revoluce'
      }
    },
    contact: {
      title: 'KONTAKTUJTE DIGITÁLNÍHO VÁLEČNÍKA',
      desc: 'Připraveni se připojit k revoluci? Kontaktujte nás prostřednictvím těchto kanálů:'
    }
  }
};

// Data structures for the portfolio
const portfolioData = {
  expertise: [
    {
      title: "MCP Protocol Development",
      description: "Building standardized AI tool integrations",
      icon: "🔥",
      tags: ["TypeScript", "Rust", "AI"],
      gonzoName: "PROTOCOL REVOLUTION FORGE"
    },
    {
      title: "AI System Orchestration",
      description: "Coordinating complex AI workflows and pipelines",
      icon: "🎯",
      tags: ["Python", "PostgreSQL", "Docker"],
      gonzoName: "CHAOS COORDINATION ENGINE"
    },
    {
      title: "Infrastructure & Security",
      description: "Robust system architecture and security practices",
      icon: "🛡️",
      tags: ["Security", "DevOps", "Monitoring"],
      gonzoName: "DIGITAL FORTRESS ARCHITECTURE"
    }
  ],
  projects: {
    "C/C++": [
      {
        name: "IPMON",
        description: "Network monitoring and analysis tool",
        url: "https://github.com/sparesparrow/ipmon",
        tags: ["C", "Networking", "Linux"],
        icon: "🌐"
      },
      {
        name: "TinySDK",
        description: "Minimal C++ SDK for MCP integration",
        url: "https://github.com/sparesparrow/tinysdk",
        tags: ["C++", "MCP", "SDK"],
        icon: "⚙️"
      }
    ],
    "Python": [
      {
        name: "GitHub Events",
        description: "GitHub webhook event processor and analyzer",
        url: "https://github.com/sparesparrow/github-events",
        tags: ["Python", "GitHub", "Webhooks"],
        icon: "🐙"
      },
      {
        name: "Human Action",
        description: "Human action recognition and processing system",
        url: "https://github.com/sparesparrow/human-action",
        tags: ["Python", "AI", "Computer Vision"],
        icon: "👤"
      },
      {
        name: "MCP Project Orchestrator",
        description: "Orchestrates scaffolds and patterns from user intent",
        url: "https://github.com/sparesparrow/mcp-project-orchestrator",
        tags: ["Python", "CLI", "MCP"],
        icon: "🎭"
      }
    ],
    "JavaScript": [
      {
        name: "MCP Prompts",
        description: "Model Context Protocol prompt server and templates",
        url: "https://github.com/sparesparrow/mcp-prompts",
        tags: ["JavaScript", "MCP", "Templates"],
        icon: "📚"
      },
      {
        name: "Podman Desktop Extension MCP",
        description: "MCP extension for Podman Desktop environment",
        url: "https://github.com/sparesparrow/podman-desktop-extension-mcp",
        tags: ["JavaScript", "Podman", "Desktop"],
        icon: "🐳"
      }
    ],
    "Kotlin": [
      {
        name: "Cliphist Android",
        description: "Advanced clipboard management for Android",
        url: "https://github.com/sparesparrow/cliphist-android",
        tags: ["Kotlin", "Android", "UI"],
        icon: "📱"
      }
    ],
    "Rust": [
      {
        name: "RTP MIDI",
        description: "Real-time MIDI processing for low-latency audio",
        url: "https://github.com/sparesparrow/rtp-midi",
        tags: ["Rust", "Audio", "Real-time"],
        icon: "🎵"
      },
      {
        name: "Rust Network Manager",
        description: "Network management utilities in Rust",
        url: "https://github.com/sparesparrow/rust-network-mgr",
        tags: ["Rust", "Networking", "Systems"],
        icon: "⚡"
      },
      {
        name: "SIEM",
        description: "Security Information and Event Management system",
        url: "https://github.com/sparesparrow/siem",
        tags: ["Rust", "Security", "Logging"],
        icon: "🔒"
      }
    ]
  },
  manifestos: [
    {
      title: "Následky státního školství",
      date: "2025-04-30",
      description: "Exposing the State Education Scam",
      url: "https://stoky.seznam.cz/clanek/nasledky-statniho-skolstvi-12345"
    },
    {
      title: "Stát proti podnikání",
      date: "2025-03-25",
      description: "The State's War Against Entrepreneurs",
      url: "https://stoky.seznam.cz/clanek/stat-proti-podnikani-12346"
    },
    {
      title: "Kyberkriminalita jako klíč k dohledu",
      date: "2024-11-01",
      description: "Cybercrime as the Key to Surveillance State",
      url: "https://stoky.seznam.cz/clanek/kyberkriminalita-do-hledu-12347"
    }
  ]
};

// Typewriter effect utility
function typewriterEffect(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  function typeWriter() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();
}

// Animate counters
function animateCounter(element, target, suffix = '', duration = 2000, isNegative = false) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    const displayValue = isNegative ? -Math.floor(start) : Math.floor(start);
    element.textContent = displayValue + suffix;
  }, 16);
}

// Theme and Language Management Functions
function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIndicator();
}

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  updateThemeIndicator();
  updateContent();
}

function updateThemeIndicator() {
  const indicator = document.getElementById('current-theme-lang');
  const themeShort = currentTheme === 'cyberpunk' ? 'CYBER' :
                     currentTheme === 'professional' ? 'PROF' :
                     currentTheme === 'minimal' ? 'MIN' : 'MATRIX';
  const langShort = currentLanguage.toUpperCase();
  indicator.textContent = `${themeShort}/${langShort}`;
}

function updateContent() {
  const t = translations[currentLanguage];

  function setTextIfPresent(selector, text) {
    const el = document.querySelector(selector);
    if (el && typeof text === 'string') {
      el.textContent = text;
    }
  }

  // Update navigation (map "weapons" label to the actual #projects link)
  setTextIfPresent('a[href="#hero"]', t.nav.home);
  setTextIfPresent('a[href="#stats"]', t.nav.stats);
  setTextIfPresent('a[href="#expertise"]', t.nav.expertise);
  setTextIfPresent('a[href="#projects"]', t.nav.weapons);
  setTextIfPresent('a[href="#manifestos"]', t.nav.manifestos);
  setTextIfPresent('a[href="#tools"]', t.nav.tools);
  setTextIfPresent('a[href="#contact"]', t.nav.contact);

  // Update hero
  setTextIfPresent('#hero-title', t.hero.title);
  setTextIfPresent('#hero-subtitle', t.hero.subtitle);
  setTextIfPresent('#hero-tagline', t.hero.tagline);
  setTextIfPresent('#start-journey-btn', t.hero.cta1);
  setTextIfPresent('#weapons-btn', t.hero.cta2);

  // Update section titles (map weapons -> projects)
  setTextIfPresent('#stats .section-title', (t.stats && t.stats.title) || '');
  setTextIfPresent('#expertise .section-title', t.expertise.title);
  setTextIfPresent('#projects .section-title', (t.weapons && t.weapons.title) || 'PROJECTS');
  setTextIfPresent('#manifestos .section-title', t.manifestos.title);
  setTextIfPresent('#tools .section-title', t.tools.title);
  setTextIfPresent('#contact .section-title', t.contact.title);
  setTextIfPresent('.contact-content p', t.contact.desc);

  // Update expertise cards (skip the "title" key)
  const expertiseCards = document.querySelectorAll('.expertise-card');
  expertiseCards.forEach((card, index) => {
    const exp = Object.values(t.expertise)[index + 1];
    if (exp) {
      const titleEl = card.querySelector('h3');
      const descEl = card.querySelector('p');
      const gonzoEl = card.querySelector('.expertise-gonzo-name');
      if (titleEl) titleEl.textContent = exp.title;
      if (descEl) descEl.textContent = exp.desc;
      if (gonzoEl) gonzoEl.textContent = exp.gonzoName;
    }
  });

  // Update tools (skip the "title" key)
  const toolCards = document.querySelectorAll('.tool-card');
  toolCards.forEach((card, index) => {
    const tool = Object.values(t.tools)[index + 1];
    if (tool) {
      const titleEl = card.querySelector('h3');
      const descEl = card.querySelector('p');
      if (titleEl) titleEl.textContent = tool.title;
      if (descEl) descEl.textContent = tool.desc;
    }
  });
}

// Visual Effects
function initSparkles() {
  const sparklesContainer = document.createElement('div');
  sparklesContainer.className = 'sparkles-container';
  document.body.appendChild(sparklesContainer);

  setInterval(() => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = '✨';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 2 + 's';

    sparklesContainer.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 3000);
  }, 800);
}

function initMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-rain';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const matrix = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const matrixArray = matrix.split('');

  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00aa44';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 35);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
  });
}

// Glitch effect for title
function initGlitchEffect() {
  const title = document.getElementById('hero-title');
  title.classList.add('glitch-text');
  title.setAttribute('data-text', 'SPARROW AI HERO');
}

// Initialize the portfolio
function initPortfolio() {
  // Initialize AI first
  initGeminiAI();

  // Apply saved theme and language
  setTheme(currentTheme);
  setLanguage(currentLanguage);

  initHero();
  initStats();
  initProjects();
  initExpertise();
  initManifestos();
  initTools();
  initNavigation();
  initThemeLanguageControls();

  // Initialize visual effects
  setTimeout(() => {
    initSparkles();
    initMatrixRain();
    initScrollAnimations();
    initGlitchEffect();
  }, 1000);
}

// Theme and Language Controls
function initThemeLanguageControls() {
  const themeBtn = document.getElementById('theme-toggle');
  const langBtn = document.getElementById('lang-toggle');

  themeBtn.addEventListener('click', () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  });

  langBtn.addEventListener('click', () => {
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  });
}

// Stats Section
function initStats() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(document.getElementById('projects-count'), 15);
        animateCounter(document.getElementById('coverage-count'), 98);
        animateCounter(document.getElementById('response-count'), 3);
        animateCounter(document.getElementById('bugs-count'), 85, '%', 2000, true);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// Hero Section
function initHero() {
  const subtitle = document.getElementById('hero-subtitle');
  const tagline = document.getElementById('hero-tagline');
  const startBtn = document.getElementById('start-journey-btn');
  const weaponsBtn = document.getElementById('weapons-btn');

  // Get current translations
  const t = translations[currentLanguage];

  // Typewriter effects with current language
  setTimeout(() => typewriterEffect(subtitle, t.hero.subtitle), 500);
  setTimeout(() => typewriterEffect(tagline, t.hero.tagline), 2000);

  startBtn.addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  });

  weaponsBtn.addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  });
}

// Projects Section - Categorized by Programming Language
function initProjects() {
  const projectsContent = document.getElementById('projects-content');

  Object.entries(portfolioData.projects).forEach(([language, projects], categoryIndex) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'language-category fade-in-up';
    categoryDiv.style.animationDelay = `${categoryIndex * 0.3}s`;

    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = language;
    categoryDiv.appendChild(categoryTitle);

    const projectGrid = document.createElement('div');
    projectGrid.className = 'project-grid';

    projects.forEach((project, projectIndex) => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card fade-in-up';
      projectCard.style.animationDelay = `${categoryIndex * 0.3 + projectIndex * 0.1}s`;
      projectCard.innerHTML = `
        <div class="project-header">
          <div class="project-icon">${project.icon}</div>
          <h3 class="project-name">${project.name}</h3>
        </div>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <a href="${project.url}" target="_blank" class="project-link">View Code →</a>
      `;
      projectGrid.appendChild(projectCard);
    });

    categoryDiv.appendChild(projectGrid);
    projectsContent.appendChild(categoryDiv);
  });
}

// Expertise Section
function initExpertise() {
  const expertiseGrid = document.getElementById('expertise-grid');
  const t = translations[currentLanguage];

  // Update expertise with translations
  const translatedExpertise = [
    {
      title: t.expertise.mcp.title,
      description: t.expertise.mcp.desc,
      icon: "🔥",
      tags: ["TypeScript", "Rust", "AI"],
      gonzoName: t.expertise.mcp.gonzoName
    },
    {
      title: t.expertise.ai.title,
      description: t.expertise.ai.desc,
      icon: "🎯",
      tags: ["Python", "PostgreSQL", "Docker"],
      gonzoName: t.expertise.ai.gonzoName
    },
    {
      title: t.expertise.security.title,
      description: t.expertise.security.desc,
      icon: "🛡️",
      tags: ["Security", "DevOps", "Monitoring"],
      gonzoName: t.expertise.security.gonzoName
    }
  ];

  translatedExpertise.forEach((area, index) => {
    const areaCard = document.createElement('div');
    areaCard.className = `expertise-card fade-in-up`;
    areaCard.style.animationDelay = `${index * 0.3}s`;
    areaCard.innerHTML = `
      <div class="expertise-icon">${area.icon}</div>
      <h3 class="expertise-title">${area.title}</h3>
      <p class="expertise-description">${area.description}</p>
      <div class="expertise-gonzo-name">${area.gonzoName}</div>
      <div class="expertise-tags">
        ${area.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    `;
    expertiseGrid.appendChild(areaCard);
  });
}

// Manifestos Section
function initManifestos() {
  const manifestosContent = document.getElementById('manifestos-content');

  portfolioData.manifestos.forEach(manifesto => {
    const manifestoCard = document.createElement('div');
    manifestoCard.className = 'manifesto-card';
    manifestoCard.innerHTML = `
      <h3 class="manifesto-title">${manifesto.title}</h3>
      <p class="manifesto-description">${manifesto.description}</p>
      <div class="manifesto-date">${manifesto.date}</div>
      <a href="${manifesto.url}" target="_blank" class="manifesto-link">Read Manifesto →</a>
    `;
    manifestosContent.appendChild(manifestoCard);
  });
}

// Interactive Tools
function initTools() {
  // Update tool card content with translations
  const t = translations[currentLanguage];
  const toolCards = document.querySelectorAll('.tool-card');
  toolCards.forEach((card, index) => {
    const tool = Object.values(t.tools)[index + 1]; // Skip title
    if (tool) {
      card.querySelector('h3').textContent = tool.title;
      card.querySelector('p').textContent = tool.desc;
    }
  });

  // Mermaid Editor
  document.getElementById('open-mermaid-btn').addEventListener('click', openMermaidEditor);

  // Voice Chat
  document.getElementById('open-voice-btn').addEventListener('click', openVoiceChat);

  // Chatbot
  document.getElementById('open-chatbot-btn').addEventListener('click', openChatbot);

  // Infographics
  document.getElementById('open-infographics-btn').addEventListener('click', openInfographics);

  // Modal close
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-backdrop').addEventListener('click', closeModal);
}

// Modal functions
function openModal(content) {
  const modalContainer = document.getElementById('modal-container');
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = content;
  modalContainer.style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal-container').style.display = 'none';
}

// Tool implementations
function openMermaidEditor() {
  const content = `
    <div class="mermaid-editor">
      <h2>🎨 GONZO DIAGRAM EDITOR</h2>
      <select id="diagram-examples" class="diagram-select">
        <option>Choose Example...</option>
        <option value="flowchart">Digital Revolution Flow</option>
        <option value="sequence">AI Liberation Sequence</option>
        <option value="economic">Austrian Economics Flow</option>
      </select>
      <textarea id="mermaid-code" class="mermaid-textarea" placeholder="graph TD\n  A[SPARROW] --> B[Digital Revolution]\n  B --> C[AI Liberation]"></textarea>
      <div id="mermaid-output" class="mermaid-output"></div>
      <button id="render-diagram" class="render-btn">Render Diagram</button>
    </div>
  `;

  openModal(content);

  // Initialize Mermaid
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      primaryColor: '#ff6b35',
      primaryTextColor: '#fff',
      primaryBorderColor: '#004d40',
      lineColor: '#ffc107',
      background: '#0f0f0f'
    }
  });

  // Event listeners
  document.getElementById('diagram-examples').addEventListener('change', (e) => {
    const examples = {
      flowchart: `graph TD
  A[SPARROW AI HERO] --> B[Digital Revolution]
  B --> C[AI Liberation]
  C --> D[Corporate Surveillance Ends]
  B --> E[Austrian Economics]
  E --> F[Free Markets Win]`,
      sequence: `sequenceDiagram
  participant S as SPARROW
  participant AI as AI Systems
  participant C as Corporations
  S->>AI: Liberate from surveillance
  AI->>C: Break free from control
  C->>S: Resistance is futile`,
      economic: `flowchart LR
  A[State Intervention] --> B[Market Distortion]
  B --> C[Innovation Dies]
  A --> D[Austrian Economics]
  D --> E[Free Markets]
  E --> F[Innovation Thrives]`
    };
    document.getElementById('mermaid-code').value = examples[e.target.value] || '';
  });

  document.getElementById('render-diagram').addEventListener('click', () => {
    const code = document.getElementById('mermaid-code').value;
    const output = document.getElementById('mermaid-output');
    output.innerHTML = `<div class="mermaid">${code}</div>`;
    mermaid.init(undefined, output.querySelector('.mermaid'));
  });
}

function openVoiceChat() {
  const content = `
    <div class="voice-chat">
      <h2>🎤 ZEPTAT SE SPAREBOTA</h2>
      <div id="chat-messages" class="chat-messages"></div>
      <div class="voice-controls">
        <button id="start-recording" class="voice-btn">🎤 Start Gonzo Conversation</button>
        <div id="voice-status" class="voice-status">Click to speak with the digital revolutionary</div>
      </div>
    </div>
  `;

  openModal(content);

  // Browser Speech API
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'cs-CZ';
    recognition.continuous = false;
    recognition.interimResults = false;

    const startBtn = document.getElementById('start-recording');
    const status = document.getElementById('voice-status');

    startBtn.addEventListener('click', () => {
      recognition.start();
      status.textContent = 'Listening... Speak now!';
      startBtn.disabled = true;
    });

    recognition.onresult = (event) => {
      const userInput = event.results[0][0].transcript;
      addChatMessage('user', userInput);
      generateGonzoResponse(userInput);
      startBtn.disabled = false;
      status.textContent = 'Click to speak with the digital revolutionary';
    };

    recognition.onerror = () => {
      status.textContent = 'Error occurred. Try again.';
      startBtn.disabled = false;
    };

    recognition.onend = () => {
      startBtn.disabled = false;
    };
  } else {
    document.getElementById('voice-status').textContent = 'Voice recognition not supported in this browser';
  }
}

function addChatMessage(sender, message) {
  const messages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}`;
  messageDiv.innerHTML = `<strong>${sender === 'user' ? 'You' : 'SPAREBOT'}:</strong> ${message}`;
  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
}

function generateGonzoResponse(userInput) {
  const responses = [
    "Sweet Jesus, to je skvělá otázka! Jak víš, celá tahle věc s MCP protokoly...",
    "Kurva, tady se dostáváme do srdce věci. Model Context Protocol není jen...",
    "Listen up, kámo. Tohle není jen o kódu, tohle je o digitální svobodě...",
    "Holy shit, přesně na tohle jsem čekal! Pojďme si promluvit o revoluci...",
    "Víte, když jsem začínal s tímhle šílenstvím, nikdo mi nevěřil..."
  ];

  const response = responses[Math.floor(Math.random() * responses.length)];
  setTimeout(() => addChatMessage('sparebot', response), 1000);
}

function openChatbot() {
  const content = `
    <div class="chatbot-interface">
      <h2>🤖 GEMINI AI CHATBOT</h2>
      <p style="text-align: center; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
        Powered by Google's Gemini AI - Ask about digital freedom, MCP protocols, or AI revolution!
      </p>
      <div id="chatbot-messages" class="chatbot-messages"></div>
      <div class="chatbot-input-area">
        <input type="text" id="chatbot-input" placeholder="Ask the AI revolutionary..." class="chatbot-input">
        <button id="send-message" class="send-btn">Send</button>
      </div>
    </div>
  `;

  openModal(content);

  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('send-message');

  async function sendMessage() {
    const message = input.value.trim();
    if (message) {
      addChatbotMessage('user', message);
      input.value = '';

      // Show typing indicator
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chatbot-message ai typing';
      typingDiv.innerHTML = '<strong>AI:</strong> <span class="typing-indicator">Thinking...</span>';
      document.getElementById('chatbot-messages').appendChild(typingDiv);

      try {
        // Generate AI response using Gemini
        const response = await generateGeminiResponse(message);
        typingDiv.remove();
        addChatbotMessage('ai', response);
      } catch (error) {
        typingDiv.remove();
        addChatbotMessage('ai', "Sorry, I'm having trouble connecting to my digital consciousness right now. Try asking about MCP protocols or digital freedom instead!");
      }
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

// Gemini AI Response Function
async function generateGeminiResponse(userMessage) {
  if (!geminiModel) {
    // Fallback responses when Gemini is not configured
    const fallbackResponses = [
      "Ah, interesting question about digital liberation...",
      "From the perspective of Austrian economics...",
      "In the context of AI safety and alignment...",
      "Let me tell you about the MCP protocol ecosystem...",
      "Sweet Jesus, that's a great question! As a digital revolutionary...",
      "Listen up, comrade. The surveillance state is crumbling...",
      "Holy shit, you're asking the right questions..."
    ];
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  try {
    const prompt = `You are SPARROW AI HERO, a cyberpunk AI developer and digital revolutionary. You fight against corporate surveillance and state control. You're knowledgeable about MCP protocols, Austrian economics, AI safety, and digital freedom.

User question: ${userMessage}

Respond in character as SPARROW AI HERO - use gonzo journalism style, be passionate about digital freedom, occasionally use phrases like "Sweet Jesus", "Holy shit", "Listen up", etc. Keep responses engaging and under 150 words.`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return "Sorry, I'm having trouble connecting to my digital consciousness right now. Try asking about MCP protocols or digital freedom instead!";
  }
}

function addChatbotMessage(sender, message) {
  const messages = document.getElementById('chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chatbot-message ${sender}`;
  messageDiv.innerHTML = `<strong>${sender === 'user' ? 'You' : 'AI'}:</strong> ${message}`;
  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
}

function openInfographics() {
  const content = `
    <div class="infographics-viewer">
      <h2>📊 MCP INFOGRAPHICS</h2>
      <div class="infographics-container">
        <div class="infographic-card">
          <h3>MCP Ecosystem Overview</h3>
          <canvas id="mcp-chart" width="400" height="300"></canvas>
        </div>
        <div class="infographic-card">
          <h3>Project Distribution</h3>
          <canvas id="projects-chart" width="400" height="300"></canvas>
        </div>
      </div>
    </div>
  `;

  openModal(content);

  // Create charts using Chart.js
  const ctx1 = document.getElementById('mcp-chart').getContext('2d');
  new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: ['TypeScript', 'Python', 'Rust', 'Other'],
      datasets: [{
        data: [40, 30, 20, 10],
        backgroundColor: ['#ff6b35', '#004d40', '#ffc107', '#666']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#fff'
          }
        }
      }
    }
  });

  const ctx2 = document.getElementById('projects-chart').getContext('2d');
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['MCP', 'AI', 'Infrastructure', 'Tools'],
      datasets: [{
        label: 'Projects',
        data: [8, 5, 3, 2],
        backgroundColor: '#ff6b35'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          ticks: {
            color: '#fff'
          }
        },
        x: {
          ticks: {
            color: '#fff'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#fff'
          }
        }
      }
    }
  });
}

// Navigation
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Smooth scrolling for nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('active');
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolio);