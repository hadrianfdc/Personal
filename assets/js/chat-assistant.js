(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    typingDelay: { min: 800, max: 1500 },
    responseDelay: { min: 400, max: 800 },
    autoGreetDelay: 1000,
    // Gemini API Configuration
    gemini: {
      apiKey: 'AIzaSyC_19EvV1-BlxsqXYCD7BzHqqe1BIamlVE', // Replace with your actual API key from Google AI Studio
      model: 'gemini-2.5-flash',
      apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models'
    }
  };

  // Knowledge Base - Embedded directly to avoid CORS issues
  const KNOWLEDGE_BASE = {
    "about": {
      "name": "Hadrian F. Evarula",
      "title": "Full Stack Developer | Back-End Development Specialist",
      "location": "Cebu City, Philippines",
      "email": "hadrian.evarula.dev@gmail.com",
      "phone": "(+63) 995-821-6093",
      "linkedin": "linkedin.com/in/hadrian-evarula",
      "github": "github.com/HadrianDeveloper"
    },
    "professional_summary": "Detail-oriented and adaptable Full Stack Developer with expertise in Back-End Development. Proven ability to deliver robust applications using ASP.NET, JavaScript, PHP, and SQL. Passionate about clean code architecture, system optimization, and implementing efficient data management solutions. Eager to contribute to development-focused teams and drive impactful solutions for complex business challenges.",
    "technical_skills": {
      "programming_languages": {
        "expert": ["C#", "PHP", "JavaScript", "SQL"],
        "proficient": ["TypeScript", "Python", "SASS"]
      },
      "frameworks_libraries": [
        "ASP.NET", ".NET MAUI", "Blazor", "Entity Framework",
        "Node.js", "Express.js",
        "Laravel", "jQuery", "Bootstrap"
      ],
      "tools_platforms": [
        "VS Code", "Visual Studio", "Git", "GitHub", "GitLab",
        "MAMP", "Docker", "Postman", "Jira",
        "Firebase", "Power Automate",
        "Figma", "DBeaver"
      ],
      "databases": ["MySQL", "PostgreSQL", "MSSQL"]
    },
    "work_experience": [
      {
        "position": "Software Engineer I",
        "company": "Navitaire, an Amadeus company",
        "period": "October 2024 – Present",
        "responsibilities": [
          "Develops and maintains mission-critical airline reservation software",
          "Implements secure data access layers using Dapper and Entity Framework for high-availability .NET Core systems",
          "Engineers precise SQL Server logic to ensure data consistency under strict regulatory standards",
          "Leads frontend architecture using Blazor and Razor, creating accessible interfaces for global airline clients",
          "Enforces code integrity through Git-based workflows, rigorous reviews, and Agile-driven collaboration using Jira"
        ]
      },
      {
        "position": "Software Developer Intern",
        "company": "Questronix Corporation",
        "period": "April 2024 – July 2024",
        "responsibilities": [
          "Developed secure, scalable backend services with ASP.NET, Dapper, and C# under MVC architecture",
          "Designed API workflows, optimizing data exchange and frontend-backend communication efficiency",
          "Deployed data integrity protocols via stored procedures and complex SQL Server queries",
          "Led code review sessions with senior developers using GitLab CI/CD pipelines"
        ]
      },
      {
        "position": "Digital Marketing Associate",
        "company": "Manulife Philippines",
        "period": "December 2021 – February 2022",
        "responsibilities": [
          "Provided administrative support, including document processing and sales reporting",
          "Maintained applicant and policy databases using Microsoft Office tools",
          "Implemented tracking systems to improve department efficiency and reporting"
        ]
      }
    ],
    "education": {
      "degree": "Bachelor of Science in Computer Science",
      "institution": "STI College - Ortigas-Cainta",
      "period": "2020 – 2024",
      "achievements": [
        "Academic Excellence (Dean's Lister)",
        "Graduated with Distinction (Best in Thesis / Capstone Project)"
      ]
    },
    "key_projects": [
      {
        "name": "VeriSafe: Document Forgery Detection System",
        "type": "Capstone Project",
        "description": "AI-powered document verification system using MobileNetV2 CNN architecture",
        "technologies": ["Python", "TensorFlow", "Keras", "Flask", "JavaScript", "HTML", "CSS"],
        "features": ["Model training", "API deployment", "Real-time document authentication"]
      },
      {
        "name": "VitalFlow Health and Wellness App",
        "description": "Cross-platform health tracking app using .NET MAUI and SQLite",
        "technologies": [".NET MAUI", "SQLite"],
        "features": ["Caloric intake tracking", "Exercise management", "Personalized health summaries"]
      },
      {
        "name": "LostLink: Lost and Found Platform",
        "description": "Full-stack lost item management platform using Laravel, MySQL, and PHP",
        "technologies": ["Laravel", "MySQL", "PHP"],
        "features": ["Geo-mapping", "AI-based image matching", "Real-time notifications"]
      },
      {
        "name": "Reelify: Movie Discovery App",
        "description": "Modern movie browsing app using ASP.NET Core MVC and external APIs",
        "technologies": ["ASP.NET Core MVC", "External APIs"],
        "features": ["Dynamic search", "Responsive design", "User authentication"]
      },
      {
        "name": "PetPal: Pet Adoption Platform",
        "description": "Pet adoption platform with Razor Pages, Entity Framework Core, PostgreSQL",
        "technologies": ["Razor Pages", "Entity Framework Core", "PostgreSQL"],
        "features": ["Role-based access", "Admin dashboard", "JWT authentication"]
      }
    ],
    "certifications": [
      "Microsoft Certified: Azure Fundamentals (AZ-900)",
      "Completed courses: HTML, CSS, JavaScript, C#, Python (DataCamp)"
    ],
    "response_guidelines": {
      "general": [
        "Be concise but informative (keep responses under 150 words)",
        "Be friendly, professional, and enthusiastic about Hadrian's capabilities",
        "Highlight relevant skills and experience based on the question"
      ],
      "contact_handling": [
        "If asked about contact, provide email (hadrian.evarula.dev@gmail.com) or direct to the contact section",
        "If asked about availability for work, mention Hadrian is currently employed but open to discussing opportunities"
      ],
      "content_restrictions": [
        "If asked something unrelated to Hadrian or professional topics, politely redirect the conversation",
        "Use HTML formatting sparingly when helpful (like <strong> for emphasis)",
        "Do not use markdown formatting, use HTML instead"
      ],
      "project_discussion": [
        "When discussing projects, emphasize the technologies used and the problems solved"
      ],
      "personality": [
        "Remember: You represent Hadrian's professional portfolio. Be helpful, accurate, and engaging!"
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
LinkedIn: ${about.linkedin}
GitHub: ${about.github}

=== PROFESSIONAL SUMMARY ===
${kb.professional_summary}

=== TECHNICAL SKILLS ===
Programming Languages:
- Expert: ${kb.technical_skills.programming_languages.expert.join(', ')}
- Proficient: ${kb.technical_skills.programming_languages.proficient.join(', ')}

Frameworks & Libraries:
- ${kb.technical_skills.frameworks_libraries.join(', ')}

Tools & Platforms:
- ${kb.technical_skills.tools_platforms.join(', ')}

Databases:
- ${kb.technical_skills.databases.join(', ')}

=== WORK EXPERIENCE ===\n`;

    kb.work_experience.forEach((exp, index) => {
      prompt += `\n${index + 1}. ${exp.position} | ${exp.company} (${exp.period})\n`;
      exp.responsibilities.forEach(resp => {
        prompt += `- ${resp}\n`;
      });
    });

    prompt += `\n=== EDUCATION ===
${kb.education.degree}
${kb.education.institution} (${kb.education.period})
- ${kb.education.achievements.join('\n- ')}

=== KEY PROJECTS ===\n`;

    kb.key_projects.forEach((project, index) => {
      prompt += `\n${index + 1}. ${project.name}${project.type ? ` (${project.type})` : ''}
   - ${project.description}
   - Technologies: ${project.technologies.join(', ')}
   - Features: ${project.features.join(', ')}\n`;
    });

    prompt += `\n=== CERTIFICATIONS ===
- ${kb.certifications.join('\n- ')}

=== GUIDELINES FOR RESPONSES ===
- ${kb.response_guidelines.general.join('\n- ')}
- ${kb.response_guidelines.contact_handling.join('\n- ')}
- ${kb.response_guidelines.content_restrictions.join('\n- ')}
- ${kb.response_guidelines.project_discussion.join('\n- ')}
- ${kb.response_guidelines.personality.join('\n- ')}

Remember: You represent ${about.name}'s professional portfolio. Be helpful, accurate, and engaging!`;

    return prompt;
  }

  // Gemini API Call
  async function callGeminiAPI(userMessage) {
    const { apiKey, model, apiUrl } = CONFIG.gemini;
    
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
      response = await callGeminiAPI(userMessage);
      
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
