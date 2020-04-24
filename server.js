const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
	db('accounts')
		.then(accounts => {
			res.status(200).json(accounts);
		})
		.catch(error => {
			res.status(500).json({ message: 'error getting the accounts' });
		});
});

server.get('/accounts/:id', (req, res) => {
	db('accounts')
		.where({ id: req.params.id })
		.first()
		.then(account => {
			res.status(200).json(account);
		})
		.catch(error => {
			res.status(500).json({ message: 'error getting the accounts' });
		});
});

server.post('/accounts', (req, res) => {
	const account = req.body;
	db('accounts')
		.insert(account, 'id')
		.then(account => {
			res.status(200).json(account);
		})
		.catch(error => {
			res.status(500).json({ message: 'error saving the account to the db' });
		});
});

server.put('/accounts/:id', (req, res) => {
	const changes = req.body;
	db('accounts')
		.where('id', '=', req.params.id)
		.update(changes)
		.then(count => {
			if (count > 0) {
				res.status(200).json(count);
			} else {
				res.status(404).json({ message: 'not found' });
			}
		})
		.catch(error => {
			res.status(500).json({ message: 'error updating the account' });
		});
});
server.delete('/accounts/:id', (req, res) => {
	db('accounts')
		.where('id', '=', req.params.id)
		.del()
		.then(count => {
			if (count > 0) {
				res.status(200).json(count);
			} else {
				res.status(404).json({ message: 'not found' });
			}
		})
		.catch(error => {
			res.status(500).json({ message: 'error removing the post' });
		});
});

module.exports = server;