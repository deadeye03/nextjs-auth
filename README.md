# Introduction

This project provides user authentication using Next.js with GitHub and Google OAuth 2.0. The purpose of this authentication system is to allow users to securely authenticate using their GitHub or Google accounts. The user details are stored in a MongoDB database for persistent storage.

## Prerequisites
  Before running the project, make sure you have the following installed on your system:

  Node.js (version 14 or higher)
  MongoDB (either locally or through a service like MongoDB Atlas)
  Git
  Next.js (version 14 or higher)

Environment Variables
You will need to create a .env.local file in the root of the project and define the following environment variables:

# MongoDB connection string
DATABASE=<your_mongodb_connection_uri>

# GitHub OAuth credentials
GITHUB_ID=<your_github_client_id>
GITHUB_SECRET=<your_github_client_secret>

# Google OAuth credentials
GOOGLE_ID=<your_google_client_id>
GOOGLE_SECRET=<your_google_client_secret>

## Features
<User authentication using GitHub and Google OAuth 2.0.>
<Beautiful and user-friendly login and signup pages.>
<Secure storage of user data in MongoDB.>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
