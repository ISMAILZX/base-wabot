const fs = require('fs');
const simple = require('./lib/simple')
const { WAConnection: _WAConnection, MessageType, compressImage } = require("@adiwajshing/baileys")
const WAConnection = simple.WAConnection(_WAConnection)
const util = require('util')
const syntaxErr = require('syntax-error')
const { exec } = require('child_process')
const axios = require('axios')
const fetch = require('node-fetch')
const chalk = require('chalk')
const config = require('./config.json')

module.exports = client = async (client, m) => {
	try {
		if (!m.hasNewMessage) return
    	if (!m.messages) return
    	if (!m) return
    	m = m.messages.all()[0];
    	simple.smsg(client, m)
    	if (m.text && typeof m.text !== 'string') return
    	let { quoted, mentionedJid, sender, isGroup, text, pushname, fromMe } = m
    	command = text.replace(config.prefix, '').trim().split(/ +/).shift().toLowerCase()
    	const args = text.trim().split(/ +/).slice(1);
    	const query = args.join(' ')
    	const isCmd = text.startsWith(config.prefix)

    	const isOwner = config.ownerNumber.includes(sender)

    	if (isCmd) {console.log(chalk.green('[ USE COMMAND ] '), chalk.cyan(command))}

    switch(command) {
    case 'tes':
    	m.reply('oit')
    break
    case 'eval':
  		let _syntax = ''
  		let _return
		let _text = `;(async () => {${(/^=/.test('/') ? 'return ' : '') + query}})()`
		try {
		_return = await eval(_text)
		}catch(e) {
		let err = await syntaxErr(_text)
		if (err) _syntax = err + '\n\n'
		_return = e
		}finally {
		m.reply(_syntax + util.format(_return))
		}
	}
	} catch (err) {
		console.log(err)
	}
}