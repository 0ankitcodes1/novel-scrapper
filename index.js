/* ========================================================================== */
/* Scraping Light Novel By Chapter And Saving Content In .txt File
/* ========================================================================== */

// Adding puppeteer
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
      
      const novelName = "Grandson of the Holy Emperor is a Necromancer Chapter 1 to 100";
      const starting = 1;
      const totalChapter = 100;

      for (let i = starting; i <= totalChapter; i++) {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
      
            await page.goto(`https://www.lightnovelpub.com/novel/grandson-of-the-holy-emperor-is-a-necromancer/1270-chapter-${i}`);
      
            const grabBody = await page.$eval('div', (el) => el.innerText);
      
            const newChapter = `Chapter-${i}`+"\n\n"+grabBody+"\n\n";
      
            fs.appendFile(`${novelName}.txt`, newChapter, (err) => {
                  if(err) throw console.log(`Error While Saving Chapter-${i}. Please Check If It Was Saved Correctly`);;
                  console.log(`Chapter-${i} Successfullay Saved`);
            });
      
            await browser.close();     
      }
})();
