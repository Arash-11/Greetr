// Create a new execution context for our library to be "safe" on the global window
(function(global, $) {

  var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  }

  Greetr.prototype = {};

  // Note: it's okay to set `Greetr.init` after `Greetr` because by the time `Greetr` will be called,
  // all the other code (eg `Greetr.init`) will be set up and run.
  Greetr.init = function(firstName, lastName, language) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.language = language || 'en';
  }

  // any objects created with `Greetr.init` should point to `Greetr` as their prototype
  Greetr.init.prototype = Greetr.prototype;

  // expose the `Greetr` function to the global object
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
