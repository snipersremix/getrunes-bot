const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

var totalSeconds = 0;
var hour = 0;
var minute = 0;
var seconds = 0;
var currentchan; // last channel in which a user typed /start

function timerVar() { setInterval(countTimer, 1000); }
function countTimer() {
   ++totalSeconds;
   hour = Math.floor(totalSeconds /3600);
   minute = Math.floor((totalSeconds - hour*3600)/60);
   seconds = totalSeconds - (hour*3600 + minute*60);
    }

function alertRunes(currentchan) {
  if (((totalSeconds % 10) === 0) && totalSeconds > 1) {
    currentchan.join() //TODO fix this part
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('Get runes! ' + hour + ":" + minute + ":" + seconds);
          connection.playArbitraryInput('gorgc_pesant_work.mp3');
          console.log(totalSeconds);
          // console.log(currentchan)
          })
    }
}

client.login(config.token);

client.on('message', message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore itmessage.member.voiceChannel;
  if (!message.guild) return;

  // if (message.content === '/join') {
  //   // Only try to join the sender's voice channel if they are in one themselves
  //   if (message.member.voiceChannel) {
  //     message.member.voiceChannel.join()
  //       .then(connection => { //w Connection is an instance of VoiceConnection
  //         message.reply('I have successfully connected to the channel!');
  //         connection.playArbitraryInput('gorgc_pesant_work.mp3');
  //       })
  //       .catch(console.log);
  //   } else {
  //     message.reply('You need to join a voice channel first!');
  //   }
  // }
  if (message.content === '/start') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('I have successfully connected to the channel and started the timer! ' + hour + ":" + minute + ":" + seconds);
          connection.playArbitraryInput('gorgc_pesant_work.mp3');
          timerVar();
          currentchan = message.member.voiceChannel;
          client.setInterval(alertRunes,1000,currentchan);
          })
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
  if (message.content === '/time') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('Time is' + hour + ":" + minute + ":" + seconds);
          })
        .catch(console.log);
    } else {
      message.reply('You need to use /start first!');
    }
  }
});

//client.setInterval(alertRunes,1000,currentchan);
