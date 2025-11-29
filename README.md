# **Brevo Email Service using Node.js + Sequelize (Verification Flow Included)**

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A minimal, production-ready Node.js service for sending transactional emails using **Brevo (SendinBlue)** — with a **complete email verification flow** using **JWT + Sequelize ORM**.

This repository includes:

- ✅ SMTP + API-based email sending
- ✅ HTML template rendering with Handlebars
- ✅ User email verification flow
- ✅ Sequelize database models & migrations
- ✅ Secure token generation & validation
- ✅ Clean Express endpoints

---

## 🚀 **Features**

### 📧 Email Sending

- Send transactional emails via **Brevo SMTP/API**.
- Use dynamic HTML templates with Handlebars.

### 🔐 User Verification Flow

- Generate secure verification tokens with **JWT**.
- Store token in DB and email users a verification link.
- Backend verifies token and updates `isEmailVerified` in the DB.

### 🧩 Clean Architecture

- Reusable mailer service and template compiler.
- Sequelize models + migrations.
- Modular Express routes.

---

## 📦 **Project Structure**

```
/brevo-node-mailer
│
├── server/
│   ├── config/
│   ├── controllers/v1/email/
│   ├── migrations/
│   ├── models/
│   ├── routes/v1/
│   ├── seeders/
│   ├── services/v1/email/
│   ├── templates/
│   └── utils/
│       ├── handle-bar-compilers.js
│       └── mailer.js
│   ├── app.js
|
├── .sequelizerc
├── .gitignore
├── .env
└── package.json
```

---

## ⚙️ **Setup Instructions**

### 1. Clone the repo

```bash
git clone https://github.com/AmishB7/brevo-node-mailer.git
cd brevo-node-mailer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
DB_USER=your_db_user
DB_PASS=your_db_pass
DB_NAME=brevo-node-mailer
DB_HOST=localhost

PORT=3000

JWT_SECRET=YOUR_JWT_SECRET
BREVO_API_KEY=YOUR_BREVO_API_KEY
FRONTEND_URL=http://localhost:8080
```

> ⚠️ **Important:** Update the sender/replyTo email and name inside `server/utils/mailer.js`.

### 4. Run Sequelize commands

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### 5. Start the server

```bash
npm start
```

---

## 🔐 **User Verification Flow**

### Step 1: User Registers

1. Generate a verification token (JWT).
2. Save token in the database.
3. Send a verification email containing a link:

```
http://localhost:3000/v1/api/email/verify?token=XYZ
```

### Step 2: User Clicks the Link

1. Backend verifies the JWT token.
2. Updates `isEmailVerified = true` in the database.
3. Redirects to the frontend:

```
FRONTEND_URL/login?verified=true
```

---

## 🛠 **Technologies Used**

- Node.js
- Express.js
- Brevo Email API
- Sequelize ORM
- MySQL
- Handlebars
- JWT
- dotenv

---

## 📝 **Example Usage**

```javascript
const mailer = require("./server/utils/mailer");

mailer.sendMail({
  to: "user@example.com",
  subject: "Welcome to Brevo Node Mailer!",
  templateName: "welcome",
  context: { name: "John Doe" },
});
```

---

## 🤝 **Contributing**

Feel free to submit issues or pull requests. Contributions are welcome!

---

## 📄 License

MIT License © 2025

---
