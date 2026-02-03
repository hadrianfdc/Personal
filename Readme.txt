# Hadrian Evarula - Personal Portfolio

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://hadrian-evarula.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern, responsive personal portfolio website showcasing Hadrian Evarula's expertise as a Backend/Fullstack Developer. Features an intelligent AI-powered chat assistant with customizable themes and smooth animations.

## 🌟 Features

### 🎨 Interactive Portfolio
- **Responsive Design**: Optimized for all devices using Bootstrap 5
- **Smooth Animations**: CSS animations and AOS library for engaging transitions
- **Modern UI**: Clean, professional design with gradient accents
- **Fast Loading**: Optimized assets and efficient code structure

### 🤖 AI Chat Assistant
- **Intelligent Responses**: Powered by Google Gemini AI for contextual conversations
- **Streaming Effect**: ChatGPT-like character-by-character message animation
- **Theme Customization**:
  - Light/Dark mode toggle
  - 4 accent colors (Green, Blue, Purple, Orange)
  - Instant theme switching with smooth transitions
- **Persistent Settings**: User preferences saved in localStorage
- **Structured Responses**: Clean, formatted replies with categorized information
- **Professional Knowledge Base**: Comprehensive details about skills, experience, and projects

### 🛠️ Technical Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Frameworks**: Bootstrap 5, jQuery
- **Icons**: Bootstrap Icons, Boxicons
- **Animations**: AOS (Animate On Scroll)
- **AI Integration**: Google Gemini API
- **Build Tools**: None required (vanilla setup)

## 🚀 Quick Start

### Prerequisites
- Modern web browser
- Internet connection (for AI chat functionality)
- Google Gemini API key (optional, for full chat features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hadrian-portfolio.git
   cd hadrian-portfolio
   ```

2. **Open in browser**
   ```bash
   # Using Python (if available)
   python -m http.server 8000

   # Or simply open index.html in your browser
   ```

3. **Configure AI Chat (Optional)**
   - Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Update `assets/js/config.js` with your API key
   - Without API key, chat shows fallback messages

## 📁 Project Structure

```
hadrian-portfolio/
├── index.html                 # Main portfolio page
├── assets/
│   ├── css/
│   │   ├── style.css         # Main stylesheet
│   │   └── chat-assistant.css # Chat widget styles
│   ├── js/
│   │   ├── main.js           # Portfolio interactions
│   │   ├── chat-assistant.js # AI chat functionality
│   │   ├── config.js         # API configuration
│   │   └── utils.js          # Utility functions
│   ├── img/                  # Portfolio images
│   └── vendor/               # Third-party libraries
├── forms/
│   └── contact.php           # Contact form handler
└── README.md                 # This file
```

## 🎯 Key Components

### Portfolio Sections
- **Hero**: Introduction with animated typing effect
- **About**: Personal background and photo
- **Resume**: Skills, experience, and education
- **Services**: Offered development services
- **Portfolio**: Project showcase
- **Contact**: Contact form and information

### Chat Assistant Features
- **Greeting Flow**: Personalized welcome with name collection
- **Contextual Responses**: AI understands portfolio context
- **Theme Integration**: Chat adapts to selected theme
- **Error Handling**: Graceful fallbacks for API issues
- **Mobile Optimized**: Responsive chat interface

## 🎨 Customization

### Themes
The chat assistant supports:
- **Light Mode**: Clean white background
- **Dark Mode**: Modern dark theme
- **Accent Colors**: Green (default), Blue, Purple, Orange

### Styling
- Colors defined via CSS variables
- Easy theme switching with data attributes
- Smooth transitions for all changes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **BootstrapMade**: Original template design
- **Google Gemini**: AI chat capabilities
- **Bootstrap Icons**: Icon library
- **AOS**: Animation library

## 📞 Contact

**Hadrian Evarula**
- Email: hadrianevarula@gmail.com
- Phone: +63 994-325-4337
- Location: Cebu City, Philippines

---

⭐ **Star this repo** if you found it helpful!
