# Daily To-Do List Application

A premium, modern React application designed to help you manage your daily tasks. Built with a focus on cutting-edge aesthetics, it features an animated gradient mesh background, frosted glass (glassmorphism) components, and fluid micro-animations.

## ✨ Key Features

- **Categorized Tasks**: Organize your day with interactive tags (`Work`, `Personal`, `Health`, `Other`).
- **Dual Themes**: Toggle seamlessly between "Crisp White" light mode and "Midnight Indigo" dark mode.
- **Data Persistence**: Your tasks and theme preferences are automatically saved to your browser's local storage. You will never lose your list on refresh.
- **Danger Zone Verification**: A built-in safeguard requires you to type "DELETE" before clearing all tasks, preventing accidental data loss.
- **Premium Aesthetics**: Fully custom CSS featuring backdrop blurs, animated hover states, and staggered entrance animations.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, Keyframe Animations)
- **State Management**: React Hooks (`useState`, `useEffect`) 

## 🚀 Running Locally

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd website-vibecode
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## 📦 Deployment (Vercel)

This application is fully optimized for Vercel deployment. No extra configuration flags are needed.

1. Push your code to a GitHub repository.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
3. Click **Add New Project** and import your repository.
4. Vercel will automatically detect `Vite` and configure the build settings (`npm run build`).
5. Click **Deploy**!