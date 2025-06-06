import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

const DB = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '565656',
    database: 'smart-brain',
    port: 5432,
  },
});

const saltRounds = 10;

const PORT = 3000;
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.json('Connected...');
})

app.post('/signing', (req, res) => {

    DB.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid) {
                return DB.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'));
            } else  {
                res.status(401).json('Wrong Credentials');
            }
        })
        .catch(err => res.status(401).json('Wrong credentials'));
})

app.post('/register', (req, res) => {

    const { name, email, password } = req.body;
    let passHash = '';

    bcrypt.hash(password, saltRounds)
    .then(function(hash) {
        passHash = hash;

        DB.transaction(trx => {
            trx.insert({
                hash: passHash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
            })
            .then(user => {
                res.json(user[0]);
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
    })
    
    

    



})

app.get('/profile/:id', (req, res) => {

    const { id } = req.params;
    let found = false;

    DB.select('*').from('users').where({id})
    .then(user => {
        if(user.length) {
            res.json(user[0]);
        } else {
            res.status(404).json('error getting user');
        }
        
    })
    .catch(err => res.status(400).res.json(err));

    found=true;

    if(!found) {
        res.status(404).json('user not found');
    }
})

app.put('/image', (req, res) => {

    const { id } = req.body;
    let found = false;

    DB('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(404).json('Unable to get entries'))
    

    // if(!found) {
    //     res.status(404).json('user not found');
    // }
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