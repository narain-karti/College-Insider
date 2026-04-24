<div align="center">
  <img width="100%" alt="College Insider Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
  <h1>🎓 College Insider</h1>
  <p><strong>A platform bridging the gap between aspiring students and experienced mentors.</strong></p>
</div>

---

## 📖 About The Project

**College Insider** is a comprehensive platform designed to help students connect with experienced mentors from top colleges. It provides a seamless experience for finding mentors, scheduling bookings, managing wishlists, and chatting in real-time. Whether you need guidance for college admissions, career advice, or academic help, College Insider has you covered.

### ✨ Key Features

- **Mentor Discovery:** Browse and discover mentors based on expertise, college, and availability.
- **Booking System:** Integrated booking engine with Razorpay for secure payments and session scheduling.
- **Real-time Chat:** Communicate directly with mentors before and after sessions.
- **Wishlist:** Save your favorite mentor profiles for quick access later.
- **Mentor Onboarding:** A streamlined process for experienced students/alumni to become mentors and start earning.
- **Interactive Dashboard:** Manage your upcoming sessions, past bookings, and earnings (for mentors).
- **AI Integration:** Leveraging Google GenAI for smart recommendations and enhanced interactions.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, React Router v7, Tailwind CSS v4, Framer Motion
- **Backend:** Node.js, Express (via server.ts)
- **Build Tool:** Vite v6
- **Database / API:** Google GenAI, Razorpay Integration
- **Styling & Icons:** Lucide React, clsx, tailwind-merge
- **Language:** TypeScript

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/narain-karti/College-Insider.git
   cd College-Insider
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` or `.env.local` file in the root directory and add the required keys:
   ```env
   # Example
   GEMINI_API_KEY=your_gemini_api_key_here
   RAZORPAY_KEY_ID=your_razorpay_key_here
   RAZORPAY_KEY_SECRET=your_razorpay_secret_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
college-insiders/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable React components (Layout, UI, etc.)
│   ├── lib/              # Context providers and utility functions
│   ├── pages/            # Page components (Dashboard, Discover, Landing, etc.)
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application routing and providers
│   ├── main.tsx          # React application entry point
│   └── index.css         # Global styles and Tailwind configuration
├── server.ts             # Express server setup
├── package.json          # Project metadata and scripts
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
