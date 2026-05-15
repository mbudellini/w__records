# Disqueria What?

A vinyl record e-commerce platform with Discogs integration, built as a full-stack application and deployed on Vercel.

## Tech Stack

- **Frontend:** React 19, Vite, React Router 7
- **Backend:** Express.js (serverless on Vercel)
- **Database:** MongoDB (Mongoose ODM)
- **Payments:** Stripe Checkout
- **Auth:** JWT + bcrypt
- **External API:** Discogs

## Features

### Catalogue

- Browse the full record collection in a responsive grid layout
- Search records by title or artist
- Sort by alphabetical, reverse alphabetical, newest, or oldest
- Click any record card to view detailed information

### Record Detail

- Full metadata: title, artists, year, label, format, genres, styles
- Multiple physical copies shown individually with condition grading and price
- Add a specific copy to cart (login required)

### Shopping Cart

- Add and remove items
- Running total price calculation
- Single-copy policy: each physical record can only be in one user's cart at a time
- Proceed to Stripe Checkout directly from the cart

### Payments

- Stripe Checkout integration with product details and cover images
- Payment success page with order confirmation and session ID
- Payment failed page with common troubleshooting reasons
- Order history stored in the database

### User Authentication

- Register with email and password (bcrypt hashed)
- Login with JWT tokens (7-days expiry)
- Persistent sessions via localStorage
- Auth-protected actions (cart, checkout)

### Admin Dashboard

- Sync inventory from Discogs API (adds new records, removes sold ones)
- Collection stats: total records, average price, total value, top genres, peak decade
- View all orders with status, amount, items, and customer email

### About Page

- Project story and background
- Pop-up event history (Future Archives, Garage Sale Borgo San Giovanni, Provvisorio Clothing)
- Media gallery with images and autoplay video

### Responsive Design

- Mobile-first layout with hamburger menu
- Dark theme with gold accent palette
- Adaptive grids for all screen sizes


## Project Structure

```
w_records/
├── api/
│   ├── controllers/        # Route handlers (business logic)
│   ├── models/             # Mongoose schemas (combined)
│   ├── routes/             # Express route definitions
│   ├── index.js            # Local development server
│   └── index.vercel.js     # Vercel serverless entry point
├── public/
│   └── resources/          # Static images and video
├── src/
│   ├── components/         # Navbar
│   ├── context/            # Auth context provider
│   ├── pages/              # React page components
│   ├── App.jsx             # Root component with routes
│   └── index.css           # Global styles and CSS variables
├── vercel.json             # Vercel rewrites config
└── package.json
```

## Deployment

The app is configured for Vercel with serverless functions:

- `vercel.json` rewrites `/api/*` to the serverless Express app
- All other routes serve the React SPA
- Static assets are served from `public/`

## Environment Variables

```
MONGODB_URI=         # MongoDB connection string
JWT_SECRET=          # Secret for JWT signing
STRIPE_SECRET_KEY=   # Stripe API secret key
DOMAIN=              # Public domain for Stripe redirect URLs
CURRENCY=            # Stripe currency code (e.g. eur)
PAYMENT_METHODS=     # Comma-separated Stripe payment methods
```
