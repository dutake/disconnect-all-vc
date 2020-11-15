const {	getModule,	getAllModules,	React,	constants,} = require("powercord/webpack");
const ChannelContextMenu = getAllModules((m) =>	  m.default && m.default.displayName == "ChannelListVoiceChannelContextMenu",	false )[0];
  const { getVoiceStates } = getModule(["getVoiceStates"], false);
  const { inject, uninject } = require("powercord/injector");
  const { patch } = getModule(["APIError", "patch"], false);
  const Menu = getModule(["MenuGroup", "MenuItem"], false);
  const { getChannel } = getModule(["getChannel"], false);
  const { Plugin } = require("powercord/entities");
  
  const getuser = require("powercord/webpack").getModule(["getCurrentUser"], false); // thanks to Oocrop for showing me how to get the user's perms
  module.exports = class disconnectallvoicechat extends Plugin {
	async startPlugin() {
	  const can = (await getModule(["can", "canEveryone"])).can; 
	  inject("disconect-all-vc", ChannelContextMenu, "default", (args, res) => {
		let user = getuser.getCurrentUser(); //the user		
		let channel = args[0].channel;
		let channelmembers = this.getVoiceChannelMembers(channel.id);
		if(channelmembers.length < 1) return res;
		if (!can(constants.Permissions.MOVE_MEMBERS, user, channel)) return res;
		
		let item = React.createElement(Menu.MenuItem, {  //Found out how to add stuff to this kinda menu from https://github.com/Twizzer/move-all-vc
		  action: async () => {
			for (const member of channelmembers) {
			  patch({
				url: constants.Endpoints.GUILD_MEMBER(channel.guild_id, member), //Found out how to move members from https://github.com/Twizzer/move-all-vc
				body: {
				  channel_id: null, 
				},
			  });
			  
			}
		  },
		  id: "disconnect-all-vc",
		  label: "Disconnect All",
		});
		let element = React.createElement(Menu.MenuGroup, null, item);
		res.props.children.push(element); 
		return res;
	  });
	  ChannelContextMenu.default.displayName =
		"ChannelListVoiceChannelContextMenu"; 
	}
	pluginWillUnload() {
	  uninject("disconect-all-vc");
	}
	getVoiceUserIds(guild, channel) {
	  return Object.values(getVoiceStates(guild))
		.filter((c) => c.channelId == channel)
		.map((a) => a.userId);
	} 
	getVoiceChannelMembers(id) {
	  let channel = getChannel(id);
	  return this.getVoiceUserIds(channel.guild_id, channel.id);
	}
  };
  
