// Create a new execution context for our library
;(function(global, $) {

  // 'new' an object
  var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  }

  // hidden within the scope of the IIFE and never directly accessible
  var supportedLangs = ['en', 'es'];

  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  var logMessages = {
    en: 'Logged in',
    es: 'Inicio sesion'
  };

  Greetr.prototype = {
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },

    validate: function() {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },

    greeting: function() {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },

    greet: function(formal) {
      var msg;

      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      // IE (likely old versions) don't have a console so we need to add a check here
      if (console) console.log(msg);

      // 'this' refers to the calling object at execution time.
      // Makes the method chainable
      return this;
    },

    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }

      return this;
    },

    setLang: function(lang) {
      this.language = lang;

      this.validate();

      return this;
    },

    HTMLGreeting: function(selector, formal) {
      if (!$) throw 'jQuery not loaded';

      if (!selector) throw 'Missing jQuery selector';

      var msg;

      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      $(selector).html(msg);

      return this;
    }
  };

  // Note: it's okay to set `Greetr.init` after `Greetr` because by the time `Greetr` will be called,
  // all the other code (eg `Greetr.init`) will be set up and run.

  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  Greetr.init = function(firstName, lastName, language) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.language = language || 'en';

    this.validate();
  }

  // any objects created with `Greetr.init` should point to `Greetr` as their prototype
  Greetr.init.prototype = Greetr.prototype;

  // expose the `Greetr` function to the global object
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
