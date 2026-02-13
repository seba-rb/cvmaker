# Profyle

<div align="center">
  <h3>Free, Simple, ATS-Friendly Resume Builder</h3>
  <p>Create professional resumes in minutes. No paywalls. No tricks.</p>
</div>

---

## 🎯 Overview

Profyle is a lightweight, open-source web application for building ATS-compatible resumes. Built with modern web technologies, it offers real-time preview, multiple professional templates, and AI-powered writing assistance—all running entirely in your browser.

### Why Profyle?

- **Truly Free** – No hidden costs, no watermarks, no premium features
- **Privacy First** – All data stays on your device; no account required
- **ATS-Optimized** – Templates designed to pass Applicant Tracking Systems
- **AI-Powered** – Smart writing assistance via Google Gemini
- **Fast & Simple** – Create a complete resume in under 15 minutes

---

## ✨ Features

### 📝 Smart Editor
- **Live Preview** – See changes in real-time as you type
- **Drag & Drop** – Reorder sections and entries effortlessly
- **Auto-Save** – Never lose your work with automatic local storage
- **Section Management** – Show/hide sections based on your needs

### 🎨 Professional Templates
- **Classic** – Traditional single-column layout
- **Modern** – Contemporary design with accent colors
- **Clean** – Ultra-minimalist aesthetic
- **Executive** – Premium look for senior positions

All templates are single-column, ATS-friendly, and use standard fonts.

### 🤖 AI Writing Assistant
Powered by Google Gemini 2.0 Flash:
- **Improve Bullet Points** – Transform descriptions into achievement-focused statements
- **Generate Summaries** – Create professional summaries from your experience
- **Suggest Skills** – Get relevant skill recommendations based on your background

### 📄 Export Options
- **PDF Export** – Generate high-quality PDFs with selectable text
- **Page Sizes** – US Letter or A4 format
- **Import/Export** – Save and load your resume data as JSON

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/seba-rb/profyle.git
   cd profyle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Building for Production

```bash
npm run build
npm run preview
```

The built files will be in the `dist/` directory.

---

## 🔑 AI Setup (Optional)

To use the AI writing features:

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click the settings icon in Profyle
3. Enter your API key
4. Start using AI suggestions

**Note:** Your API key is stored locally in your browser and never sent to any server except Google's Gemini API.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19 + TypeScript | Type-safe component architecture |
| **Build Tool** | Vite | Lightning-fast development and builds |
| **Styling** | Tailwind CSS | Utility-first styling |
| **State Management** | Zustand | Lightweight, simple state management |
| **Drag & Drop** | @dnd-kit | Accessible drag-and-drop functionality |
| **Icons** | Lucide React | Beautiful, consistent icon set |
| **AI** | Google Gemini API | Smart writing assistance |
| **Storage** | localStorage | Client-side data persistence |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ai/              # AI suggestion components
│   ├── editor/          # Form components for editing
│   ├── layout/          # App layout and structure
│   ├── preview/         # Resume preview rendering
│   ├── settings/        # Settings and configuration
│   └── templates/       # Resume templates
├── services/
│   ├── gemini.ts        # Gemini API integration
│   ├── pdf.ts           # PDF generation
│   └── storage.ts       # localStorage utilities
├── stores/
│   └── resume-store.ts  # Zustand state management
├── types/
│   └── resume.ts        # TypeScript type definitions
└── utils/
    └── defaults.ts      # Default data and constants
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- AI powered by [Google Gemini](https://ai.google.dev/)

---

## 📧 Contact

Have questions or suggestions? Feel free to open an issue or reach out!

---

<div align="center">
  <p>Made with ❤️ for job seekers everywhere</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
