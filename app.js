const express = require('express');
const fs = require('fs');
const path = require('path'); 

// App Instance
const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('web/public'));

// Routes ---
app.get('/', (req, res) => {
    res.sendFile('./web/public/index.html');
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    console.log('Username:', username);
    console.log('Password:', password);
    
    // Validate data 
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    // Check length/format
    if (password.length < 6) {
        return res.status(400).send('Username must be at least 6 characters');
    }

    // Check Database (pseudo)
    const userFilePath = path.join(__dirname, '/web/creds/username.txt');
    const usernameFileContent = fs.readFileSync(userFilePath, 'utf8')
    const usernames = usernameFileContent.split('\n').map(name => name.trim()); // split and store in array

    const passwordFilePath = path.join(__dirname, '/web/creds/password.txt');
    const passwordFileContent = fs.readFileSync(passwordFilePath, 'utf8')
    const passwords = passwordFileContent.split('\n').map(name => name.trim()); // split and store in array

    const vulnPWListFilePath = path.join(__dirname, '/web/creds/xato-net-10-million-passwords-1000.txt');
    const vulnPWList = fs.readFileSync(vulnPWListFilePath, 'utf8')
    const vulnPasswords = vulnPWList.split('\n').map(name => name.trim()); // split and store in array

    if (vulnPasswords.includes(password)){
        res.status(401).send('Password in use is vulnerable to credential stuffing attacks');
    }

    if (usernames.includes(username) && passwords.includes(password)) {
        res.send('Login successful!');
    } else {
        res.status(401).send('Username or password invalid.');
    }
});



// Start Server
app.listen(3000, () => {
    console.log('Web server listening running on port 3000');
});

