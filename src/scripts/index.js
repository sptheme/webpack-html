require('../styles/theme.css');
var messages = require('./messages');

var app = document.getElementById('app');
app.innerHTML = '<p>' + messages.hi + ' ' + messages.event + '</p>';

var $ = require('jquery');

$(function() {
  console.log('Webpack 2.0 Ready!');
});

if (DEVELOPMENT) {
	if (module.hot) {
		module.hot.accept();
	}
}
