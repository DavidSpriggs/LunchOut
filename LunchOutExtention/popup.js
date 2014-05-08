var orders = {
  ordersServer: '',
  getOrderList: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.ordersServer + '/orders/list', true);
    req.onload = this.getOrderListComplete.bind(this);
    req.send(null);
  },
  getOrderListComplete: function(e) {
    if (e.target.readyState == 4) {
      var resp = JSON.parse(e.target.responseText);
      var ordersNode = document.getElementById('orders');

      if (resp.orders.length > 0) {
        resp.orders.forEach(function(order) {
          var div = document.createElement('div');
          div.id = 'order:' + order._id;
          div.appendChild(document.createTextNode(order.name));
          div.appendChild(document.createTextNode(' @ '));
          div.appendChild(document.createTextNode(order.place));
          div.appendChild(document.createTextNode(' @ '));
          div.appendChild(document.createTextNode(order.time));
          div.appendChild(document.createTextNode('  '));
          var btn = document.createElement('button');
          btn.innerHTML = 'Remove';
          btn.id = order._id;
          btn.onclick = this.removeOrder.bind(this);
          div.appendChild(btn);
          ordersNode.appendChild(div);
        }, this);
      } else {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode('Nothing yet today. Sign up to start the trend!'));
        ordersNode.appendChild(div);
      }
    }
  },
  removeOrder: function(e) {
    var req = new XMLHttpRequest();
    req.open("GET", this.ordersServer + '/orders/remove/' + e.target.id, true);
    req.onload = this.removeOrderComplete.bind(this);
    req.send(null);
  },
  removeOrderComplete: function(e) {
    if (e.target.readyState == 4) {
      var resp = JSON.parse(e.target.responseText);
      this.reloadOrders();
    }
  },
  signUp: function() {
    var signUpName = document.getElementById('signUpName');
    var signUpPlace = document.getElementById('signUpPlace');
    var signUpTime = document.getElementById('signUpTime');
    if (signUpName.value && signUpTime.value) {
      var params = '?name=' + encodeURIComponent(signUpName.value) + '&place=' + encodeURIComponent(signUpPlace.value) + '&time=' + encodeURIComponent(signUpTime.value);
      var req = new XMLHttpRequest();
      req.open("GET", this.ordersServer + '/orders/add' + params, true);
      req.onload = this.signUpComplete.bind(this);
      req.send(null);
    }
  },
  signUpComplete: function(e) {
    if (e.target.readyState == 4) {
      var resp = JSON.parse(e.target.responseText);
      if (resp.success) {
        document.getElementById('signUpName').value = '';
        document.getElementById('signUpPlace').value = '';
        document.getElementById('signUpTime').value = '';
        this.reloadOrders();
      }
    }
  },
  reloadOrders: function() {
    var ordersNode = document.getElementById('orders');
    while (ordersNode.firstChild) {
      ordersNode.removeChild(ordersNode.firstChild);
    }
    this.getOrderList();
  }
};

chrome.storage.sync.get({
  serverUrl: 'http://localhost:3080'
}, function(items) {
  orders.ordersServer = items.serverUrl;
  orders.getOrderList();
});

// Run our order generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('signUpBTN').onclick = orders.signUp.bind(orders);
});