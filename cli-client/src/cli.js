process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const program = require('commander');
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const FormData = require('form-data');
const chalk = require('chalk');

const base_url = 'https://127.0.0.1:5000/evcharge/api'
const agent = new https.Agent({
    rejectUnauthorized: false, // (NOTE: this will disable client verification)
    cert: fs.readFileSync("src/cli.crt"),
    key: fs.readFileSync("src/cli.key"),
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
					fs.writeFile('tmp/softeng20bAPI.token', JSON.stringify(response.data), function(err) {
						if(err) {
							return console.log(chalk.red.bold.underline('Writing token failed: '), err);
						}
						console.log(chalk.green.bold('Login successful. Token saved'));
					});
				})
				.catch(function (error) {
					console.log(chalk.red.bold.underline('Login failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
				});
		});

	program
		.command('logout')
		.action(function (command) {
			fs.readFile('tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log(chalk.red.bold.underline('Token not found. You are already logged out!\n'), err);
				}
				const token = JSON.parse(data).token;
				axios({ method: 'POST', url: `${base_url}/logout`,
				httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						fs.unlink('tmp/softeng20bAPI.token', function(err) {
							if(err) {
								return console.log(chalk.red.bold.underline('Removing token failed: '), err);
							}
							console.log(chalk.green.bold('Logout successful. Token removed'));
						});
					})
					.catch(function (error) {
						console.log(chalk.red.bold.underline('Logout failed:'), error.response.data);
					})
			})
		});

    program
		.command('SessionsPerStation')
		.requiredOption('--station <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.option('--admin')
		.action(function (command) {
			fs.readFile('tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log(chalk.red.bold.underline('Token not found. Login first.\n'), err);
				}
				const token = JSON.parse(data).token;
				var id = JSON.parse(data).id;
				if(command.admin){
					id=-1;
				}
				axios.get(`${base_url}/SessionsPerStation/${command.datefrom}/${command.dateto}?id=${id}&station_id=${command.station}`,
				{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						console.log(response.data);
					})
					.catch(function (error) {
						console.log(chalk.red.bold.underline('SessionsPerStation failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
					})
			})
		});

    program
		.command('SessionsPerEV')
		.requiredOption('--ev <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.action(function (command) {
			fs.readFile('tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log(chalk.red.bold.underline('Token not found. Login first.\n'), err);
				}
				const token = JSON.parse(data).token;
				var id = JSON.parse(data).id;
				axios.get(`${base_url}/SessionsPerEV/${command.datefrom}/${command.dateto}?id=${id}&registration_plate=${command.ev}`,
				{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						console.log(response.data);
					})
					.catch(function (error) {
						console.log(chalk.red.bold.underline('SessionsPerEV failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
					})
			})
		});

    program
		.command('SessionsPerProvider')
		.requiredOption('--provider <value>')
		.requiredOption('--datefrom <value>')
        .requiredOption('--dateto <value>')
		.option('--admin')
		.action(function (command) {
			fs.readFile('tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log(chalk.red.bold.underline('Token not found. Login first.\n'), err);
				}
				const token = JSON.parse(data).token;
				var id = JSON.parse(data).id;
				if(command.admin){
					id=-1;
				}
				axios.get(`${base_url}/SessionsPerProvider/${command.datefrom}/${command.dateto}?id=${id}&provider_id=${command.provider}`,
				{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						console.log(response.data);
					})
					.catch(function (error) {
						console.log(chalk.red.bold.underline('SessionsPerProvider failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
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
			fs.readFile('tmp/softeng20bAPI.token', function(err, data) {
				if (err) {
					return console.log(chalk.red.bold.underline('Token not found. Login first.\n'), err);
				}
				const token = JSON.parse(data).token;

				if (command.usermod && command.username && command.passw && command.is_admin && command.first_name && command.last_name && command.country && command.city && command.street && command.number && command.zip_code){
					axios({ method: 'POST', url: `${base_url}/admin/usermod/${command.username}/${command.passw}?is_admin=${command.is_admin}&first_name=${command.first_name}&last_name=${command.last_name}&country=${command.country}&city=${command.city}&street=${command.street}&number=${command.number}&zip_code=${command.zip_code}`,
					httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
                        .then(function (response) {
                            console.log(response.data);
                        })
                        .catch(function (error) {
							console.log(chalk.red.bold.underline('Usermod failed:'), error.response.status, chalk.magenta.bold(error.response.statusText));
                        })
                }
				else if(command.users && command.username){
                    axios.get(`${base_url}/admin/users/${command.username}`,
					{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })	
                        .then(function (response) {
							if (response.data.error){
								console.log(chalk.red.bold.underline('There is no user with username:'), chalk.magenta.bold(command.username));
							}
							else{
								console.log(response.data);
							}
                        })
                        .catch(function (error) {
							console.log(chalk.red.bold.underline('Users failed:'), error.response.status, chalk.magenta.bold(chalk.magenta.bold(error.response.statusText)));
                        })
                }
                else if(command.sessionsupd && command.source){
					const formData = new FormData();
					formData.append('file', fs.createReadStream(command.source));
					axios({ method: 'POST', url: `${base_url}/admin/system/sessionsupd`, data: formData,
					httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}`, ...formData.getHeaders()}})
					.then(function (response) {
						console.log(response.data);
					})
					.catch(function (error) {
						console.log(chalk.red.bold.underline('Sessionsupd failed:'), error.response.status, chalk.magenta.bold(chalk.magenta.bold(error.response.statusText)));
					})
				}
				else if(command.healthcheck){
					axios.get(`${base_url}/admin/healthcheck`,
					{ httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						console.log(response.data);
					})
					.catch(function (error) {
						console.log(chalk.red.bold.underline('Health check failed:'), error.response.status, chalk.magenta.bold(chalk.magenta.bold(error.response.statusText)));
					})
				}
				else if(command.resetsessions){
					axios({ method: 'POST', url: `${base_url}/admin/resetsessions`,
					httpsAgent: agent, headers: { 'X-OBSERVATORY-AUTH': `${token}` } })
					.then(function (response) {
						console.log(response.data);
					})
					.catch(function (error) {
						console.log(chalk.red.bold.underline('Reset sessions failed:'), error.response.status, chalk.magenta.bold(chalk.magenta.bold(error.response.statusText)));
					})
				}
				else{
					console.log(chalk.red.bold.underline('Required options not specified'));
					console.log(chalk.magenta.bold("Type 'ev_group70 Admin --help' to see the options"));
				}
			})
		});
    
        program.parse(process.argv);
}