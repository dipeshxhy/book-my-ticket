# Book My Ticket

A Node.js + Express + PostgreSQL seat booking application with:

- User registration and login
- Cookie-based JWT authentication
- Seat booking with database-level race condition protection
- Owner-only seat unbooking
- Admin routes for user and seat management
- Static frontend pages for seat view, login, and register

## Tech Stack

- Node.js (ES Modules)
- Express
- PostgreSQL (`pg`)
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- Validation (`zod`)
- Frontend: HTML + Tailwind CDN

## Project Structure

- `index.js`: app bootstrap and route mounting
- `db/index.js`: PostgreSQL pool config
- `db/migrations/001_add_seat_booking_owner_columns.sql`: schema patch for seat ownership columns
- `modules/auth/*`: auth routes, controller, service, model, validation
- `modules/seats/*`: seat routes, controller, service, model
- `modules/admin/*`: admin-only routes
- `common/middleware/*`: authentication and error middleware
- `public/index.html`: seat UI
- `public/login.html`: login page
- `public/register.html`: register page

## Features

### Auth

- `POST /auth/register`: create user
- `POST /auth/login`: login and set `token` cookie
- `POST /auth/logout`: clear cookie (authenticated)
- `GET /auth/me`: current user details (authenticated)

### Seats

- `GET /seats`: list seats
- `PUT /seats/:id/book`: book seat (authenticated)
- `DELETE /seats/:id/book`: remove booking (authenticated, owner-only)

### Admin

Mounted under `/admin` with `authenticated + authorized("admin")`.

- `GET /admin/users`
- `GET /admin/users/:id`
- `DELETE /admin/users/:id`
- `DELETE /admin/seats/:id` (force remove booking)

## Concurrency Safety

Seat booking and unbooking use SQL transactions with row locks:

- `BEGIN`
- `SELECT ... FOR UPDATE`
- conditional validation
- `UPDATE`
- `COMMIT`

This prevents two users from booking the same seat at the same time.

## Owner-only Unbooking Rule

When removing a booking from `DELETE /seats/:id/book`:

- Seat must be currently booked
- `seat.user_id` must match `req.user.id`
- Otherwise API returns an error

## API Response Shape

Success:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "...",
  "errors": null
}
```

## Environment Variables

Create a `.env` file in project root.

```env
PORT=8080
JWT_SECRET=your-super-secret
```

> Database credentials are currently configured directly in `db/index.js`.

## Database Setup

1. Create PostgreSQL database named `book_my_show`.
2. Run base seat schema from `modules/seats/seat.sql`.
3. Run migration for ownership columns:

```bash
node --input-type=module -e "import fs from 'fs'; import { pool } from './db/index.js'; const sql = fs.readFileSync('./db/migrations/001_add_seat_booking_owner_columns.sql', 'utf8'); try { await pool.query(sql); console.log('Migration applied'); } finally { await pool.end(); }"
```

## Installation and Run

```bash
npm install
npm run start:dev
```

Server starts at:

- `http://localhost:8080`

## Frontend Pages

- `http://localhost:8080/index.html` (seats)
- `http://localhost:8080/login.html`
- `http://localhost:8080/register.html`

## Seat UI Behavior

- Available seats are bookable for logged-in users
- Booked seats show who booked them
- Your own booked seats can be clicked to remove booking
- Other users cannot remove your booking

## Notes

- Auth is cookie-based, so browser requests automatically include token cookie
- `cors()` is enabled globally; adjust for production restrictions
- Move DB credentials from source code to `.env` for production

## Scripts

- `npm run start:dev`: start with Node watch mode

## Future Improvements

- Add refresh token / token expiry handling UI
- Add test suite for concurrent booking and owner checks
- Add role seeding for admin users
- Move all config to environment variables
