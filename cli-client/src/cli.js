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
					fs.writeFile('./tmp/softeng20bAPI.token', JSON.stringify(response.data), function(err) {
						if(err) {
							return console.log('Writing token failed:', err);
						}
						console.log('Login successful. Token saved');
					});
				})
				.catch(function (error) {
					console.log('Login failed: ', error.response);
				});
		});
    
    program
		.command('logout')
		.action(function (command) {
			fs.readFile('./tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. You are already logged out', err);
				}
				const token = JSON.parse(data).token;
				axios.post(`${base_url}/logout`,
				{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						// handle success
						console.log('Log me out please', response);
						fs.unlink('.tmp/softeng20bAPI.token', function(err) {
							if(err) {
								return console.log('Removing token failed:', err);
							}
							console.log('Logout successful. Token removed');
						});
					})
					.catch(function (error) {
						// handle error
						console.log('Logout failed: ', error.response);
					})
			})
		});

    program
		.command('SessionsPerStation')
		.requiredOption('--station <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.action(function (command) {
			fs.readFile('./tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				var id = JSON.parse(data).id;
				axios.get(`${base_url}/SessionsPerStation/${command.datefrom}/${command.dateto}?id=${id}&station_id=${command.station}`,
				{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('SessionsPerStation failed: ', error.response.status, error.response.statusText);
					})
			})
		});

    program
		.command('SessionsPerEV')
		.requiredOption('--registration_plate <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.action(function (command) {
			fs.readFile('./tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				var id = JSON.parse(data).id;
				axios.get(`${base_url}/SessionsPerEV/${command.datefrom}/${command.dateto}?id=${id}&registration_plate=${command.registration_plate}`,
				{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('SessionsPerEV failed: ', error.response.status, error.response.statusText);
					})
			})
		});

    program
		.command('SessionsPerProvider')
		.requiredOption('--provider_id <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.action(function (command) {
			fs.readFile('./tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				var id = JSON.parse(data).id;
				axios.get(`${base_url}/SessionsPerProvider/${command.datefrom}/${command.dateto}?id=${id}&provider_id=${command.provider_id}`,
				{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('SessionsPerProvider failed: ', error.response.status, error.response.statusText);
					})
			})
		});

	program
		.command('Admin')
		.option('--username <value>', 'User\'s username')
        .option('--passw <value>', 'User\'s password')
		.option('--is_admin <letters>', 'User is admin')
		.option('--first_name <letters>', 'User\'s first name')
		.option('--last_name <letters>', 'User\'s last name')
		.option('--country <letters>', 'User\'s country')
		.option('--city <letters>', 'User\'s city')
		.option('--street <letters>', 'User\'s street')
		.option('--number <number>', 'User\'s street number')
		.option('--zip_code <number>', 'User\'s zip code')
		.option('--users')
		.option('--usermod')
		.option('--sessionsupd')
		.option('--source <value>')
		.option('--healthcheck')
        .option('--resetsessions')
		.action(function (command) {
			fs.readFile('./tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log('Token not found. Login first', err);
				}
				const token = JSON.parse(data).token;
				if (command.usermod && command.username && command.passw){
					console.log('I am in');
					axios.post(`${base_url}/admin/usermod/${command.username}/${command.passw}?is_admin=${command.is_admin}&first_name=${command.first_name}&last_name=${command.last_name}&country=${command.country}&city=${command.city}&street=${command.street}&number=${command.number}&zip_code=${command.zip_code}`,
					{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
                        .then(function (response) {
                            // handle success
                            console.log('Usermod success', response.data);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error.response.status, error.response.statusText);
                        })
                }
				else if(command.users && command.username){
                    axios.get(`${base_url}/admin/users/${command.username}`,
					{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })	
                        .then(function (response) {
                            // handle success
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error.data);
                        })
                }
                else if(command.sessionsupd && command.source){
					axios.post(`${base_url}/admin/system/sessionsupd?source=${command.source}`,
					{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log(error.data);
					})
				}
				else if(command.healthcheck){
					axios.get(`${base_url}/admin/healthcheck`,
					{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						// handle success
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log(error.data);
					})
				}
				else if(command.resetsessions){
					axios.post(`${base_url}/admin/resetsessions`,
					{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						// handle success
						console.log('Post okay:', command.resetsessions)
						console.log(response.data);
					})
					.catch(function (error) {
						// handle error
						console.log('Post NOT okay:', command.resetsessions)
						console.log(error.response);
					})
				}
				else{
					console.log('error: required options not specified');
				}
			})
		});
    
        program.parse(process.argv);
}