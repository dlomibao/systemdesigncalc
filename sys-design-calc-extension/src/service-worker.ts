// Listen for tab updates


console.log("background script running")
// var port=chrome.runtime.connect({name:"background-script"});
//
// port.onMessage.addListener((message,sender)=>{
//   console.log("message: "+JSON.stringify(message))
//   console.log("sender:"+JSON.stringify(sender))
// })
// chrome.runtime.onMessage.addListener((message,sender)=>{
//   console.log(JSON.stringify(message))
//   if(message['messageType']=='accessToken'){
//
//
//   }
// })
chrome.runtime.onMessage.addListener(async function (request, sender) {
    console.log(JSON.stringify(request))
    if(request.action=="OPEN"){
        console.log(sender.tab?.id)
    }
})
// chrome.action.onClicked.addListener(() => {
//   var userSelection = document.getSelection().toString(); //cause window is not available using V3 manifest
//   alert(userSelection);
// });
//
// function getSelectedText() {
//   var text = "";
//   if (window.getSelection) {
//     text = window.getSelection().toString();
//   } else if (document.selection && document.selection.type != "Control") {
//     text = document.selection.createRange().text;
//   }
//   return text;
// }
chrome.action.onClicked.addListener((tab) => {
    // @ts-ignore
    chrome.scripting.executeScript({
        //@ts-ignore
        target: {tabId: tab.id},
        function: () => {
            console.log("tab on clicked")
            // @ts-ignore
            alert(getSelection().toString());
        }
    });
});

//let communicator=new Communicator("background")
// function generateTable(values: any) {
//   const tableElement = document.createElement("table");
//   tableElement.style.position = "fixed";
//   tableElement.style.top = "0";
//   tableElement.style.left = "0";
//   tableElement.style.backgroundColor = "yellow";
//   tableElement.style.padding = "10px";
//   tableElement.style.zIndex = "9999";
//   tableElement.style.borderCollapse = "collapse";
//
//   const headerRow = document.createElement("tr");
//   const nameHeader = document.createElement("th");
//   nameHeader.textContent = "Name";
//   const valueHeader = document.createElement("th");
//   valueHeader.textContent = "Value";
//   const copyHeader = document.createElement("th");
//   copyHeader.textContent = "Copy";
//
//   headerRow.appendChild(nameHeader);
//   headerRow.appendChild(valueHeader);
//   headerRow.appendChild(copyHeader);
//   tableElement.appendChild(headerRow);
//
//   const addRow = (name: any, value: any) => {
//     const row = document.createElement("tr");
//     const nameCell = document.createElement("td");
//     nameCell.textContent = name;
//     const valueCell = document.createElement("td");
//     valueCell.textContent = value;
//     const copyCell = document.createElement("td");
//     const copyButton = document.createElement("button");
//     copyButton.classList.add("copy-button");
//     copyButton.textContent = "Copy";
//     copyButton.addEventListener("click", () => {
//       navigator.clipboard.writeText(value)
//         .then(() => {
//           console.log(`Copied: ${value}`);
//         })
//         .catch((error) => {
//           console.error("Copy failed:", error);
//         });
//     });
//     copyCell.appendChild(copyButton);
//
//     row.appendChild(nameCell);
//     row.appendChild(valueCell);
//     row.appendChild(copyCell);
//     tableElement.appendChild(row);
//   };
//
//   addRow("Name:", values.name);
//   addRow("Password:", values.password);
//   addRow("Dealer Code:", values.dealerCode);
//
//   return tableElement;
// }


// chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
//   console.log("Tab ID: " + tabId);
//   const activeTabUrl = new URL(tab.url || '')
//   if (changeInfo.status === 'complete') {
//     try {
//       // Fetch local storage data from the target tab
//       const fetchLocalStorageData = async function(tabId: any) {
//         const result = await chrome.scripting.executeScript({
//           target: { tabId: tabId },
//           func: () => {
//             return JSON.stringify(localStorage);
//           },
//         });
//
//         if (!result || result.length === 0 || !result[0].result) {
//           throw new Error('Failed to fetch local storage data.');
//         }
//
//         const localStorageData = JSON.parse(result[0].result);
//         console.log('Local storage data:', localStorageData);
//         return localStorageData;
//       };
//
//       // Find the tab with the specified URL
//       const tabs = await chrome.tabs.query({ url: 'http://localhost:3000/payload.html' });
//       if (tabs.length > 0) {
//         const targetTab = tabs[0];
//         const contactCenterPayload = await fetchLocalStorageData(targetTab.id);
//         console.log('Retrieved payload:', contactCenterPayload);
//         const payload = JSON.parse(contactCenterPayload.payload);
//         if (payload) {
//           const matchingEntry = payload.find((entry: any) => {
//             const { urlPattern } = entry;
//             const { hostname, pathname } = urlPattern;
//
//             const hostnameRegex = new RegExp('^' + hostname.replace(/\*/g, '[^/]*') + '$');
//             const pathnameRegex = new RegExp('^' + pathname.replace(/\*/g, '.*') + '$');
//
//             const hostnameMatch = hostnameRegex.test(activeTabUrl.hostname);
//             const pathnameMatch = pathnameRegex.test(activeTabUrl.pathname);
//
//             return hostnameMatch && pathnameMatch;
//           });
//
//           console.log("matchingEntry:: " + JSON.stringify(matchingEntry));
//
//           if (matchingEntry) {
//             const { selectors, values } = matchingEntry;
//
//             function injectLoginScript(selectors: any, values: any) {
//               console.log("Injected login script.");
//               if (selectors && values) {
//                 const { userInput, passwordInput, dealerNumberInput } = selectors;
//                 const { user, password, dealerNumber } = values;
//
//                 if (userInput) {
//                   const userInputField = document.querySelector(userInput);
//                   if (userInputField) {
//                     userInputField.value = user;
//                   }
//                 }
//
//                 if (passwordInput) {
//                   const passwordInputField = document.querySelector(passwordInput);
//                   if (passwordInputField) {
//                     passwordInputField.value = password;
//                   }
//                 }
//
//                 if (dealerNumberInput) {
//                   const dealerNumberInputField = document.querySelector(dealerNumberInput);
//                   if (dealerNumberInputField) {
//                     dealerNumberInputField.value = dealerNumber;
//                   }
//                 }
//
//                 console.log("Form fields populated with the provided values.");
//                 // Create the table and append it to the body
//                 const table = generateTable({
//                   name: user,
//                   password: password,
//                   dealerCode: dealerNumber,
//                 });
//                 document.body.prepend(table);
//               } else {
//                 console.log("No selectors or values provided.");
//               }
//             }
//
//             chrome.scripting.executeScript({
//               target: { tabId: tab.id as number},
//               func: injectLoginScript,
//               args: [selectors, values],
//             });
//
//           } else {
//             console.log("No matching URL pattern found for the tab with ID:", targetTab.id);
//           }
//         } else {
//           console.log("Please open the contact center pop page.");
//         }
//       } else {
//         console.log('Tab not found.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
// });
