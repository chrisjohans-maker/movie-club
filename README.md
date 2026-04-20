# 🎬 Movie Club

A mobile-first web app for running a private movie club. Members vote on films, RSVP to screenings, score after watching, and track club stats — all in real time.

## Features

- **Home** — member profile with scoring stats, next screening card with countdown and RSVP, Club Pulse showing top-voted films
- **Discover** — browse TMDB for films, view details and trailers, add to the vote list
- **Vote** — cast interest votes (Must See / Want to See / Maybe / Pass) on watchlist films, quick vote mode with swipe
- **Score** — rate watched films (Masterpiece / Great / Good / Meh), view club scores and verdicts
- **Screenings** — schedule screenings, pre-screening detail overlay with trailer/synopsis/cast, post-screening inline scoring
- **Real-time sync** — all data syncs instantly across members via Firebase

## Tech Stack

- Single `index.html` file (no build step)
- Firebase Firestore (real-time database)
- TMDB API (film data, posters, metadata)
- YouTube Data API (trailers)
- GitHub Pages (hosting)

## Setup Your Own Club

### 1. Fork this repo

Click **Fork** on GitHub to create your own copy.

### 2. Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Firestore Database** (start in test mode)
4. Go to Project Settings → General → Your apps → Add a web app
5. Copy the Firebase config object

### 3. Get API keys

**TMDB:** Sign up at [themoviedb.org](https://www.themoviedb.org/settings/api) and get an API key.

**YouTube:** Go to [Google Cloud Console](https://console.cloud.google.com/), enable the YouTube Data API v3, and create an API key.

### 4. Update `index.html`

Find these lines near the top of the `<script>` section and replace with your values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const TMDB_KEY = 'YOUR_TMDB_KEY';
const YT = 'YOUR_YOUTUBE_KEY';
```

### 5. Set up your members

Find the `PROFILES` object and `MEMBERS` array and customize:

```javascript
const PROFILES = {
  'YourName': {alias:'The Founder', color:'#E8A020', bg:'#2a1800', border:'#5a3a00', emoji:'🎬'},
  'Friend1':  {alias:'The Critic',  color:'#4ab0cc', bg:'#001a22', border:'#1a4a5a', emoji:'📷'},
  // Add more members...
};
const MEMBERS = ['YourName','Friend1'];
```

Each member needs: `alias` (display title), `color` (hex), `bg` (dark background hex), `border` (border hex), `emoji`.

### 6. Deploy

**GitHub Pages:** Go to repo Settings → Pages → Source: Deploy from branch → main → Save.

Your app will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### 7. Install as app (optional)

On mobile, open the site in Safari/Chrome → Share → Add to Home Screen. The app works as a PWA.

## How It Works

Members select their identity when first opening the app (stored in localStorage). All film data, votes, scores, and screening info syncs through Firestore in real time. The chairman (first member) has admin privileges to schedule screenings and manage the club.

## License

Do whatever you want with it. Start a club.
