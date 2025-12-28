# Smart Rewards & Wallet Backend

## Tech Stack

- Node.js
- Express
- MongoDB
- JWT Authentication

## Setup

1. Clone repo
2. npm install
3. Create .env file
4. npm run dev

## APIs

- POST /auth/signup
- POST /auth/login
- GET /wallet
- POST /wallet/add-money
- POST /wallet/redeem
- POST /rewards/redeem/:voucherId

## Notes

- Wallet auto-created on signup
- All wallet actions generate transactions
