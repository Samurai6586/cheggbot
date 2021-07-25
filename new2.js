const Discord = require('discord.js');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const https = require('https');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const randomUseragent = require('user-agents');
const { TIMEOUT } = require('dns');
const client = new Discord.Client();




global.username = 'Chegg email here'
global.password = 'chegg pass here'
global.discordlogin = 'discord bot token here'

var queue = false;


puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: '2captcha api key here',
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
                .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
                .setTimestamp()
                .setFooter('Powered by Samurai x Ninja');
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
                .setTitle('Proccessing Request')
                .setDescription('Your request is being processed!')
                .setTimestamp()
                .setFooter('Powered by Samurai x Ninja');
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
                <center><strong>Powered by Ninja x Samurai </strong> 
                </div><div class="content"><h1><strong>Question:</strong></h1><br><p>${inner_html}</p><hr><h1><strong>Answer:</strong></h1><br><p>${inner_html2}</p> </body></div> </html>`;

            await fs.writeFile("answer.html",html_content, function(err) { 

            });

            message.author.send("HTML ANSWER:", {
                files: ['./answer.html']
            }) 
            const successEmbed = new Discord.MessageEmbed()
                .setColor('#00F800')
                .setTitle('Success!')
                .setDescription('Your request has been processed, check your DMs!')
                .setThumbnail('https://media.giphy.com/media/tf9jjMcO77YzV4YPwE/giphy.gif')
                .setTimestamp()
                .setFooter('Powered by Samurai x Ninja');
            message.channel.send(message.author.toString(), {
                embed: successEmbed
            });

            queue = false;}
            else {
                const successEmbed = new Discord.MessageEmbed()
                .setColor('#00F800')
                .setTitle('Error!')
                .setDescription('An Error Has Occured! Question may be unanswered or the account is banned.')
                .setTimestamp()
                .setFooter('Powered by Samurai x Ninja');
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
                .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
                .setTimestamp()
                .setFooter('Powered by Samurai x Ninja');
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
        token: '2captcha api key here', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  )
  client.login(discordlogin);
  async function login_chegg() {
  
    global.browser = await puppeteer.launch({
        headless: false,
        slowMo: 10,
        userDataDir: 'C:\\userData',
       
        
    });
      const page = await browser.newPage()
     
      console.log("Going to Chegg");
      await page.goto('https://www.chegg.com/writing/login/?redirect=https://www.chegg.com/writing/', {"waitUntil" : "networkidle2"})
      console.log("Solving Captcha...");
      await page.solveRecaptchas()
      console.log("Done!");
      global.page = await browser.pages();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0');
      //var userAgent = require('user-agents');
     // await page.setUserAgent(userAgent.toString());
      await page.waitForSelector('#emailForSignIn');
      console.log("Logging in");
      await page.type('#emailForSignIn', username, {
          delay: 100
      });
      await page.type('#passwordForSignIn', password, {
          delay: 100
      });
      await page.click('button.login-button.button.flat'); 
      console.log("Ready!");
  }
  