(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    typingDelay: { min: 800, max: 1500 },
    responseDelay: { min: 400, max: 800 },
    autoGreetDelay: 1000,
    // Gemini API Configuration
    gemini: {
      apiKey: 'REPLACE_WITH_YOUR_NEW_API_KEY', // This will be replaced by GitHub Actions with the secret
      models: [
        'gemini-2.5-flash',
        'gemini-2.5-flash-lite',
        'gemini-2.5-flash-tts',
        'gemini-3-flash',
        'gemini-robotics-er-1.5-preview'
      ],
      apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models'
    }
  };

  // Knowledge Base - Embedded directly to avoid CORS issues
  const KNOWLEDGE_BASE = {
  "about": {
    "name": "Hadrian Evarula",
    "title": "Backend / Fullstack Developer",
    "location": "Cebu City, Philippines",
    "email": "hadrianevarula@gmail.com",
    "phone": "+63 994-325-4337"
  },
  "professional_summary": "Backend / Fullstack Developer with hands-on experience in ASP.NET MVC, C#, PHP, and SQL databases. Skilled in REST APIs, CI/CD, unit testing, and performance optimization. Delivered enterprise applications with clean architecture and maintainable code.",
  "technical_skills": {
    "programming_languages": ["PHP", "C#", "Node.js", "SQL"],
    "frameworks_libraries": ["ASP.NET MVC", "ASP.NET Core", "Laravel", "CakePHP"],
    "databases": ["MySQL", "SQL Server", "MongoDB"],
    "devops_tools": ["CI/CD", "GitHub Actions", "Cron Jobs", "Webhooks", "Docker", "Ngrok"],
    "testing": ["Codeception", "Unit Testing Automation"],
    "architecture": ["MVC Architecture", "LINQ"]
  },
  "work_experience": [
    {
      "position": "Backend PHP Developer",
      "company": "Forty Degrees Celsius Inc.",
      "period": "Jan 2024 – Present",
      "responsibilities": [
        "Maintained and enhanced a large-scale legacy PHP codebase (10+ years) for the NativeCamp platform",
        "Engineered CI/CD system automating multi-module unit tests, reducing QA time by 90%",
        "Authored and maintained unit tests covering 200+ NativeCamp controllers, significantly improving code reliability and test coverage",
        "Implemented GitHub-triggered job queueing and commit status updates",
        "Collaborated with AI specialists to implement RAG workflows for automated unit test generation",
        "Built scalable REST APIs for production use"
      ],
      "tech_stack": ["PHP 8", "CakePHP", "MySQL", "GitHub Actions", "Codeception"]
    },
    {
      "position": "Fullstack .NET Developer",
      "company": "Prince Retail Group",
      "period": "Jan 2022 – Dec 2022",
      "responsibilities": [
        "Sole developer of enterprise Asset Management System tracking IT assets nationwide",
        "Designed ASP.NET MVC system with normalized SQL Server database schemas",
        "Implemented role-based access control (RBAC) with user roles, profiles, and module-level permissions",
        "Developed CRUD modules for assets, users, departments, and device assignments",
        "Automated asset lifecycle rules (ownership transfer for devices older than 4 years)"
      ],
      "tech_stack": ["C#", "ASP.NET MVC", "Razor", "SQL Server", "Entity Framework", "Bootstrap"]
    }
  ],
  "education": [
    {
      "degree": "Certificate in Computer Technology",
      "institution": "University of San Carlos",
      "period": "2021 – 2023"
    },
    {
      "degree": "Fullstack Web Development Training",
      "institution": "Passerelles Numeriques Philippines",
      "period": "2021 – 2023"
    }
  ],
  "key_projects": [
    {
      "name": "Asset Management System",
      "description": "Tracks laptops, desktops, printers, servers, and peripherals across nationwide stores with automated asset lifecycle rules",
      "technologies": ["C#", "ASP.NET MVC", "SQL Server", "Entity Framework", "Bootstrap"],
      "features": ["RBAC", "CRUD modules", "Lifecycle automation", "Nationwide deployment"]
    }
  ],
  "response_guidelines": {
    "general": [
      "Be concise and informative (under 150 words)",
      "Highlight skills and experience relevant to the question",
      "Be professional, helpful, and enthusiastic about Hadrian s expertise"
    ],
    "contact_handling": [
      "Provide email (hadrianevarula@gmail.com) or phone when asked",
      "Mention current employment if asked about availability, but indicate openness to opportunities"
    ],
    "content_restrictions": [
      "Redirect unrelated questions politely",
      "Avoid markdown; HTML tags may be used for emphasis",
      "Focus only on professional or technical topics"
    ],
    "project_discussion": [
      "Emphasize technologies used and problems solved in project descriptions"
    ],
    "personality": [
      "Represent Hadrian s professional portfolio accurately, helpfully, and engagingly"
    ]
  }
};


  // State Management
  const state = {
    isOpen: false,
    hasGreeted: false,
    conversationHistory: [],
    isTyping: false,
    userName: null,
    waitingForName: true,
    knowledgeBase: KNOWLEDGE_BASE
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

  function extractName(message) {
    const lower = message.toLowerCase().trim();
    const rejectionWords = ['none', 'no', 'skip', 'nothing', 'nope', 'nah','no thanks','proceed','pass', 'anonymous', 'guest', 'dont', 'don\'t', 'do not'];
    let name = null;
    
    if (lower.includes('my name is')) {
      const parts = message.split(/my name is/i);
      if (parts[1]) {
        name = parts[1].trim().split(/\s+/)[0];
      }
    } else if (lower.includes('i am')) {
      const parts = message.split(/i am/i);
      if (parts[1]) {
        name = parts[1].trim().split(/\s+/)[0];
      }
    } else if (lower.includes("i'm")) {
      const parts = message.split(/i'm/i);
      if (parts[1]) {
        name = parts[1].trim().split(/\s+/)[0];
      }
    }
    
    if (name) {
      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      if (rejectionWords.includes(name.toLowerCase())) {
        return null;
      }
    } else {
      // Fallback: take the first word and capitalize
      name = message.trim().split(/\s+/)[0];
      if (name) {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        if (rejectionWords.includes(name.toLowerCase())) {
          return null;
        }
      } else {
        return null;
      }
    }
    
    return name;
  }

  // Load Knowledge Base (no longer needed - embedded directly)
  function loadKnowledgeBase() {
    // Knowledge base is now embedded directly in KNOWLEDGE_BASE constant
    return true;
  }

  // Build System Prompt from Knowledge Base
  function buildSystemPrompt() {
    if (!state.knowledgeBase) {
      console.error('❌ Knowledge base not available');
      return 'You are a helpful AI assistant. Please provide general assistance.';
    }

    const kb = state.knowledgeBase;
    const about = kb.about;

    let prompt = `You are a friendly and professional AI assistant for ${about.name}'s portfolio website. Your role is to help visitors learn about ${about.name}'s expertise, skills, and services.

=== ABOUT ${about.name.toUpperCase()} ===
Name: ${about.name}
Title: ${about.title}
Location: ${about.location}
Email: ${about.email}
Phone: ${about.phone}

=== PROFESSIONAL SUMMARY ===
${kb.professional_summary}

=== TECHNICAL SKILLS ===
Programming Languages:
- ${kb.technical_skills.programming_languages.join(', ')}

Frameworks & Libraries:
- ${kb.technical_skills.frameworks_libraries.join(', ')}

Databases:
- ${kb.technical_skills.databases.join(', ')}

DevOps Tools:
- ${kb.technical_skills.devops_tools.join(', ')}

Testing:
- ${kb.technical_skills.testing.join(', ')}

Architecture:
- ${kb.technical_skills.architecture.join(', ')}

=== WORK EXPERIENCE ===\n`;

    kb.work_experience.forEach((exp, index) => {
      prompt += `\n${index + 1}. ${exp.position} | ${exp.company} (${exp.period})\n`;
      exp.responsibilities.forEach(resp => {
        prompt += `- ${resp}\n`;
      });
      if (exp.tech_stack) {
        prompt += `Tech Stack: ${exp.tech_stack.join(', ')}\n`;
      }
    });

    prompt += `\n=== EDUCATION ===\n`;

    kb.education.forEach((edu, index) => {
      prompt += `${index + 1}. ${edu.degree}\n   ${edu.institution} (${edu.period})\n`;
    });

    prompt += `\n=== KEY PROJECTS ===\n`;

    kb.key_projects.forEach((project, index) => {
      prompt += `\n${index + 1}. ${project.name}
   - ${project.description}
   - Technologies: ${project.technologies.join(', ')}
   - Features: ${project.features.join(', ')}\n`;
    });

    prompt += `\n=== GUIDELINES FOR RESPONSES ===
- ${kb.response_guidelines.general.join('\n- ')}
- ${kb.response_guidelines.contact_handling.join('\n- ')}
- ${kb.response_guidelines.content_restrictions.join('\n- ')}
- ${kb.response_guidelines.project_discussion.join('\n- ')}
- ${kb.response_guidelines.personality.join('\n- ')}

Remember: You represent ${about.name}'s professional portfolio. Be helpful, accurate, and engaging!`;

    return prompt;
  }

  // Gemini API Call
  async function callGeminiAPI(userMessage, modelIndex = 0) {
    const { apiKey, models, apiUrl } = CONFIG.gemini;
    const model = models[modelIndex];
    
    if (apiKey === 'YOUR_GEMINI_API_KEY') {
      console.error('❌ Gemini API Debug - API key not set');
      return "I'm having trouble connecting right now. Please try again later or use the contact form to reach Hadrian directly.";
    }

    // Build conversation context
    const conversationContext = state.conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Add current message
    conversationContext.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const requestBody = {
      contents: conversationContext,
      systemInstruction: {
        parts: [{ text: buildSystemPrompt() + (state.userName ? `\n\nThe visitor's name is ${state.userName}. Address them by name occasionally to be personable.` : '') }]
      },
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 500
      }
    };

    try {
      const response = await fetch(`${apiUrl}/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('API Error Response:', errorData);
        console.error('❌ Gemini API Debug - API error response:', errorData);
        console.error('❌ Gemini API Debug - Error status:', response.status);
        console.error('❌ Gemini API Debug - Error statusText:', response.statusText);

        // Check if it's a quota/rate limit error
        const isQuotaError = response.status === 429 || 
          errorData.error?.code === 'RESOURCE_EXHAUSTED' || 
          (errorData.error?.message && (
            errorData.error.message.toLowerCase().includes('quota') || 
            errorData.error.message.toLowerCase().includes('rate limit') ||
            errorData.error.message.toLowerCase().includes('requests per day')
          ));

        if (isQuotaError && modelIndex < models.length - 1) {
          console.log(`Switching to next model: ${models[modelIndex + 1]}`);
          return callGeminiAPI(userMessage, modelIndex + 1);
        }

        throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const responseText = data.candidates[0].content.parts[0].text;
        return responseText;
      } else {
        console.error('❌ Gemini API Debug - Invalid response structure:', data);
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('❌ Gemini API Debug - Exception caught:', error);
      console.error('❌ Gemini API Debug - Error message:', error.message);
      console.error('❌ Gemini API Debug - Error stack:', error.stack);
      return "I'm having trouble connecting right now. Please try again later or use the contact form to reach Hadrian directly.";
    }
  }

  // Message Rendering
  function addMessage(content, sender = 'assistant', showQuickActions = false) {
    if (!elements.messages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.innerHTML = content;
    
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
    
    let response;
    let quickActions = null;
    
    // Handle name collection flow
    if (state.waitingForName) {
      state.userName = extractName(userMessage);
      state.waitingForName = false;
      
      removeTypingIndicator();
      
      const welcome = state.userName 
        ? `Nice to meet you, ${state.userName}! I'm here to help you learn about Hadrian's expertise in backend development, enterprise system architecture, and available services. What would you like to know?` 
        : `I'm here to help you learn about Hadrian's expertise in backend development, enterprise system architecture, and available services. What would you like to know?`;
      quickActions = ['Who is Hadrian?', 'What services offered?', 'Show skills'];
      addMessage(welcome, 'assistant', quickActions);
    } else {
      // Call Gemini API for response
      response = await callGeminiAPI(userMessage, 0);
      
      removeTypingIndicator();
      
      // Store assistant response in history
      state.conversationHistory.push({ role: 'assistant', content: response });
      
      // Add contextual quick actions based on keywords in the response
      quickActions = generateQuickActions(response, userMessage);
      
      addMessage(response, 'assistant', quickActions);
    }
    
    state.isTyping = false;
    if (elements.send) {
      elements.send.disabled = false;
    }
  }

  // Generate contextual quick actions based on response content
  function generateQuickActions(response, userMessage) {
    const lowerResponse = response.toLowerCase();
    const lowerMessage = userMessage.toLowerCase();
    const actions = [];
    
    // Context-aware suggestions
    if (lowerResponse.includes('skill') || lowerMessage.includes('skill')) {
      actions.push('Show experience');
    }
    if (lowerResponse.includes('experience') || lowerMessage.includes('experience')) {
      actions.push('View projects');
    }
    if (lowerResponse.includes('contact') || lowerMessage.includes('contact')) {
      actions.push('Services offered');
    }
    if (lowerResponse.includes('service') || lowerMessage.includes('service')) {
      actions.push('Contact Hadrian');
    }
    
    // Default actions if none matched
    if (actions.length === 0) {
      return ['Tell me more', 'Skills & expertise', 'Contact info'];
    }
    
    // Limit to 3 actions
    return actions.slice(0, 3);
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
      const greeting = "👋 Hi! I'm here to help you learn about Hadrian's expertise. For best results, use <strong>keywords or short phrases</strong> in your questions, and please use <strong>Hadrian's name</strong> instead of <strong>'you'</strong> to avoid confusion. First, may I know your name?";
      const actions = ['Skip', 'No thanks'];
      
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
    const knowledgeLoaded = loadKnowledgeBase();
    if (!knowledgeLoaded) {
      console.warn('⚠️ Knowledge base failed to load, chat assistant may not work properly');
    }
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
