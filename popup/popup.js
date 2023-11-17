console.log("hey from the popup")

document.getElementById('btnStart').addEventListener('click', function() {
   var format = document.getElementById('format').value;
   var speed = document.getElementById('in1').value || 1; // Use default value if not entered
   var numbers = document.getElementById('in2').value || 1; // Use default value if not entered

   chrome.runtime.sendMessage({
       action: 'start',
       format: format,
       speed: speed,
       numbers: numbers,
   });
});

document.getElementById('btnStop').addEventListener('click', function() {
   chrome.runtime.sendMessage({ action: 'stop' });
});