process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const program = require('commander');
const axios = require('axios');
const https = require('https');
const fs = require('fs');

const base_url = 'https://127.0.0.1:5000/evcharge/api'		//'https://localhost:8765/evcharge/api';
const agent = new https.Agent({
    rejectUnauthorized: false, // (NOTE: this will disable client verification)
    cert: fs.readFileSync("./src/cli.crt"),
    key: fs.readFileSync("./src/cli.key"),
});


export function cli(args) {

    program
		.command('login')
		.requiredOption('--username <value>', 'User\'s username')
		.requiredOption('--passw <value>', 'User\'s password')
		.action(function (command) {
			axios.post(`${base_url}/login?username=${command.username}&password=${command.passw}`,
				{ httpsAgent: agent })
				.then(function (response) {
					fs.writeFile('/tmp/softeng20bAPI.token', JSON.stringify(response.data), function(err) {
						if(err) {
							return console.log('Writing token failed:', err);
						}
						console.log('Login successful. Token saved');
					});
				})
				.catch(function (error) {
					console.log('Login failed: ', error);	//response.data.error
				});
		});
    
    program
		.command('logout')
		.action(function (command) {
			axios.post(`${base_url}/logout`, { httpsAgent: agent })
				.then(function (response) {
					// handle success
					console.log(response.data);
					fs.unlink('tmp\/softeng20bAPI.token', function(err) {
						if(err) {
							return console.log('Removing token failed:', err);
						}
						console.log('Logout successful. Token removed');
					});
				})
				.catch(function (error) {
					// handle error
					console.log('Logout failed: ', error);
				})
		});

	program
		.command('SessionsPerPoint')
		.requiredOption('--point <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.action(function (command) {
			fs.readFile('/tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				axios.get(`${base_url}/SessionsPerPoint?point=${command.point}?datefrom=${command.datefrom}?dateto=${command.dateto}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('SessionsPerPoint failed: ', error);
					})
			})
		});

    program
		.command('SessionsPerStation')
		.requiredOption('--station <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.action(function (command) {
			fs.readFile('/tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				axios.get(`${base_url}/SessionsPerStation?station=${command.station}?datefrom=${command.datefrom}?dateto=${command.dateto}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('SessionsPerStation failed: ', error);
					})
			})
		});

    program
		.command('SessionsPerEV')
		.requiredOption('--ev <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.action(function (command) {
			fs.readFile('/tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				axios.get(`${base_url}/SessionsPerEV?ev=${command.ev}?datefrom=${command.datefrom}?dateto=${command.dateto}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('SessionsPerEV failed: ', error);
					})
			})
		});

    program
		.command('SessionsPerProvider')
		.requiredOption('--provider <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.action(function (command) {
			fs.readFile('/tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				axios.get(`${base_url}/SessionsPerProvider?provider=${command.provider}?datefrom=${command.datefrom}?dateto=${command.dateto}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
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
		.command('Admin')
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
                    axios.post(`${base_url}/admin/usermod?username=${command.username}?password=${command.passw}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
                        .then(function (response) {
                            // handle success
                            console.log('Usermod success');
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
                    axios.get(`${base_url}/admin/users?username=${command.username}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
                        .then(function (response) {
                            // handle success
                            console.log(command.username);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log('{ status: \'error\' }');
                        })
                }
                else if(command.sessionsupd && command.source){
					axios.post(`${base_url}/admin/system/sessionsupd?source${command.source}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
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
					axios.get(`${base_url}/admin/healthcheck`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
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
					axios.post(`${base_url}/admin/resetsessions`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
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