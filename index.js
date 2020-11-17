const {	getModule,	getAllModules,	React,	constants,} = require("powercord/webpack");
 const { Plugin } = require("powercord/entities");
  
  const getuser = require("powercord/webpack").getModule(["getCurrentUser"], false); // thanks to Oocrop for showing me how to get the user's perms
  module.exports = class disconnectallvoicechat extends Plugin {
	async startPlugin() {
		await require('powercord/webpack').getModule([ 'container', 'base' ], false).container;


		powercord.api.notices.sendToast('pc-example-toast', {
			header: 'Disconnect-all-vc', // required
			content: 'Hey! The Disconnect-all-vc plugin has moved to a new repo, click on the button for the new link',
			// image: 'https://cdn.discordapp.com/attachments/437423765006057472/641087353011699722/hibiscus.png',
			imageClass: 'disconnect-all-vc-update',
			type: 'info',
			timeout: null,
			buttons: [ {
			  text: 'Click here for the new plugin', // required
			  color: 'red',
			  size: 'medium',
			  look: 'outlined',
			  onClick: () => window.open('https://github.com/dutake/voice-chat-utilities', '_blank')
			} ],
			// callback: () => console.log('emma is the cutest')
		  });



  }};
  
