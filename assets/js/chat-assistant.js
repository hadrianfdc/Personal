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
      keywords: ['who is hadrian', 'tell me about hadrian', 'about hadrian', 'introduce hadrian', 'whos hadrian', 'hadrian info', 'describe hadrian', 'tell me about him', 'about him', 'more about him', 'info about him'],
      responses: [
        "Hey! Hadrian's this awesome backend-focused full-stack developer from Cebu City, Philippines. He's all about enterprise system architecture and automated deployments. Here's the scoop:<br><br>✨ <strong>Quick facts:</strong><br>• 🎓 Got his Computer Technology degree in 2023<br>• 💼 Backend/Fullstack Developer since 2024<br>• 🚀 Expert in ASP.NET Core, Laravel, CakePHP<br>• 🔧 Loves DevOps and CI/CD<br>• 📊 Database design wizard<br><br>He builds rock-solid, scalable apps that businesses can rely on!"
      ],
      quickActions: ['View skills', 'See experience', 'What services offered?']
    },

    assistant: {
      keywords: ['who are you', 'what are you', 'tell me about you', 'about you', 'who created you', 'who made you', 'about yourself', 'tell me about yourself'],
      responses: [
            "I am an AI Assistant created by Hadrian to help visitors learn about his expertise in backend development, enterprise system architecture, and available services. I'm here to answer questions about Hadrian's background, skills, experience, and how to get in touch with him!",
            "Hello! I'm an AI Assistant designed by Hadrian to provide information about his work, projects, and professional skills. Ask me anything about Hadrian’s experience or services.",
            "I was created by Hadrian to assist you in learning more about his web development and software engineering experience. I can share details about his skills, projects, and services.",
            "I’m an AI Assistant built by Hadrian to answer questions about his professional journey, including backend development, .NET projects, and other services he offers.",
            "Hi! I’m here to give you insights into Hadrian’s background, technical expertise, and professional experience. Think of me as a guide to his work and services.",
            "I’m an AI Assistant developed by Hadrian to help you discover his skills, experience, and the services he provides. Ask me anything you want to know about his professional journey.",
            "Hello! I was created to help you explore Hadrian’s career, his projects, and the technologies he works with. I can provide details on his skills and services anytime you want.",
            "Hi there! I’m an AI Assistant built by Hadrian to guide you through his professional experience, backend development work, and software engineering projects.",
            "I’m here to help you learn about Hadrian’s expertise, from backend systems to .NET software engineering. Feel free to ask me any questions about his skills or services.",
            "Hey! I was designed by Hadrian to provide clear and helpful information about his professional background, development experience, and the services he offers.",
            "Greetings! I am an AI Assistant created to answer questions about Hadrian’s work, technical skills, and experience. Let me guide you through his professional journey.",
            "Hello! I’m here to provide insights into Hadrian’s projects, professional achievements, and the technologies he uses. Ask me anything about his skills or services."
        ],
      quickActions: ['Who is Hadrian?', 'What services offered?', 'Contact Hadrian']
    },
    
    greeting: {
        keywords: [
            'hi', 'hello', 'greetings', 'good morning', 'good afternoon', 'good evening', 'morning', 'afternoon', 'evening',
            'sup', 'yo', 'howdy', 'hiya', 'hiya there', 'yo yo', 'what’s up', 'what’s good',
            'kamusta', 'kamusta ka', 'kumusta', 'kumusta ka', 'hiya bro', 'hiya sis', 'hello po', 
            'musta', 'hey there', 'gud morn', 'gud aft', 'gud eve', 'ay', 'hi po', 'oy', 'hi hi'
        ],

       responses: [
            "Hey there! I'm here to chat about Hadrian's background and skills. What's on your mind?",
            "Hi! Feel free to ask me anything about Hadrian's experience, tech stack, or services.",
            "Hey! I'd love to tell you about Hadrian's work in backend development and system architecture.",
            "Greetings! Shoot me any questions about Hadrian's professional journey, projects, or skills.",
            "Hi! Curious about Hadrian's experience or the tools he uses? Just ask away!",
            "Hello! I can fill you in on Hadrian's web development projects, coding background, and services.",
            "Hey there! Want to know about Hadrian's programming skills or work history? I'm all ears.",
            "Hi! Let me walk you through Hadrian's expertise in backend development and .NET engineering.",
            "Hello! Feel free to ask about Hadrian's skills, years of experience, or what he offers.",
            "Hey! Want the scoop on Hadrian's projects, technical stack, or achievements? Fire away!"
        ],
        quickActions: ['Who is Hadrian?', 'What services offered?', 'Show experience']
    },
    
    skills: {
      keywords: ['skill', 'technology', 'tech stack', 'programming', 'languages', 'framework', 'what can', 'proficient', 'expertise', 'technologies', 'tools', 'know', 'capabilities', 'technical skills', 'good at'],
      responses: [
        "Oh man, Hadrian's got some serious backend chops! He's killer with:<br><br>🛠️ <strong>His tech toolkit:</strong><br>• ASP.NET Core, ASP.NET MVC, C#<br>• PHP frameworks like Laravel and CakePHP<br>• Databases: SQL Server, MySQL, MongoDB<br>• REST API design and building<br>• CI/CD pipelines using GitHub Actions<br>• Clean architecture and RBAC systems<br><br>Want me to dive deeper into any of these?",
        "Hadrian's tech stack is rock solid! His top proficiencies include:<br><br>💻 <strong>Backend Technologies:</strong><br>• C# and ASP.NET ecosystem<br>• PHP with Laravel and CakePHP<br>• Database management (SQL Server, MySQL, MongoDB)<br>• API development and RESTful services<br>• DevOps and CI/CD automation<br><br>He's got enterprise-level experience across the board!",
        "When it comes to tech, Hadrian's a pro! Here's what he's most proficient in:<br><br>🚀 <strong>Core Skills:</strong><br>• ASP.NET Core and MVC frameworks<br>• Laravel and CakePHP for PHP development<br>• SQL Server, MySQL, and MongoDB databases<br>• REST API architecture and implementation<br>• GitHub Actions for CI/CD<br>• Clean code and scalable architectures<br><br>Impressive, right?",
        "Hadrian's technical expertise shines in these areas:<br><br>🛠️ <strong>Primary Technologies:</strong><br>• C# development with .NET frameworks<br>• PHP backend with Laravel/CakePHP<br>• Multi-database systems (SQL, NoSQL)<br>• API design and microservices<br>• DevOps automation and pipelines<br>• Enterprise security and RBAC<br><br>He's built production systems with all of these!",
        "Let me break down Hadrian's top technical proficiencies:<br><br>💪 <strong>Expert Level:</strong><br>• ASP.NET Core, ASP.NET MVC, C#<br>• Laravel, CakePHP, PHP development<br>• SQL Server, MySQL, MongoDB<br>• RESTful API development<br>• CI/CD with GitHub Actions<br>• Clean architecture patterns<br><br>He's got hands-on experience delivering real enterprise solutions.",
        "Hadrian's most proficient technologies include:<br><br>⚡ <strong>Backend Powerhouse:</strong><br>• .NET ecosystem (C#, ASP.NET Core/MVC)<br>• PHP frameworks (Laravel, CakePHP)<br>• Database technologies (SQL Server, MySQL, MongoDB)<br>• API development and integration<br>• DevOps and automation tools<br>• Security and authentication systems<br><br>He's worked on mission-critical applications using these techs.",
        "Here's Hadrian's technical sweet spot:<br><br>🎯 <strong>Core Proficiencies:</strong><br>• ASP.NET Core and C# development<br>• PHP with Laravel and CakePHP<br>• Enterprise databases (SQL Server, MySQL)<br>• REST API design and implementation<br>• CI/CD pipeline automation<br>• RBAC and security frameworks<br><br>He's delivered production-ready systems with these technologies!",
        "Hadrian's technical toolkit is comprehensive! His strongest areas are:<br><br>🔧 <strong>Expert Technologies:</strong><br>• C# and ASP.NET frameworks<br>• Laravel and CakePHP for PHP<br>• SQL Server, MySQL, MongoDB databases<br>• API architecture and development<br>• DevOps automation (GitHub Actions)<br>• Clean code and scalable design<br><br>He's got proven experience building enterprise applications.",
        "When it comes to proficiency, Hadrian excels in:<br><br>🚀 <strong>Technical Expertise:</strong><br>• ASP.NET Core, MVC, and C#<br>• PHP development with Laravel/CakePHP<br>• Database management (SQL, NoSQL)<br>• RESTful API development<br>• CI/CD automation and DevOps<br>• Enterprise security solutions<br><br>He's successfully delivered multiple projects using these technologies.",
        "Hadrian's most proficient technologies span:<br><br>💻 <strong>Full Stack Backend:</strong><br>• .NET platform (C#, ASP.NET)<br>• PHP ecosystem (Laravel, CakePHP)<br>• Database systems (SQL Server, MySQL, MongoDB)<br>• API development and integration<br>• DevOps and CI/CD pipelines<br>• Security and authentication<br><br>He's got the skills to tackle complex enterprise challenges!"
      ],
      quickActions: ['Backend expertise', 'Database skills', 'DevOps experience']
    },

    experience: {
      keywords: ['experience', 'work', 'job', 'career', 'professional', 'background', 'history', 'worked', 'employment', 'previous work', 'work history', 'jobs', 'positions'],
      responses: [
        "Let me tell you about Hadrian's work journey! Here's what he's been up to:<br><br>🚀 <strong>Backend/Fullstack Developer (2024 - Present)</strong><br>   • Building enterprise-level apps with CakePHP<br>   • Creating solid production APIs<br>   • Managing CI/CD pipelines<br><br>💼 <strong>Software Engineer (2023)</strong><br>   • Went solo on an enterprise Asset Management System using ASP.NET MVC and SQL Server<br>   • Crushed it by automating QA and cutting manual testing time by 90%<br><br>🏆 <strong>Cool achievements:</strong><br>   • Set up RBAC (Role-Based Access Control)<br>   • Designed normalized databases<br>   • Collaborated with AI engineers on automated testing"
      ],
      quickActions: ['View resume', 'See services', 'Contact info']
    },

    services: {
      keywords: ['service', 'offer', 'provide', 'help with', 'consulting', 'hire', 'freelance', 'work with', 'can you do', 'what do you offer', 'available for', 'do you provide'],
      responses: [
        "Hadrian's got some killer enterprise services lined up! Check these out:<br><br>🏗️ <strong>Enterprise Backend Solutions</strong><br>🔌 <strong>REST API Architecture</strong><br>🗄️ <strong>Data Architecture & Performance Tuning</strong><br>⚙️ <strong>DevOps & CI/CD Setup</strong><br>🔄 <strong>Legacy System Modernization</strong><br>🎯 <strong>Strategic Tech Consulting</strong><br><br>Everything's focused on making stuff <em>scalable, maintainable, and valuable</em> for your business long-term."
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

    challenging_project: {
      keywords: ['challenging', 'difficult', 'hardest', 'toughest', 'most challenging', 'biggest challenge', 'complex project', 'challenging project'],
      responses: [
        "Hadrian's most challenging project was definitely the Enterprise Asset Management System! He built it solo using ASP.NET MVC and SQL Server, implementing a complete RBAC system from scratch. The toughest part was handling complex business logic and ensuring data integrity across multiple modules.",
        "The Asset Management System stands out as Hadrian's biggest challenge. Working alone on this enterprise-level application, he had to design everything from database architecture to user interfaces. The RBAC implementation and automated testing setup were particularly demanding!",
        "Hadrian's toughest project was the comprehensive Asset Management System. As the sole developer, he tackled everything from backend APIs to frontend interfaces. The real challenge was integrating complex workflows and ensuring the system could handle enterprise-scale operations.",
        "The Enterprise Asset Management project was Hadrian's most challenging undertaking. He developed it entirely by himself, implementing advanced features like role-based access control and automated CI/CD pipelines. The complexity of managing multiple user roles and permissions was intense!",
        "Hadrian's hardest project to date was the Asset Management System. Building it solo meant handling every aspect - from database design to deployment automation. The biggest hurdles were creating a robust RBAC system and reducing QA time by 90% through smart automation.",
        "The Asset Management System represents Hadrian's most challenging work. As the only developer, he designed and built a full enterprise solution with ASP.NET MVC. The toughest challenges included implementing complex security features and optimizing performance for large-scale use.",
        "Hadrian's most difficult project was the comprehensive Enterprise Asset Management System. Working independently, he created a production-ready application with advanced RBAC and automated testing. The complexity of enterprise requirements and tight deadlines made it particularly challenging.",
        "The Asset Management project was Hadrian's biggest technical challenge. He developed it solo, implementing everything from REST APIs to CI/CD automation. The most demanding aspects were handling complex business rules and ensuring system reliability under enterprise workloads.",
        "Hadrian's toughest accomplishment was the Enterprise Asset Management System. As the sole developer, he built a complete solution with ASP.NET MVC and SQL Server. The challenges included designing scalable architecture and implementing automated testing that cut QA time dramatically.",
        "The Asset Management System stands as Hadrian's most challenging project. Working alone on this enterprise application, he mastered complex requirements including RBAC implementation, database optimization, and CI/CD automation. The learning curve was steep but incredibly rewarding!"
      ],
      quickActions: ['View experience', 'See skills', 'Contact Hadrian']
    },

    contact: {
      keywords: ['contact', 'reach', 'email', 'phone', 'message', 'hire', 'available', 'get in touch', 'how to contact', 'reach out', 'talk to', 'speak with', 'connect with'],
      responses: [
        "Want to chat with Hadrian? Here's how to reach him:<br><br>📧 <strong>Email:</strong> hadrianevarula@gmail.com<br>📱 <strong>Phone:</strong> +63 994 325 4337<br>📍 <strong>Based in:</strong> Cebu City, Philippines<br><br>Or just scroll down and hit up the contact form - super easy!"
      ],
      quickActions: ['Go to contact form', 'View LinkedIn', 'Download resume']
    },

    resume: {
      keywords: ['resume', 'cv', 'download', 'pdf', 'curriculum', 'download resume', 'get resume', 'see resume'],
      responses: [
        "You can <a href=\"./Hadrian%20Evarula%20-%20Resume.pdf\" target='_blank' download>download Hadrian's full resume here</a>, or check out the detailed experience and skills sections on this page!"
        ],
      quickActions: ['View experience', 'See skills', 'Services offered']
    },

    location: {
      keywords: ['location', 'based', 'from', 'live', 'philippines', 'cebu', 'where is hadrian based', 'based in', 'where from', 'city'],
      responses: [
        "Hadrian is based in Cebu City, Philippines, and is available for remote collaboration with teams worldwide."
      ],
      quickActions: ['Contact info', 'Services offered', 'View experience']
    },

    education: {
      keywords: ['education', 'degree', 'university', 'college', 'school', 'studied', 'graduate', 'academic', 'study', 'where did hadrian study', 'educational background', 'qualifications', 'alma mater'],
      responses: [
        "Hadrian's educational background:\n\n🎓 Certificate in Computer Technology (2021-2023)\nUniversity of San Carlos - Talamban Campus\nSoftware Engineering focus\n\n🎓 STEM (Science, Technology, Engineering, Mathematics)\nArgao National High School (2018-2020)\n\nStrong foundation in software engineering principles and practices!",
        "Hadrian studied at the University of San Carlos - Talamban Campus, where he earned a Certificate in Computer Technology from 2021-2023 with a focus on software engineering. Before that, he completed STEM studies at Argao National High School from 2018-2020.",
        "For his education, Hadrian attended Argao National High School for STEM (2018-2020), then pursued Computer Technology at University of San Carlos - Talamban Campus (2021-2023). His studies emphasized software engineering and programming fundamentals.",
        "Hadrian's academic journey includes STEM education at Argao National High School (2018-2020) and a Certificate in Computer Technology from University of San Carlos - Talamban Campus (2021-2023), where he specialized in software engineering principles.",
        "Hadrian graduated with a Certificate in Computer Technology from University of San Carlos - Talamban Campus in 2023, focusing on software engineering. His earlier education was in STEM at Argao National High School from 2018-2020.",
        "Education-wise, Hadrian completed his secondary education in STEM at Argao National High School (2018-2020), then earned a Computer Technology certificate from University of San Carlos - Talamban Campus (2021-2023) with software engineering specialization.",
        "Hadrian's formal education consists of STEM studies at Argao National High School (2018-2020) and a Certificate in Computer Technology from University of San Carlos - Talamban Campus (2021-2023), emphasizing software engineering and development practices.",
        "Hadrian attended Argao National High School for STEM education from 2018-2020, then pursued higher education in Computer Technology at University of San Carlos - Talamban Campus from 2021-2023, focusing on software engineering fundamentals.",
        "For his education, Hadrian studied STEM at Argao National High School (2018-2020) and earned a Certificate in Computer Technology from University of San Carlos - Talamban Campus (2021-2023), with a strong emphasis on software engineering principles.",
        "Hadrian's academic background includes completing STEM curriculum at Argao National High School (2018-2020) and obtaining a Computer Technology certificate from University of San Carlos - Talamban Campus (2021-2023), specializing in software engineering concepts and practices."
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

    availability: {
      keywords: ['available', 'freelance', 'full-time', 'work', 'hire', 'job', 'employment', 'opportunity', 'position', 'looking for work', 'currently available', 'open to work'],
      responses: [
        "Absolutely! Hadrian's currently open to both freelance projects and full-time opportunities. He's passionate about backend development and enterprise solutions.",
        "Yes, Hadrian is available for freelance work and considering full-time positions. He's got solid experience in .NET, PHP, and DevOps.",
        "Definitely! Hadrian's on the lookout for exciting freelance gigs and full-time roles in backend development and system architecture.",
        "You bet! Hadrian's available for freelance projects right now and open to full-time opportunities that match his expertise in enterprise systems.",
        "Sure thing! Hadrian's currently available for freelance work and actively exploring full-time positions in backend development.",
        "Yes! Hadrian's open to freelance opportunities and full-time roles. He's skilled in ASP.NET, Laravel, and CI/CD automation.",
        "Absolutely open! Hadrian's available for freelance projects and interested in full-time positions that leverage his backend development experience.",
        "Definitely available! Hadrian's looking for freelance work and full-time opportunities in enterprise software development.",
        "Yes, he's available! Hadrian's open to freelance gigs and full-time positions in backend development and system architecture.",
        "For sure! Hadrian's currently available for freelance projects and considering full-time roles in .NET and PHP development."
      ],
      quickActions: ['Contact Hadrian', 'View services', 'See experience']
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
            "You're welcome! Got any other questions about Hadrian's background or services?",
            "Happy to help! Anything else you'd like to know?",
            "My pleasure! Let me know if you need more info.",
            "Glad I could help! Curious about Hadrian's skills or projects?",
            "Anytime! More questions about Hadrian's experience? Shoot!",
            "You're welcome! Want to hear more about Hadrian's work or services?",
            "No problem at all! Anything else on your mind about Hadrian?",
            "Happy to assist! More details on Hadrian's professional journey?",
            "My pleasure! Feel free to ask about Hadrian's projects, skills, or experience.",
            "You got it! Let me know if you want more scoop on Hadrian's background."
      ],

      quickActions: ['View resume', 'Contact Hadrian', 'See services']
    },

    self: {
      keywords: ['about myself', 'tell me about myself', 'who am i', 'about me', 'tell me about me', 'my self', 'myself'],
      responses: [
        "I don't know you, but I can tell you who Hadrian is!"
      ],
      quickActions: ['Who is Hadrian?', 'Tell me about Hadrian', 'What services offered?']
    }
  };

  // State Management
  const state = {
    isOpen: false,
    hasGreeted: false,
    conversationHistory: [],
    isTyping: false,
    userName: null,
    waitingForName: true
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
    
    if (sender === 'assistant' && state.userName && !content.includes(state.userName)) {
      content = state.userName + ', ' + content;
    }
    
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
    
    // Simulate thinking time
    await new Promise(resolve => 
      setTimeout(resolve, randomDelay(CONFIG.typingDelay.min, CONFIG.typingDelay.max))
    );
    
    removeTypingIndicator();
    
    const intent = detectIntent(userMessage);
    
    if (intent) {
      const response = getRandomResponse(intent.responses);
      addMessage(response, 'assistant', intent.quickActions);
    } else if (state.waitingForName) {
      state.userName = extractName(userMessage);
      state.waitingForName = false;
      const welcome = state.userName ? `Nice to meet you, ${state.userName}! I'm here to help you learn about Hadrian's expertise in backend development, enterprise system architecture, and available services. What would you like to know?` : `I'm here to help you learn about Hadrian's expertise in backend development, enterprise system architecture, and available services. What would you like to know?`;
      const actions = ['Who is Hadrian?', 'What services offered?', 'Show skills'];
      addMessage(welcome, 'assistant', actions);
    } else {
      // Fallback responses
      const fallbacks = [
        "I'm not sure I understand. Try using keywords like <strong>'skills'</strong>, <strong>'experience'</strong>, or <strong>'contact'</strong>, and remember to use <strong>Hadrian's name</strong> instead of 'you'. You can ask me about Hadrian's skills, experience, services, or how to get in touch!",
        "That's an interesting question! For better responses, use short phrases or keywords, and please use <strong>Hadrian's name</strong> instead of 'you' to avoid confusion. Try asking me about backend development, technical expertise, or available services.",
        "I'd love to help! Use keywords or short questions for best results, and remember to use <strong>Hadrian's name</strong> instead of 'you'. You can ask about programming skills, work experience, contact information, or even just 'Who is Hadrian?'"
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
