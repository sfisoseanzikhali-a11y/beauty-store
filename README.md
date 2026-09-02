# Beauty Store

A full-stack beauty e-commerce project with a customer storefront and an administrative order-management experience.

**Live demo:** [neila-beauty-store.vercel.app](https://neila-beauty-store.vercel.app)

## Overview

Beauty Store demonstrates an end-to-end online shopping flow: customers can browse products, manage a cart, place an order, continue to payment, and receive order communication. Administrators can sign in, review store activity, manage products, and update order status.

## Features

- Responsive product catalogue and product-detail pages
- Persistent shopping cart and checkout flow
- Order creation and status management
- PayFast payment hand-off and notification endpoint
- WhatsApp order notifications through Twilio
- Protected admin dashboard for products and orders
- Supabase-backed application data

## Tech Stack

- **Frontend:** Next.js, React, JavaScript, CSS
- **Backend:** Next.js API routes and Express
- **Database:** Supabase
- **Authentication:** bcrypt and JSON Web Tokens
- **Integrations:** PayFast and Twilio
- **Deployment:** Vercel

## Run Locally

1. Install dependencies:

~~~bash
npm install
~~~

2. Create a local environment file:

~~~dotenv
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
JWT_SECRET=
PAYFAST_MERCHANT_ID=
PAYFAST_MERCHANT_KEY=
PAYFAST_PASSPHRASE=
PAYFAST_SANDBOX=true
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_FROM=
STORE_WHATSAPP_TO=
~~~

3. Start the development server:

~~~bash
npm run dev
~~~

Open [http://localhost:3000](http://localhost:3000).

## Security and Status

This is a portfolio project under active security hardening. Use sandbox payment credentials, keep service-role keys server-side, and complete payment and authorization testing before adapting it for a real store.

## Author

Built and maintained by [Sifiso Zikhali](https://github.com/sfisoseanzikhali-a11y).
