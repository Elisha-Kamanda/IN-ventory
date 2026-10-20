import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { setupDatabase, getDBConnection } from "./database.js";

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.redirect('/products');
});

app.get('/products', (req, res) => {
    getDBConnection()
        .then((db) => {
            return db.all('SELECT * FROM inventory');
        })
        .then((inventory) => {
            res.render('pages/products', {
                title: 'Products',
                inventory: inventory
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/about', (req, res) => {
    res.render('pages/about', {
        title: "About"
    });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact', {
        title: 'Contact'
    });
});

setupDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`App listening at port ${port}`);
        });
    })
    .catch(err => {
        console.error("Database setup failed:", err);
    });