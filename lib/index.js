const { Telegraf } = require('telegraf');

class Bot {

    constructor() {
    }

    async _connect(token) {
        this.bot = new Telegraf(token);
        this.bot.launch()
        // this part has to be done because .launch() 
        //only returns when the bot closes not when it connects, 
        //the developers have said they are unsure what to do here so it's currently pending.  
        let botInfo     
        try {
            botInfo  = await this.bot.telegram.getMe();
            return true
        } catch (error) {
            console.error('Error getting bot information:', error);
            return false
        }

        //this.bot.launch();
    }
    
    // Function to send a message
    async sendMessage(chatId, message) {
        try {
            await this.bot.telegram.sendMessage(chatId, message);
            console.log(`Message sent to ${chatId}: ${message}`);
        } catch (error) {
            console.error(`Error sending message to ${chatId}: ${error}`);
        }
    }

    async sendMessageToUsers(users,message) {
        try {
            // Iterate over each admin and send the message
            for (const user of users) {
                await this.sendMessage(user,message);
            }
        } catch (error) {
            console.error(`Error sending message to admins: ${error}`);
        }
    }

}

async function createBot(token)
{
    bot = new Bot()
    let result = await bot._connect(token)
    if(result)
    {
        return bot
    }
    else
    {
        return null
    }
}

module.exports = {createBot} ; // Export the Bot class as an object
