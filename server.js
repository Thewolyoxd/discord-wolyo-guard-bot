const { Discord, Client, MessageEmbed } = require("discord.js");
const client = new Client({
  ignoreDirect: true,
  ignoreRoles: true,
  ignoreEveryone: true
});
client.setMaxListeners(50);
let ibibik = [];
let güvenliler = [];
let botlar = [];
let yetkiler = [
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_NICKNAMES"
];

client.on("ready", async () => {
  ibibik.push(client.user.id);
  client.user.setStatus("dnd");
  client.user.setActivity(`botun oynuyoru kardeşim`);
  console.log("Bot başarılı bir şekilde açıldı.");
});

client.on("guildBanAdd", async (guild, user) => {
  const logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" });
  const log = logs.entries.first();
  if (!log) return;
  const target = log.target;
  const id = log.executor.id;
  if (!güvenliler.includes(id)) {
    if (user.id === target.id) {
      let uye = guild.members.cache.get(id);
      let slent = guild.members.cache.get(client.user.id);
      if (slent.roles.highest.rawPosition < uye.roles.highest.rawPosition)
        return;
      guild.roles.cache
        .filter(r => {
          return (
            yetkiler.some(a => r.permissions.has(a)) &&
            !botlar.includes(r.id) &&
            r.rawPosition < slent.roles.highest.rawPosition
          );
        })
        .map(x => {
          console.log(x.name);
          x.edit({
            permissions: x.permissions.remove(yetkiler)
          });
        });
      uye.ban({ reason: "Sağ tık ban atıldı." }); // Sunucudan mesajlarını silmek istiyorsan , days: 7 yazman yeterlidir.
      guild.members.unban(target.id);
    } else {
    }
  } else {
  }
});

client.on("guildMemberRemove", async user => {
  let guild = user.guild;
  const logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" });
  const log = logs.entries.first();
  if (!log) return;
  const target = log.target;
  const id = log.executor.id;
  if (!güvenliler.includes(id)) {
    if (user.id === target.id) {
      let uye = guild.members.cache.get(id);
      let slent = guild.members.cache.get(client.user.id);
      if (slent.roles.highest.rawPosition < uye.roles.highest.rawPosition)
        return;
      guild.roles.cache
        .filter(r => {
          return (
            yetkiler.some(a => r.permissions.has(a)) &&
            !botlar.includes(r.id) &&
            r.rawPosition < slent.roles.highest.rawPosition
          );
        })
        .map(x => {
          console.log(x.name);
          x.edit({
            permissions: x.permissions.remove(yetkiler)
          });
        });
      uye.ban({ reason: "Sağ tık kick atıldı." }); // Sunucudan mesajlarını silmek istiyorsan , days: 7 yazman yeterlidir.
    } else {
    }
  } else {
  }
});

client.on("channelUpdate", async (oldChannel, newChannel) => {
  let guild = newChannel.guild;
  guild.fetchAuditLogs().then(async logs => {
    if (logs.entries.first().action === `CHANNEL_UPDATE`) {
      let id = logs.entries.first().executor.id;
      if (!güvenliler.includes(id)) {
        let uye = guild.members.cache.get(id);
        let silient = guild.members.cache.get(client.user.id);
        if (silient.roles.highest.rawPosition < uye.roles.highest.rawPosition)
          return;
        guild.roles.cache
          .filter(qqq => {
            return (
              yetkiler.some(q => qqq.permissions.has(q)) &&
              !botlar.includes(qqq.id) &&
              qqq.rawPosition < silient.roles.highest.rawPosition
            );
          })
          .map(q => {
            console.log(q.name);
            q.edit({
              permissions: q.permissions.remove(yetkiler)
            });
          });
        uye.ban({ reason: "Kanal güncelleme koruması." });
        newChannel.edit({
          type: oldChannel.type,
          name: oldChannel.name,
          nsfw: oldChannel.nsfw,
          topic: oldChannel.topic,
          bitrate: oldChannel.bitrate,
          position: oldChannel.position,
          parentID: oldChannel.parentID,
          userLimit: oldChannel.userLimit,
          manageable: oldChannel.manageable,
          permissionOverwrites: oldChannel.permissionOverwrites,
          rateLimitPerUser: oldChannel.rateLimitPerUser
        });
      } else {
      }
    } else {
    }
  });
});

client.on("channelDelete", async channel => {
  const guild = channel.guild;
  guild.fetchAuditLogs().then(async logs => {
    if (logs.entries.first().action === `CHANNEL_DELETE`) {
      const id = logs.entries.first().executor.id;
      if (!ibibik.includes(id)) {
        const uye = guild.members.cache.get(id);
        const kılent = guild.members.cache.get(client.user.id);
        if (kılent.roles.highest.rawPosition < uye.roles.highest.rawPosition)
          return;
        guild.roles.cache
          .filter(r => {
            return (
              yetkiler.some(a => r.permissions.has(a)) &&
              !botlar.includes(r.id) &&
              r.rawPosition < kılent.roles.highest.rawPosition
            );
          })
          .map(x => {
            console.log(x.name);
            x.edit({
              permissions: x.permissions.remove(yetkiler)
            });
          });
        uye.ban({ reason: "Kanal silme koruması" }); // Sunucudan mesajlarını silmek istiyorsan , days: 7 yazman yeterlidir.
      } else {
      }
    } else {
    }
  });
});

client.on("channelCreate", async channel => {
  const guild = channel.guild;
  guild.fetchAuditLogs().then(async logs => {
    if (logs.entries.first().action === `CHANNEL_CREATE`) {
      const id = logs.entries.first().executor.id;
      if (!ibibik.includes(id)) {
        const uye = guild.members.cache.get(id);
        const kılent = guild.members.cache.get(client.user.id);
        if (kılent.roles.highest.rawPosition < uye.roles.highest.rawPosition)
          return;
        guild.roles.cache
          .filter(r => {
            return (
              yetkiler.some(a => r.permissions.has(a)) &&
              !botlar.includes(r.id) &&
              r.rawPosition < kılent.roles.highest.rawPosition
            );
          })
          .map(x => {
            console.log(x.name);
            x.edit({
              permissions: x.permissions.remove(yetkiler)
            });
          });
        uye.ban({ reason: "Kanal oluşturma koruması" }); // Sunucudan mesajlarını silmek istiyorsan , days: 7 yazman yeterlidir.
      } else {
      }
    } else {
    }
  });
});

client.on("webhookUpdate", async channel => {
  let guild = channel.guild;
  guild.fetchAuditLogs().then(async logs => {
    if (logs.entries.first().action === `WEBHOOK_CREATE`) {
      let yetkili = logs.entries.first().executor;
      let id = logs.entries.first().executor.id;
      if (!ibibik.includes(id)) {
        let uye = guild.members.cache.get(id);
        let slent = guild.members.cache.get(client.user.id);
        if (slent.roles.highest.rawPosition < uye.roles.highest.rawPosition)
          return;
        guild.roles.cache
          .filter(r => {
            return (
              yetkiler.some(a => r.permissions.has(a)) &&
              !botlar.includes(r.id) &&
              r.rawPosition < slent.roles.highest.rawPosition
            );
          })
          .map(x => {
            console.log(x.name);
            x.edit({
              permissions: x.permissions.remove(yetkiler)
            });
          });
        uye.ban({ reason: "Webhook oluşturma koruması" }); // Sunucudan mesajlarını silmek istiyorsan , days: 7 yazman yeterlidir.
      } else {
      }
    } else {
    }
  });
});

client.login("token");
