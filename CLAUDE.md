# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Slice & Sizzle is a pizza and fast food e-commerce website with a React frontend and Node.js backend.

## Development Commands

### Frontend (from `frontend/` directory)

```bash
npm run dev      # Start development server (Vite) on port 5173
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend (from `backend/` directory)

```bash
npm run dev      # Start with auto-reload (Node --watch) on port 3001
npm start        # Start production server
```

### Running Both

Start backend first, then frontend. Backend runs on port 3001, frontend on port 5173.

## Architecture

### Tech Stack

**Frontend:**
- React 19 with Vite 7
- Tailwind CSS 4 (via @tailwindcss/vite plugin)
- Zustand with persist middleware for state management
- Framer Motion for animations
- lucide-react for icons

**Backend:**
- Node.js with Express
- Telegram Bot API for order notifications

### Key Patterns

**Cart State** (`frontend/src/store/cartStore.js`): Global Zustand store with localStorage persistence. Handles cart operations (add/remove/update), cart UI state (open/close), and computed values (subtotal, tax at 8.75%, total).

**Product Data** (`frontend/src/data/products.js`): Static product catalog with pizzas, burgers, sides, and drinks. Each product has id, name, description, price, image URL, category, tags, and calories.

**Order Flow**: Checkout component (`frontend/src/components/Checkout.jsx`) posts to backend `/api/orders` endpoint, which sends formatted order notification to Telegram.

### Backend Configuration

Copy `backend/.env.example` to `backend/.env` and configure:
- `TELEGRAM_BOT_TOKEN`: Bot token from @BotFather
- `TELEGRAM_CHAT_ID`: Chat/group ID to receive orders

### Design System
- Dark theme with deep charcoal background (#0f0f0f)
- Primary accent: Electric Orange (#ff6b35)
- Secondary accent: Neon Green (#39ff14)
