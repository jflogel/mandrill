angular.module('mandrill-app', ['btford.socket-io'])
  .factory('webSockets', function(socketFactory) { return socketFactory(); })
  .controller('MandrillCtrl', ['$http', 'webSockets', MandrillController]) ;

function MandrillController($http, webSockets) {
  var self = this;
  self.toAddress = "dummy@some.domain";
  self.messages = [];

  this.sendEmail = function() {
    $http.post('/api/sendEmail', {
      toAddress: self.toAddress
    });
  };

  webSockets.on('message', function(msg) {
    self.messages.unshift(msg);
  });
}
