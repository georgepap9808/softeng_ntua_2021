import { command } from 'yargs';

const program = require('commander');
const axios = require('axios');
const https = require('https');
const fs = require('fs');

const base_url = 'https://localhost:8765/evcharge/api';
const agent = new https.Agent({
	rejectUnauthorized: false,
});


export function cli(args) {

    program
		.command('login')
		.requiredOption('--format <value>')
        .requiredOption('--apikey <value>')
		.requiredOption('--username <value>', 'User\'s username')
		.requiredOption('--passw <value>', 'User\'s password')
		.action(function (command) {
			axios.post(`${base_url}/login?format=${command.format}?apikey=${command.apikey}`, {
					username: command.username,
					password: command.passw
				}, { httpsAgent: agent })
				.then(function (response) {
					fs.writeFile('/tmp/softeng20bAPI.token', JSON.stringify(response.data), function(err) {
						if(err) {
							return console.log('Writing token failed:', err);
						}
						console.log('Login successful. Token saved');
					});
				})
				.catch(function (error) {
					console.log('Login failed: ', error.response.data.error);
				});
		});

	program
		.command('logout')
        .requiredOption('--format <value>')
        .requiredOption('--apikey <value>')
		.action(function (command) {
			axios.post(`${base_url}/logout?format=${command.format}?apikey=${command.apikey}`, { httpsAgent: agent })
				.then(function (response) {
					// handle success
					console.log(response.data);
				})
				.catch(function (error) {
					// handle error
					console.log('{ status: \'error\' }');
				})
            fs.unlink('/tmp/softeng20bAPI.token', function(err) {
				if(err) {
					return console.log('Removing token failed:', err);
				}
				console.log('Logout successful. Token removed');
			});
		});

	program
		.command('SessionsPerPoint')
		.requiredOption('--format <value>')
        .requiredOption('--apikey <value>')
		.requiredOption('--point <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.action(function (command) {
			fs.readFile('/tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				axios.get(`${base_url}/SessionsPerPoint/${command.point}/${command.datefrom}/${command.dateto}?format=${command.format}?apikey=${command.apikey}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('{ status: \'error\' }');
					})
			})
		});

    program
		.command('SessionsPerStation')
		.requiredOption('--format <value>')
        .requiredOption('--apikey <value>')
		.requiredOption('--station <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.action(function (command) {
			fs.readFile('/tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				axios.get(`${base_url}/SessionsPerStation/${command.station}/${command.datefrom}/${command.dateto}?format=${command.format}?apikey=${command.apikey}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('{ status: \'error\' }');
					})
			})
		});

    program
		.command('SessionsPerEV')
		.requiredOption('--format <value>')
        .requiredOption('--apikey <value>')
		.requiredOption('--ev <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.action(function (command) {
			fs.readFile('/tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				axios.get(`${base_url}/SessionsPerEV/${command.ev}/${command.datefrom}/${command.dateto}?format=${command.format}?apikey=${command.apikey}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('{ status: \'error\' }');
					})
			})
		});

    program
		.command('SessionsPerProvider')
		.requiredOption('--format <value>')
        .requiredOption('--apikey <value>')
		.requiredOption('--provider <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.action(function (command) {
			fs.readFile('/tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				axios.get(`${base_url}/SessionsPerProvider/${command.provider}/${command.datefrom}/${command.dateto}?format=${command.format}?apikey=${command.apikey}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('{ status: \'error\' }');
					})
			})
		});


    //username alphanumeric
    //passw no spaces
	program
		.command('Admin')
		.requiredOption('--format <value>')
        .requiredOption('--apikey <value>')
		.option('--username <value>', 'User\'s username')
        .option('--passw <value>', 'User\'s password')
		.option('--users <value>')
		.option('--sessionsupd <value>')
		.option('--source <value>')
		.option('--healthcheck')
        .option('--resetsessions')
		.action(function (command) {
			fs.readFile('/tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				if (command.usermod){
                    axios.post(`${base_url}/admin/usermod/:${command.username}/:${command.passw}?format=${command.format}?apikey=${command.apikey}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
                        .then(function (response) {
                            // handle success
                            console.log(command.apikey);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log('{ status: \'error\' }');
                        })
                }
                else if(command.users){
                    axios.get(`${base_url}/admin/users/:${command.username}?format=${command.format}?apikey=${command.apikey}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
                        .then(function (response) {
                            // handle success
                            console.log(command.username);
							console.log(command.apikey);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log('{ status: \'error\' }');
                        })
                }
                // else if(command.sessionsupd){
					
				// }

			})
		});

	program.parse(process.argv);
}