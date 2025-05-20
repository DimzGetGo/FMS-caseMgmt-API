# 📦 Case Management Mock API

A simple mock API built with [Hapi.js](https://hapi.dev/) to simulate endpoints for case management and damage review.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Server

```bash
npm run dev
# or
node server.js
```

The API will be available at:  
👉 `http://localhost:3000`

---

## 📂 Project Structure

```
.
├── db/
│   ├── reports.json          # Report details by reportId
│   └── vehicleReports.json   # VSR (Vehicle Status Reports)
├── routes/
│   ├── reportRoutes.js       # Handles /api/fmsTasking/v1/caseManagement/report/:reportId
│   └── vsrReportsRoutes.js   # Handles /api/fmsTasking/v1/caseManagement/vsrReports (paginated)
├── server.js                 # Hapi.js server setup
└── package.json              # Project config and scripts
```

---

## 🛠️ Tech Stack

- [Hapi.js](https://hapi.dev/)
- JSON as a mock DB
- Node.js

---

## 🧪 API Testing

You can use tools like [Postman](https://www.postman.com/) or [Hoppscotch](https://hoppscotch.io/) to test endpoints:

- `GET /api/fmsTasking/v1/caseManagement/report/1`
- `GET /api/fmsTasking/v1/caseManagement/vsrReports?page=1&size=20&vehicleId=1`

---

## 📄 License

This project is open-source and free to use.
