/*

Botkit Studio Skill module to enhance the "check" script

*/

module.exports = function(controller) {
  controller.hears(['check', 'search', 'kalori', 'find', 'look up', 'lookup', 'What\'s this food'], 'direct_message,direct_mention', function(bot, message) {

    bot.startConversation(message, function(err, convo) {

      convo.ask('What food do you want to check out?', function(response, convo) {
        if (message.user == bot.identity.id) {
          return false;
        }
        
        const WolframAlphaAPI = require('wolfram-alpha-api');
        const waApi = WolframAlphaAPI('8YXGWJ-UL3V4W58PP');

        bot.reply(message, "calculating...");

        waApi.getFull({
          input: response.text + ' nutrition facts',
          appid: '8YXGWJ-UL3V4W58PP',
        })
        .then((queryresult) => {
          if (queryresult.success == true) {
            bot.reply(message,{files:[queryresult.pods[1].subpods[0].img.src]});
            return false;
          } else {
            bot.reply(message, 'sorry, we could not find it :(');
            return false;
          }
        })
        .catch(console.error)
        
        convo.next();

     });
  });
  });
}
