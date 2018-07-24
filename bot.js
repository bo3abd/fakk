const Discord = require('discord.js');// npm i discord.js --save
const fs = require("fs")// npm i fs
const client = new Discord.Client();

client.on('ready', () => {
  console.log('----------------');
  console.log('By _i3bood');
  console.log('----------------');
  console.log(`Logged in as `);
  client.user.setGame(``, "http://twitch.tv/Streammingg")
  client.user.setStatus("dnd")
})


let points = {}
var prefix = "%";

client.on('message', message => {
if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
  };
if (message.content.startsWith(prefix + 'فكك')) {
    if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));

const type = require('./fkk/fkk.json');
const item = type[Math.floor(Math.random() * type.length)];
const filter = response => {
    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
message.channel.send('**لديك 15 ثانيه لتفكيك الكلمه**').then(msg => {

            
msg.channel.send(`${item.type}`).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
        message.channel.send(`${collected.first().author} ✅ **مبروك لقد كسبت نقطه
لمعرفة نقطاك الرجاء كتابة %نقاطي**`);
        console.log(`[Typing] ${collected.first().author} typed the word.`);
            let userData = points[message.author.id];
            userData.points++;
          })
          .catch(collected => {
            message.channel.send(`:x: **خطأ حاول مرة اخرى**`);
            console.log('[Typing] Error: No one type the word.');
          })
        })
    })
}
});
client.on('message', message => {
if (message.content.startsWith(prefix + 'نقاطي')) {
    if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));
    let userData = points[message.author.id];
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setColor('#000000')
    .setDescription(`نقاطك: \`${userData.points}\``)
    message.channel.sendEmbed(embed)
  }

  
});




client.login(process.env.BOT_TOKEN);
