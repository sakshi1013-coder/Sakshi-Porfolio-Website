# Pixel Portfolio 🌸

A personal portfolio website featuring a unique interactive "Pixel Garden" theme, built with Next.js, TypeScript, and Firebase.

## ✨ Features

-   **Interactive Pixel Garden**: Visitors can plant flowers that persist across sessions.
-   **Dynamic Content**: Manage Projects, Skills, and Profile info via an Admin Dashboard.
-   **Glassmorphism UI**: Modern, clean design with glass-like elements.
-   **Animations**: Smooth transitions using GSAP and CSS animations.
-   **Fully Responsive**: Works seamlessly on desktop and mobile.

## 🛠️ Tech Stackhow 

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Backend**: Firebase (Firestore, Auth, Storage)
-   **Animations**: GSAP
-   **Deployment**: Vercel

## � Admin Dashboard

Access the admin dashboard at `/admin`.
-   **Login**: Uses Firebase Authentication.
-   **Manage**: Update your Bio, add Skills, upload Projects, and view Messages.

## ☁️ Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/).

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add the following **Environment Variables** in the Vercel Project Settings:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

4.  Deploy!

## 🛡️ Firestore Rules

Ensure your Firestore Security Rules are set to allow read/write (or configure specific rules for admin access):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
