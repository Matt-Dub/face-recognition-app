import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const DB = {
    users: [
        {
            id: 1,
            name: 'John',
            email: 'john@email.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: 2,
            name: 'Sally',
            email: 'sally@email.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send('This is working');
})

app.post('/signing', (req, res) => {

    if(req.body.email === DB.users[0].email && req.body.password === DB.users[0].password) {
        res.json('Success');
    } else {
        res.status(400).json('Error logging in...');
    }
})

app.post('/register', (req, res) => {

    const { name, email, password } = req.body;
    let lastId = DB.users[DB.users.length-1].id;

    DB.users.push({
        id: lastId+1,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    res.json(DB.users[DB.users.length-1]);
})

app.get('/profile/:id', (req, res) => {

    const { id } = req.params;
    let found = false;

    DB.users.forEach((user) => {
        if(user.id === Number(id)) {
            found = true;
            return res.json(user);
        }
    });

    if(!found) {
        res.status(404).json('user not found');
    }
})

app.put('/image', (req, res) => {

    const { id } = req.body;
    let found = false;

    DB.users.forEach((user) => {
        if(user.id === Number(id)) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });

        if(!found) {
        res.status(404).json('user not found');
    }
})


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
    
})


/*

Routes:

/                   --> res = this is working
/signin             --> POST = success/fail
/register           --> POST = user
/profile/:userId    --> GET = user
/image              --> PUT = updated user

*/