# WellSpring: A Digital Mental Health System

WellSpring is a comprehensive web application designed to provide accessible and confidential mental wellness support for students. Built with a modern tech stack, this platform integrates AI-driven tools, professional resources, and peer support to create a holistic mental health ecosystem.

## ✨ Key Features

-   **Dashboard**: A personalized welcome page that provides a central hub for accessing all platform features, including mood check-ins and a summary of upcoming appointments.
-   **AI-Guided First-Aid**: A confidential chat interface powered by Google's Gemini model. Students can describe how they're feeling and receive immediate, empathetic guidance and actionable coping strategies.
-   **Counselor Booking**: A secure system for browsing professional counselor profiles, viewing their specialties, and scheduling confidential appointments.
-   **Resource Hub**: A curated library of articles, guides, and tools focused on mental wellness. Content is organized into categories like `Stress & Anxiety`, `Mindfulness`, `Self-Care`, and `Personal Stories`.
-   **Peer Support Forums**: A safe and anonymous space for students to connect, share experiences, and offer mutual support. Features include creating posts, liking, saving for later, and deleting one's own posts.
-   **User Profile & Settings**: A dedicated area for users to manage their public profile, notification preferences, and account settings like password changes.
-   **Urgent Support**: A critical page providing immediate access to emergency hotlines and crisis resources for users in urgent need.
-   **Admin Dashboard**: A restricted section for administrators to view and manage application data, such as the resources available in the Resource Hub.

## 🛠️ Technology Stack

This project is built with a modern, robust, and scalable technology stack:

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **AI Integration**: [Genkit (by Google)](https://firebase.google.com/docs/genkit)
-   **Database**: [MongoDB](https://www.mongodb.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/PrerakPithadiya/digital-mental-health-system.git
    cd digital-mental-health-system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your `MONGODB_URI` and `GEMINI_API_KEY`.
    ```env
    MONGODB_URI="your_mongodb_connection_string"
    GEMINI_API_KEY="your_google_ai_api_key"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.
