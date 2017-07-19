const express = require('express');
const hbs =  require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
	response.render('suspend.hbs');
});

app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
	var now = new Date().toString();
	var log = `${now} ${request.method} ${request.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log("Error to append log to server.log");
			console.log(err);
		}
	});
	next();
});

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (arg) => {
	return arg.toUpperCase();
});

app.get('/', (request, response) => {
	response.render('home.hbs', {
		pageTitle: 'Home',
		author: 'Gabriel Soares'
	});
});

app.get('/bad', (request, response) => {
	response.send({
		code: 404,
		message: 'This request could not be done'
	});
});

app.get('/help', (request, response) => {
	response.send('Foda-se');
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle: 'About Page',
		author: 'Gabriel Soares'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
