angular.module('mandrill-app', [])
  .controller('MandrillCtrl', ['$http', MandrillController]);

function MandrillController($http) {
  var self = this;
  self.toAddress = "dummy@some.domain";

  this.sendEmail = function() {
    $http.post('/api/sendEmail', {
      toAddress: self.toAddress
    });
  };

  this.refresh = function() {
    $http.get('/api/messages')
      .success(function(data) {
        self.messages = data.messages;
      });
  };
}
