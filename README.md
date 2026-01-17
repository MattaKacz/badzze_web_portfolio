# Badzze Web Portfolio

A high-performance, interactive One-Page Portfolio website designed to showcase services and projects. Built with **Astro 5** and **React 19**, this project focuses on speed (SSG), accessibility, and aesthetics, serving as both a professional business card and a sales offer.

## 🚀 Tech Stack

- **Framework:** [Astro 5](https://astro.build/) (Static Site Generation)
- **UI Library:** [React 19](https://react.dev/) (Used for interactive islands)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** TypeScript 5
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** Lucide React
- **Linting & Formatting:** ESLint, Prettier

## 🛠️ Getting Started Locally

### Prerequisites

- **Node.js**: Version `v22.14.0` is required (as specified in `.nvmrc`).
- **npm**: Used as the package manager.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd badzze_web_portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:4321`.

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server with hot reloading. |
| `npm run build` | Builds the production-ready static site into the `dist/` directory. |
| `npm run preview` | Previews the built production site locally. |
| `npm run astro` | Runs the Astro CLI directly. |

## 🎯 Project Scope

This project implements a Single Page Application (SPA) feel using Multi-Page App (MPA) architecture where beneficial, containing the following sections:

- **Hero Section**: Bio and Unique Value Proposition (UVP).
- **About Me**: Professional background.
- **Portfolio**: Grid layout with modal details and deep linking support.
- **Offer/Packages**: Services and pricing.
- **Contact**: Contact form integrated with EmailJS (Client-side).

## 📊 Project Status

**🚧 In Development (MVP)**

Current focus:
- Implementation of core sections.
- Responsive design (Mobile First).
- Integration of EmailJS for the contact form.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
