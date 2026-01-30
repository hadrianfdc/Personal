(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    typingDelay: { min: 800, max: 1500 },
    responseDelay: { min: 400, max: 800 },
    autoGreetDelay: 1000
  };

  // Intent Recognition & Response System
  const INTENTS = {
    about: {
      keywords: ['who is hadrian', 'tell me about hadrian', 'about hadrian', 'who are you', 'introduce hadrian', 'whos hadrian', 'hadrian info', 'describe hadrian', 'about yourself', 'tell me about yourself', 'tell me about him', 'about him', 'more about him', 'info about him'],
      responses: [
        "Hadrian Evarula is a backend-focused full-stack developer from Cebu City, Philippines, specializing in enterprise system architecture and automated deployment pipelines.\n\nKey highlights:\n• 🎓 Computer Technology degree (2021-2023)\n• 💼 Backend/Fullstack Developer (2024-Present)\n• 🚀 Expert in ASP.NET Core, Laravel, CakePHP\n• 🔧 Strong DevOps & CI/CD experience\n• 📊 Enterprise database design specialist\n\nHadrian builds mission-critical applications with clean, maintainable code and scalable infrastructure!"
      ],
      quickActions: ['View skills', 'See experience', 'What services offered?']
    },
    
    greeting: {
        keywords: [
            'hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'morning', 'afternoon', 'evening',
            'sup', 'yo', 'howdy', 'hiya', 'hiya there', 'yo yo', 'what’s up', 'what’s good',
            'kamusta', 'kamusta ka', 'kumusta', 'kumusta ka', 'hiya bro', 'hiya sis', 'hello po', 
            'musta', 'hey there', 'gud morn', 'gud aft', 'gud eve', 'ay', 'hi po', 'oy', 'hi hi'
        ],

       responses: [
            "Hello! I'm here to help you learn more about Hadrian's background and expertise. What would you like to know?",
            "Hi there! Feel free to ask me about Hadrian's skills, experience, or services.",
            "Hey! I'd be happy to tell you about Hadrian's work in backend development and system architecture.",
            "Greetings! You can ask me anything about Hadrian’s professional journey, projects, or technical skills.",
            "Hi! Curious about Hadrian's experience or the technologies he works with? Just ask!",
            "Hello! I can provide details on Hadrian’s web development projects, coding experience, and services.",
            "Hey there! Interested in Hadrian's programming background or work history? I'm here to help.",
            "Hi! I can walk you through Hadrian’s expertise in backend development and .NET software engineering.",
            "Hello! Feel free to inquire about Hadrian’s professional skills, years of experience, and services offered.",
            "Hey! Want to know more about Hadrian’s projects, technical stack, or professional achievements? Just ask!"
        ],
        quickActions: ['Who is Hadrian?', 'What services offered?', 'Show experience']
    },
    
    skills: {
      keywords: ['skill', 'technology', 'tech stack', 'programming', 'languages', 'framework', 'what can', 'proficient', 'expertise', 'technologies', 'tools', 'know', 'capabilities', 'technical skills', 'good at'],
      responses: [
        "Hadrian specializes in backend development with strong expertise in:\n\n• ASP.NET Core, ASP.NET MVC, C#\n• PHP frameworks (Laravel, CakePHP)\n• Database systems (SQL Server, MySQL, MongoDB)\n• RESTful API design and implementation\n• CI/CD pipelines with GitHub Actions\n• Clean architecture and RBAC implementation\n\nWould you like to know more about any specific technology?"
      ],
      quickActions: ['Backend expertise', 'Database skills', 'DevOps experience']
    },

    experience: {
      keywords: ['experience', 'work', 'job', 'career', 'professional', 'background', 'history', 'worked', 'employment', 'previous work', 'work history', 'jobs', 'positions'],
      responses: [
        "Hadrian has professional experience as:\n\n• Backend/Fullstack Developer (2024 - Present): Building enterprise-level applications with CakePHP, implementing production-ready APIs, and maintaining CI/CD pipelines.\n\n• Software Engineer (2023): Sole developer of an enterprise Asset Management System using ASP.NET MVC and SQL Server, achieving 90% reduction in manual QA time through CI/CD automation.\n\nKey achievements include RBAC implementation, normalized database design, and collaboration with AI engineers on automated testing."
      ],
      quickActions: ['View resume', 'See services', 'Contact info']
    },

    services: {
      keywords: ['service', 'offer', 'provide', 'help with', 'consulting', 'hire', 'freelance', 'work with', 'can you do', 'what do you offer', 'available for', 'do you provide'],
      responses: [
        "Hadrian offers premium enterprise services:\n\n• Enterprise Backend Solutions\n• REST API Architecture\n• Data Architecture & Performance Engineering\n• DevOps & CI/CD Pipeline Setup\n• Legacy System Modernization\n• Strategic Technology Advisory\n\nAll services focus on scalability, maintainability, and long-term business value."
      ],
      quickActions: ['Backend solutions', 'API development', 'Contact Hadrian']
    },

    projects: {
      keywords: ['project', 'portfolio', 'built', 'created', 'developed', 'examples', 'work samples', 'past projects', 'what have you built', 'show me projects', 'previous projects'],
      responses: [
        "Notable projects include:\n\n• Enterprise Asset Management System - Built from scratch using ASP.NET MVC, C#, and SQL Server with complete RBAC implementation\n\n• CI/CD Automation Pipeline - Reduced QA time by 90% through automated testing across multiple modules\n\n• Production RESTful APIs - Designed and implemented for enterprise integrations\n\nFor detailed information, check the Resume section!"
      ],
      quickActions: ['View resume', 'Technical expertise', 'Services offered']
    },

    backend: {
      keywords: ['backend', 'server-side', 'api', 'database', 'asp.net', 'laravel', 'cakephp', 'rest', 'sql', 'server side', 'back-end', 'backend development'],
      responses: [
        "Backend development is Hadrian's core strength:\n\n• Building scalable, maintainable systems\n• Clean architecture and MVC patterns\n• Enterprise system design from database to deployment\n• Performance optimization and query tuning\n• Secure authentication and authorization (RBAC)\n\nExperience with ASP.NET Core, Laravel, CakePHP, and various database systems."
      ],
      quickActions: ['See all skills', 'View experience', 'API expertise']
    },

    cicd: {
      keywords: ['ci/cd', 'devops', 'automation', 'pipeline', 'github actions', 'deployment', 'testing', 'continuous integration', 'continuous deployment', 'automated testing'],
      responses: [
        "Hadrian has hands-on experience with:\n\n• Building automated CI/CD pipelines using GitHub Actions\n• Implementing comprehensive automated testing frameworks\n• Multi-module testing automation\n• Achieved 90% reduction in manual QA time\n• Streamlined deployment processes\n\nFocus on reducing risk while accelerating delivery."
      ],
      quickActions: ['Backend expertise', 'View services', 'See experience']
    },

    contact: {
      keywords: ['contact', 'reach', 'email', 'phone', 'message', 'hire', 'available', 'get in touch', 'how to contact', 'reach out', 'talk to', 'speak with', 'connect with'],
      responses: [
        "You can reach Hadrian at:\n\n📧 Email: hadrianevarula@gmail.com\n📱 Phone: +63 994 325 4337\n📍 Location: Cebu City, Philippines\n\nYou can also scroll to the Contact section below to send a message directly!"
      ],
      quickActions: ['Go to contact form', 'View LinkedIn', 'Download resume']
    },

    resume: {
      keywords: ['resume', 'cv', 'download', 'pdf', 'curriculum', 'download resume', 'get resume', 'see resume'],
      responses: [
        "You can download Hadrian's full resume by scrolling to the Resume section and clicking the 'Download Resume' button, or check out the detailed experience and skills sections on this page!"
      ],
      quickActions: ['View experience', 'See skills', 'Services offered']
    },

    location: {
      keywords: ['location', 'where', 'based', 'from', 'live', 'philippines', 'cebu', 'where is hadrian', 'where from', 'city'],
      responses: [
        "Hadrian is based in Cebu City, Philippines, and is available for remote collaboration with teams worldwide."
      ],
      quickActions: ['Contact info', 'Services offered', 'View experience']
    },

    education: {
      keywords: ['education', 'degree', 'university', 'college', 'school', 'studied', 'graduate', 'academic'],
      responses: [
        "Hadrian's educational background:\n\n🎓 Certificate in Computer Technology (2021-2023)\nUniversity of San Carlos - Talamban Campus\nSoftware Engineering focus\n\n🎓 STEM (Science, Technology, Engineering, Mathematics)\nArgao National High School (2018-2020)\n\nStrong foundation in software engineering principles and practices!"
      ],
      quickActions: ['View skills', 'See experience', 'Technical expertise']
    },

    age: {
      keywords: ['age', 'how old', 'old are you', 'years old', 'birthday', 'born'],
      responses: [
        "Hadrian is 23 years old (born March 28, 2002) and brings youthful energy combined with professional expertise in backend development!"
      ],
      quickActions: ['About Hadrian', 'View experience', 'See skills']
    },

    experience_years: {
      keywords: ['total years', 'how many years', 'years of experience', 'experience years', 'work experience years', 'professional experience years', 'length of experience'],
      responses: [
        "Total Experience: 3 years\n\nBackend Development: 2 years\n• Designing and building REST APIs\n• Database management (SQL Server, MySQL)\n• Server-side logic and performance optimization\n\nSoftware Engineer (.NET): 1 year\n• Developing desktop and web applications using .NET framework\n• Implementing business logic and integrations\n• Unit testing and debugging"
      ],
      quickActions: ['View detailed experience', 'See skills', 'What services offered?']
    },

    thanks: {
      keywords: ['thank', 'thanks', 'appreciate', 'helpful', 'great', 'awesome', 'perfect'],
      responses: [
            "You're welcome! Is there anything else you'd like to know about Hadrian's background or services?",
            "Happy to help! Feel free to ask if you have more questions.",
            "My pleasure! Let me know if you need any other information.",
            "Glad I could help! Do you want to know more about Hadrian's skills or projects?",
            "Anytime! If you have more questions about Hadrian’s experience, just ask.",
            "You're welcome! Would you like to hear more about Hadrian’s work or services?",
            "No problem! I’m here to answer anything else you want to know about Hadrian.",
            "Happy to assist! Curious about Hadrian’s professional journey or technical expertise?",
            "It’s my pleasure! Feel free to ask about Hadrian’s projects, skills, or experience.",
            "You got it! Let me know if you want more details on Hadrian's work or background."
      ],

      quickActions: ['View resume', 'Contact Hadrian', 'See services']
    }
  };

  // State Management
  const state = {
    isOpen: false,
    hasGreeted: false,
    conversationHistory: [],
    isTyping: false
  };

  // DOM Elements
  const elements = {
    toggle: document.getElementById('chatToggle'),
    window: document.getElementById('chatWindow'),
    close: document.getElementById('chatClose'),
    messages: document.getElementById('chatMessages'),
    input: document.getElementById('chatInput'),
    send: document.getElementById('chatSend'),
    badge: document.getElementById('chatBadge')
  };

  // Utility Functions
  function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  function scrollToBottom() {
    setTimeout(() => {
      if (elements.messages) {
        elements.messages.scrollTop = elements.messages.scrollHeight;
      }
    }, 100);
  }

  // Intent Detection
  function detectIntent(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Check each intent's keywords
    for (const [intentName, intent] of Object.entries(INTENTS)) {
      for (const keyword of intent.keywords) {
        if (lowerMessage.includes(keyword)) {
          return intent;
        }
      }
    }
    
    return null;
  }

  // Message Rendering
  function addMessage(content, sender = 'assistant', showQuickActions = false) {
    if (!elements.messages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = content;
    
    messageDiv.appendChild(bubbleDiv);
    elements.messages.appendChild(messageDiv);
    
    if (showQuickActions && sender === 'assistant') {
      addQuickActions(showQuickActions);
    }
    
    scrollToBottom();
  }

  function addQuickActions(actions) {
    if (!elements.messages) return;
    
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'chat-message assistant';
    
    const quickActionsContainer = document.createElement('div');
    quickActionsContainer.className = 'quick-actions';
    
    actions.forEach(action => {
      const btn = document.createElement('button');
      btn.className = 'quick-action-btn';
      btn.textContent = action;
      btn.onclick = () => handleQuickAction(action);
      quickActionsContainer.appendChild(btn);
    });
    
    actionsDiv.appendChild(quickActionsContainer);
    elements.messages.appendChild(actionsDiv);
    scrollToBottom();
  }

  function showTypingIndicator() {
    if (!elements.messages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message assistant';
    typingDiv.id = 'typing-indicator';
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble typing-indicator';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'typing-dot';
      bubbleDiv.appendChild(dot);
    }
    
    typingDiv.appendChild(bubbleDiv);
    elements.messages.appendChild(typingDiv);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  // Response Generation
  async function generateResponse(userMessage) {
    state.isTyping = true;
    if (elements.send) {
      elements.send.disabled = true;
    }
    
    showTypingIndicator();
    
    // Simulate thinking time
    await new Promise(resolve => 
      setTimeout(resolve, randomDelay(CONFIG.typingDelay.min, CONFIG.typingDelay.max))
    );
    
    removeTypingIndicator();
    
    const intent = detectIntent(userMessage);
    
    if (intent) {
      const response = getRandomResponse(intent.responses);
      addMessage(response, 'assistant', intent.quickActions);
    } else {
      // Fallback responses
      const fallbacks = [
        "I'm not sure I understand. You can ask me about Hadrian's skills, experience, services, or how to get in touch!",
        "That's an interesting question! Try asking me about backend development, technical expertise, or available services.",
        "I'd love to help! You can ask about programming skills, work experience, contact information, or even just 'Who is Hadrian?'"
      ];
      const fallbackActions = ['Who is Hadrian?', 'Show experience', 'Contact info'];
      addMessage(getRandomResponse(fallbacks), 'assistant', fallbackActions);
    }
    
    state.isTyping = false;
    if (elements.send) {
      elements.send.disabled = false;
    }
  }

  // Quick Action Handler
  function handleQuickAction(action) {
    addMessage(action, 'user');
    generateResponse(action);
  }

  // User Input Handler
  async function handleUserMessage() {
    if (!elements.input) return;
    
    const message = elements.input.value.trim();
    
    if (!message || state.isTyping) return;
    
    addMessage(message, 'user');
    elements.input.value = '';
    
    state.conversationHistory.push({ role: 'user', content: message });
    
    await generateResponse(message);
  }

  // Initial Greeting
  function showInitialGreeting() {
    if (state.hasGreeted) return;
    
    setTimeout(() => {
      const greeting = "👋 Hi! I'm here to help you learn about Hadrian's expertise in backend development, enterprise system architecture, and available services. What would you like to know?";
      const actions = ['Who is Hadrian?', 'What services offered?', 'Show skills'];
      
      addMessage(greeting, 'assistant', actions);
      state.hasGreeted = true;
      
      // Show notification badge
      if (!state.isOpen && elements.badge) {
        elements.badge.style.display = 'flex';
      }
    }, CONFIG.autoGreetDelay);
  }

  // Initialize Event Listeners
  function initEventListeners() {
    if (!elements.toggle || !elements.window || !elements.close || !elements.send || !elements.input) {
      console.warn('Chat assistant: Some elements not found');
      return;
    }

    // Toggle chat window
    elements.toggle.addEventListener('click', () => {
      state.isOpen = !state.isOpen;
      elements.window.classList.toggle('active');
      elements.toggle.classList.toggle('active');
      if (elements.badge) {
        elements.badge.style.display = 'none';
      }
      
      if (state.isOpen) {
        elements.input.focus();
        if (!state.hasGreeted) {
          showInitialGreeting();
        }
      }
    });

    // Close chat window
    elements.close.addEventListener('click', () => {
      state.isOpen = false;
      elements.window.classList.remove('active');
      elements.toggle.classList.remove('active');
    });

    // Send message button
    elements.send.addEventListener('click', handleUserMessage);

    // Enter key to send message
    elements.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleUserMessage();
      }
    });
  }

  // Initialize
  function init() {
    initEventListeners();
    showInitialGreeting();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
