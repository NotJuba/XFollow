let isRunning = false;

function refreshActiveTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            chrome.tabs.reload(tabs[0].id);
        }
    });
}

function getTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            const tabId = tabs[0].id;
            callback(tabId);
        } else {
            console.error("Unable to get current tab.");
        }
    });
}



function addProfiles(tabId, numbers ,speed) {
  chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: (numbers,speed) => {
        let i = 1; // Initialize button index counter
        let interval = setInterval(function() { // Set interval for button clicks

        let followXpath = `/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/section/div/div/div[${i}]/div/div/div/div/div[2]/div[1]/div[2]/div/div/span`

        let followButton = document.evaluate(followXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

          if (followButton && followButton.innerText === "Follow") {

            followButton.click(); // Click on each profile  button
            console.log(`Clicked gmail ${i} times `);
            i++;
            } else {
            console.log("Didn't find follow button");
            i++;
          }
          if ( i > numbers ) {
            clearInterval(interval); // Stop after 400 clicks
          }
        }, speed * 1000); 
      },
      args: [numbers, speed]
  });
  isRunning = true;
}


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  var action = msg.action;
  var format = msg.format;
  var speed = msg.speed;
  var numbers = msg.numbers;

  if (msg.action=== 'start' ) {
    if (msg.format=== "follow") {
        getTabId((tabId) => {
            addProfiles(tabId, msg.numbers , msg.speed); 
    })} else if (msg.format==="like"){
      console.log("ok it kinda woked")
      chrome.notifications.create({
      type: 'basic',
      iconUrl: 'photo.png',
      title: 'Sorry bro',
      message : 'Like feature is not ready yet'

    })} else if (msg.format==="comment") {
      chrome.notifications.create({
      type: 'basic',
      iconUrl: 'photo.png',
      title: 'Sorry bro',
      message : 'Comment feature is not ready yet'
    
    })} else if (msg.format==="message") {
      chrome.notifications.create({
      type: 'basic',
      iconUrl: 'photo.png',
      title: 'Sorry bro',
      message : 'Message feature is not ready yet'

      })}
    } else if (msg.action === "stop") { 
      console.log("youre's stying to stop  it aren't you");
      refreshActiveTab();
    isRunning = false;
    } 

    }
);

