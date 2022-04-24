const Discord = require('discord.js');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const https = require('https');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const randomUseragent = require('user-agents');
const { TIMEOUT } = require('dns');
const client = new Discord.Client();




global.username = 'yomama6465@gmail.com'
global.password = 'Karlita13/'
global.discordlogin = 'OTAyNDA4ODM5OTM1MTY4NTEy.YXd_uQ.mbtJ4qIQTpWsHIdChj4splJJTi8'

var queue = false;


puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'e2a4ac24f89fc231b87c264fdd03349d',
      },
      visualFeedback: true, 
    })
  )
puppeteer.use(StealthPlugin())

const download = (url, destination) => new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https.get(url, response => {
        response.pipe(file);

        file.on('finish', () => {
            file.close(resolve(true));
        });
    }).on('error', error => {
        fs.unlink(destination);

        reject(error.message);
    });
});

client.on('ready', () => {
    login_chegg('global.username','global.password')
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    
    
    if (message.channel.type == "dm")
     return;
    async function solveQA_Captcha(){
        queue=true;
        await page[0].solveRecaptchas()
        console.log("PerimeterX Recaptcha Solved!");
        queue=false;
        }
    
    if (message.content==='!r') {
        solveQA_Captcha()
        return
    
    }
    if (message.content==='!s') {
        screenshotpage()
    }
    async function screenshotpage(){
        queue=true;
        const page = await browser.pages();
        let screenshot = await page[0].screenshot({fullPage: true }); 
        message.channel.send("Screenshot", {files: [screenshot]});
        console.log("screenshotting page");
      
        queue=false;
        }
    const re = /(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?|$/;
    var match = re.exec(message.content);
    var urlregex=match[0]
    if (urlregex!=='') {
        if (!urlregex.startsWith('https://www.chegg.com/homework-help/questions-and-answers/')){
            return
        }
        if (queue===true) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#C91019')
                .setTitle('Error')
                .setDescription('Wait for your turn!')
                .setThumbnail('https://i.pinimg.com/originals/52/7b/a5/527ba5513a72f1d28fa780a14d6511fd.gif')
                .setTimestamp()
                .setFooter('Ninja x Samurai ');
            message.channel.send(message.author.toString(), {
                embed: errorEmbed
            });
            
            
    
            return;
            
        }

        
		
        process_answer(urlregex)
		
        async function process_answer(url) {
            queue = true;
            const processEmbed = new Discord.MessageEmbed()
                .setColor('#F85B00')
                .setTitle('Fetching your answer...')
                .setDescription('Please wait while we process your question!')
                .setThumbnail('https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif')
                .setTimestamp()
                .setFooter('Ninja x Samurai');
            var msg = message.channel.send(message.author.toString(), {
                embed: processEmbed})
           
            await page[0].goto(url,   {waitUntil: 'domcontentloaded'});
            //await page[0].goto(url);
            
            //await page.waitForSelector('.answer-given-body.ugc-base');
            //await page[0].waitForFunction('document.querySelector(".answer-given-body.ugc-base")');



            /*const images = await page[0].evaluate(() => Array.from(document.images, e => e.src));
            let result;
            var question = false;*/
           /*for (let i = 0; i < images.length; i++) {
                if (images[i].includes('media.cheggcdn.com')) {
                    result = await download(images[i], `image-${i}.png`);

                    if (result === true) {
                        if (!question) {
                            message.author.send("INDIVIDUAL IMAGES:", {
                                files: [images[i]]
                            })
                            question = true;
                        } else {
                            message.author.send({
                                files: [images[i]]
                            })
                        }
                        console.log('Success:', images[i], 'has been downloaded successfully.');
                    } else {
                        console.log('Error:', images[i], 'was not downloaded.');
                        console.error(result);
                    }
                }
            }*/
            if ((await page[0].$('.answer-given-body.ugc-base')) !== null){
            const element = await page[0].$('.question-body-text');
            element_property = await element.getProperty('innerHTML');
            const inner_html = await element_property.jsonValue();

            const element2 = await page[0].$('.answer-given-body.ugc-base');
            element_property2 = await element2.getProperty('innerHTML');
            const inner_html2 = await element_property2.jsonValue();
            const inner_html2_modified=inner_html2.replace("\"//d2vlcm61l7u1fs", "\"http://d2vlcm61l7u1fs")
            const inner_html_modified=inner_html.replace("\"//d2vlcm61l7u1fs", "\"http://d2vlcm61l7u1fs")
            
            var html_content = `<html><head><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"/>"
              <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
              <meta name=viewport content="width=device-width, initial-scale=1, user-scalable=yes">
              <link rel="preconnect" href="https://fonts.gstatic.com">
              <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

             <style>
              .container {
                font-family: 'Poppins', sans-serif; 
                        }

              
              a{
                color:blue;
                }
        
              .content {
                width: 100%;
              margin: auto;
              background: white;
              padding: 10px;
                       }
              table{
              text-align: center;
                     }
              
              img{
              max-width: 100%;
                }
              body {background-color: LightGray;
                overflow: scroll;}
                  h1   {
              font-size:40px;
                    }
                  
                </style>
              
                </head><body><div class="container"><div class="alert alert-info" role="alert">
                <center><strong>Ninja x Samurai </strong> 
                </div><div class="content"><h1><strong>Question:</strong></h1><br><p>${inner_html_modified}</p><hr><h1><strong>Answer:</strong></h1><br><p>${inner_html2_modified}</p> </body></div> </html>`;

            await fs.writeFile("answer.html",html_content, function(err) { 

            });

            message.author.send("**Please download the .html file below to get your answer.**", {
                files: ['./answer.html']
            }) 
            const successEmbed = new Discord.MessageEmbed()
                .setColor('#00F800')
                .setTitle('Success!')
                .setDescription('Your request has been processed, check your DMs!')
                .setThumbnail('https://i.pinimg.com/originals/70/a5/52/70a552e8e955049c8587b2d7606cd6a6.gif')
                .setTimestamp()
                .setFooter('Ninja x Samurai');
            message.channel.send(message.author.toString(), {
                embed: successEmbed
            });

            queue = false;}
            else {
                const successEmbed = new Discord.MessageEmbed()
                .setColor('#00F800')
                .setTitle('Error!')
                .setDescription('An Error Has Occured! Question may be unanswered or the account is banned.')
                .setThumbnail('https://i.pinimg.com/originals/52/7b/a5/527ba5513a72f1d28fa780a14d6511fd.gif')
                .setTimestamp()
                .setFooter('Ninja x Samurai');
            message.channel.send(message.author.toString(), {
                embed: successEmbed
            });
            queue=false;
            }
        }
    }
    else{
       return;
    }

})

client.on('message', message => {

    if (message.content==='!c') {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#C91019')
                .setTitle('Cleared')
                .setDescription('Queue Cleared!')
                .setThumbnail('https://i.pinimg.com/originals/70/a5/52/70a552e8e955049c8587b2d7606cd6a6.gif')
                .setTimestamp()
                .setFooter('Ninja x Samurai');
            message.channel.send(message.author.toString(), {
                embed: errorEmbed
            });
            
        queue=false; 
    }
    
})




    
    



puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: 'e2a4ac24f89fc231b87c264fdd03349d', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  )
  client.login(discordlogin);
  async function login_chegg() {
  
      global.browser = await puppeteer.launch({
          headless:false,
          slowMo: 10,
          
      });
      const page = await browser.newPage()
      console.log("Authenticating Proxies...");
      await page.authenticate({
        username: 'xsqxcrhf-rotate',
        password: '374t2yg2ahkd',
        });
      console.log("Proxies Authenticated!");
      
      console.log("Going to Chegg");
      await page.goto('https://www.chegg.com/auth?type=simplifiedstudy&action=signup&data=$14.95&redirect=/cspofferinterstitial/ib', {"waitUntil" : "networkidle2"})
      console.log("Solving Captcha...");
      await page.solveRecaptchas()
      console.log("Done!");
      global.page = await browser.pages();
      //await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0');
      //var userAgent = require('user-agents');
     // await page.setUserAgent(userAgent.toString());
      await page.waitForSelector('#emailForSignIn');
      console.log("Logging in");
      await page.click('span.sign-in.active-link');
      await page.type('#emailForSignIn', username, {
          delay: 100
      });
      await page.type('#passwordForSignIn', password, {
          delay: 100
      });
      await page.click('button.login-button.button.flat');
      console.log("Solving Captcha...");
      await page.solveRecaptchas()
      await page.goto('https://www.chegg.com/auth?type=simplifiedstudy&action=signup&data=$14.95&redirect=/cspofferinterstitial/ib', {"waitUntil" : "networkidle2"})
      console.log("Solving Captcha...");
      await page.solveRecaptchas()
      console.log("Done!");
      global.page = await browser.pages();
      //await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0');
      //var userAgent = require('user-agents');
     // await page.setUserAgent(userAgent.toString());
      await page.waitForSelector('#emailForSignIn');
      console.log("Logging in");
      await page.click('span.sign-in.active-link');
      await page.type('#emailForSignIn', username, {
          delay: 100
      });
      await page.type('#passwordForSignIn', password, {
          delay: 100
      });
      await page.click('button.login-button.button.flat');
      console.log("Solving Captcha...");
      await page.solveRecaptchas()
      
      console.log("Ready for Code");

      console.log("Ready!");
  }
  