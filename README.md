# IN-ventory
# Indy Game Vault - Indiana Small Business Application Prototype

## Overview
Indy Game Vault is a Node.js, Express, and EJS prototype built for a small video game store based in Indianapolis, Indiana. The application utilizes a relational SQLite database embedded within the framework to store and display inventory using Bootstrap 5 cards and interactive modals.

---

## Design Strategy

### 1. Separation of Concerns (MVC Pattern)
* **Views (`views/`):** Contains EJS template files divided into reusable partials (`header.ejs`, `menu.ejs`, `footer.ejs`) and page components (`products.ejs`, `about.ejs`, `contact.ejs`).
* **Routes & Controller (`app.js`):** Encapsulates server endpoints (`/`, `/about`, `/contact`) to decouple client requests from data operations.
* **Database Logic (`database.js`):** Isolates SQLite initialization, schema definition, and query execution methods away from UI rendering code.

### 2. Route Setup & Navigation Linking
* All menu links inside `views/partials/menu.ejs` route seamlessly to Express endpoints:
  * Home/Inventory: `/`
  * About Page: `/about`
  * Contact Page: `/contact`
