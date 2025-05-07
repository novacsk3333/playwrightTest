// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1'
//initializing variables
var ctr = 1;
var time1 = Date.now() // getting current unix timestamp
var time2 = "";
var i = 0;
const regex = /\s(.*)/; // regex that grabs the unix timestamp after the first space
const { count } = require("console");
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  var page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // Setting locator to grab times stamp and sets it to parent
  var timeStamp = await page.locator('xpath=//span[@class="age"]');

while(ctr < 101){
  // on the last article on the page click the more button and go to the next page.
  if(ctr % 30 == 0){
    await page.locator('xpath=//a[@class="morelink"]').click();
    //Reset the page locator with the new data from the new page
    timeStamp =  page.locator('xpath=//span[@class="age"]');
    i = 0; // resetting variable for loop of each element
  }
   time2 = (await timeStamp.nth(i).getAttribute("title"));
   console.log(time2);
   time2 = time2.match(regex)[1];
   if(time1 > time2){
    time1 = time2;
   console.log("Valid Timestamp Test Number: " + ctr);
   ctr = ctr + 1;
   i = i + 1;
   }
   // breaking the loop if timestamp not sorted properly. 
   else{
    console.log("break");
    break;
   }

}
console.log(ctr-1);
page.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
