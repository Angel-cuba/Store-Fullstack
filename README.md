# Store Fullstack

E-commerce fullstack application built with Node.js + Express (API) and React (client).

## Stack

| Layer | Tech |
|-------|------|
| Backend | Node.js 24, Express 4, TypeScript, Mongoose 5 |
| Frontend | React 17, TypeScript, Redux Thunk, React Router v6 |
| Auth | JWT (jsonwebtoken), Passport + Google ID Token |
| Payments | Stripe (PaymentIntents API) |
| Database | MongoDB Atlas |
| Security | Helmet, CORS (origin-restricted), express-rate-limit, express-validator, bcrypt |

---

## Prerequisites

- Node.js 24 (see `.nvmrc` — run `nvm use`)
- MongoDB Atlas cluster (free tier works)
- Stripe account (test mode)
- Google Cloud project with OAuth 2.0 client ID

---

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/Angel-cuba/Store-Fullstack.git
cd Store-Fullstack
```

### 2. Configure the API

```bash
cd api
cp .env.example .env
```

Fill in `.env`:

```env
MONGO_USER=your_atlas_user
MONGO_PASSWORD=your_atlas_password
MONGO_DB=store

# Long random string — generate with: openssl rand -hex 64
PRIVATE_KEY=...

PORT=4000
CLIENT_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
STRIPE_SECRET_KEY=sk_test_...
```

```bash
npm install
npm run start:dev   # nodemon on :4000
```

### 3. Configure the client

```bash
cd ../client
```

Create `client/.env.development`:

```env
REACT_APP_API_URL=http://localhost:4000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

```bash
npm install
npm start           # CRA dev server on :3000
```

---

## API Reference

All protected routes require `Authorization: Bearer <token>` header.

### Auth — `/users`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/users/signup` | — | Register (name, lastname, email, password) |
| POST | `/users/signin` | — | Login (email, password) → `{ token, name, role }` |
| POST | `/users/google-signin` | — | Google OAuth (`id_token` in body) |
| GET | `/users/:id` | required | Get user by ID |
| PUT | `/users/:id` | required (self or ADMIN) | Update user |
| DELETE | `/users/:id` | required (self or ADMIN) | Delete user |

**Rate limit:** signup/signin are limited to 10 requests per 15 minutes per IP.

### Products — `/products`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/products/all` | — | List products (paginated: `?page=1&limit=10`) |
| GET | `/products/search` | — | Search by query params |
| GET | `/products/:id` | — | Get product by ID |
| POST | `/products` | ADMIN | Create product |
| PUT | `/products/:id` | ADMIN | Update product |
| DELETE | `/products/:id` | ADMIN | Delete product |

### Orders — `/orders`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/orders/payment-intent` | required | Create Stripe PaymentIntent (`{ amount }`) |
| POST | `/orders/create` | required | Place order (`{ products: string[], shippingAddress? }`) |
| GET | `/orders/user` | required | Get current user's order history |
| PATCH | `/orders/:id/status` | ADMIN | Update order status (`pending`/`shipped`/`delivered`/`cancelled`) |

### Admin — `/admin`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/admin/allusers` | ADMIN | List users (paginated) |
| GET | `/admin/allhistories` | ADMIN | All orders (paginated) |
| PATCH | `/admin/users/:id/ban` | ADMIN | Ban/unban user (`{ ban: boolean }`) |

### Token — `/token`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/token/verify` | required | Verify token and return user data |

---

## Running Tests

### Unit / Integration (React Testing Library)

```bash
cd client
npm test -- --watchAll=false
```

### API tests

```bash
cd api
npm test
```

---

## E2E Testing Guide

The app is ready for first E2E tests. Recommended tool: **Playwright**.

### Setup

```bash
cd client   # or repo root
npm install -D @playwright/test
npx playwright install
```

Create `playwright.config.ts`:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
});
```

### Critical flows to cover first

| Flow | Steps |
|------|-------|
| Register | Visit `/register` → fill form → submit → land on `/` |
| Login | Visit `/login` → fill credentials → submit → land on `/` |
| Guest browse | Visit `/` → products load → click product → see detail |
| Checkout | Login → add to cart → `/payment` → Stripe test card `4242 4242 4242 4242` |
| Admin panel | Login as ADMIN → visit `/admin` → see product CRUD |

### Stripe test cards

| Card | Result |
|------|--------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 9995` | Declined |

Use any future expiry date and any 3-digit CVC.

---

## User Roles

| Role | Access |
|------|--------|
| (unauthenticated) | Browse products, view product detail |
| `USER` | + cart, checkout, order history |
| `ADMIN` | + product CRUD, user management, all order history |

---

## Last Sprint — 2026-06-11

Changes shipped in the last sprint:

- **Fix: admin routing** — `App.tsx` was reading a `isAdmin` key that was never stored. Now derives admin status from `userRole` set at login.
- **Fix: credential leak** — removed `console.log(email, password)` from `LoginPage.tsx`.
- **Fix: action cleanup** — removed `console.log` from Redux user actions; simplified `logOut` to be synchronous.
- **Auth** — `RegisterPage`, `LoginPage` with Google OAuth (`@react-oauth/google`) fully wired to backend.
- **Security hardening** — Helmet, origin-restricted CORS, rate limiting on auth endpoints, input validation via `express-validator`.
- **Cart persistence** — cart survives page reload via `localStorage` (`store_cart` key), persisted on every Redux state change.
- **Token expiry** — `verifyTokenExpiration` auto-clears session and redirects to `/login` on expired JWT.
- **ErrorBoundary** — wraps app at two levels (root + inside Router) with a recoverable UI.
- **Stripe checkout** — full PaymentIntents flow: amount from cart → `createPaymentIntent` → `<Elements>` → confirm → `sendOrder`.
- **Order status** — ADMIN can update order status (`pending` → `shipped` → `delivered` / `cancelled`).
