// gets a new object (the architecture allows us to not have to use the 'new' keyword here)
var g = G$('John', 'Doe');

g.greet().setLang('es').greet(true).log();

$('#login').click(function() {
  // create a new 'Greetr' object (let's pretend we know the name from the login)
  var loginGrtr = G$('John', 'Doe');

  $('#logindiv').hide();

  loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});
