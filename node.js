const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Dane użytkowników (przykładowe, w rzeczywistości powinny być w bazie danych)
const users = {
    "michal.nowacki": bcrypt.hashSync("haslo123", 10),
    "cezary.wieczorek": bcrypt.hashSync("haslo456", 10),
    "leonard.bielik": bcrypt.hashSync("haslo101", 10)
};

// Middleware do parsowania JSON
app.use(express.json());

// Endpoint logowania
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (users[username]) {
        bcrypt.compare(password, users[username], (err, result) => {
            if (result) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        });
    } else {
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
