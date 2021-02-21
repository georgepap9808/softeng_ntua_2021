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
		//.option('--format <value>', 'Insert format, json or csv', 'json')
        //.option('--apikey <value>')
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
        //.option('--format <value>', 'Insert format, json or csv', 'json')
        //.option('--apikey <value>')
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
		//.option('--format <value>', 'Insert format, json or csv', 'json')
        //.option('--apikey <value>')
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
		//.option('--format <value>', 'Insert format, json or csv', 'json')
        //.option('--apikey <value>')
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
		//.option('--format <value>', 'Insert format, json or csv', 'json')
        //.option('--apikey <value>')
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
		//.option('--format <value>', 'Insert format, json or csv', 'json')
        //.option('--apikey <value>')
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
		//.option('--format <value>', 'Insert format, json or csv', 'json')
        //.option('--apikey <value>')
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
				if (command.usermod && command.username && command.passw){
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
				else if(command.usermod){
					console.log('username and password are required to modify user');
				}
				if(command.users){
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
                else if(command.sessionsupd && command.source){
					axios.post(`${base_url}/admin/system/sessionsupd/${command.source}?format=${command.format}?apikey=${command.apikey}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('{ status: \'error\' }');
					})
				}
				else if(command.sessionsupd){
					console.log('source option is required for sessionsupd');
				}
				else if(command.healthcheck){
					axios.get(`${base_url}/admin/healthcheck?format=${command.format}?apikey=${command.apikey}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('{ status: \'error\' }');
					})
				}
				else if(command.resetsessions){
					axios.post(`${base_url}/admin/resetsessions?format=${command.format}?apikey=${command.apikey}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('{ status: \'error\' }');
					})
				}
			})
		});
    
        program.parse(process.argv);
}