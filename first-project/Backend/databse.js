const sqlite3 = require("sqlite3");

let db = new sqlite3.Database("products.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }

    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item TEXT NOT NULL,
        preis REAL NOT NULL,
        typ TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Products table created or already exists.");

            // Beispielprodukte einfügen, falls die Tabelle leer ist
            db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
                if (err) {
                    console.error(err.message);
                } else if (row.count === 0) {
                    const insert = "INSERT INTO products (item, preis, typ) VALUES (?, ?, ?)";
                    db.run(insert, ["Baum (Eiche)", 32.90, "Material"]);
                    db.run(insert, ["Pullover (Oberteile)", 15.99, "Material"]);
                    db.run(insert, ["Laminat (Echt Holz)", 12.35, "Material"]);
                    console.log("Example products inserted.");
                }
            });
        }
    });
});

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});

module.exports = db;
