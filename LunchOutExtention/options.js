// Saves options to chrome.storage
function save_options() {
  var serverUrl = document.getElementById('serverUrl').value;
  chrome.storage.sync.set({
    serverUrl: serverUrl
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value serverUrl= http://localhost:3080
  chrome.storage.sync.get({
    serverUrl: 'http://stlnode.esri.com:3080'
  }, function(items) {
    document.getElementById('serverUrl').value = items.serverUrl;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);