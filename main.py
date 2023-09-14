from configparser import ConfigParser
from javascript import require, On
mineflayer = require('mineflayer')
import threading, os
from sys import platform
import signal

config = ConfigParser()
config.read('config.ini')

stop_threads = False

def handle_ctrl_c(signum, frame):
    global stop_threads
    stop_threads = True
    print("Stopping the bot...")

def started(stop):
    bot = mineflayer.createBot({
      'host': config.get('server', 'host'),
      'port': config.get('server', 'port'),
      'username': config.get('bot', 'name')    })
    print('Running bot.....')

    @On(bot, "chat")
    def handle(this, username, message, *args):
        if username == bot.username:
            return
        elif message.startswith(config.get('command', 'position')):
            p = bot.entity.position
            bot.chat(f"Bot > I am at {p.toString()}")
        elif message.startswith(config.get('command', 'start')):
            bot.setControlState('forward', True)
            bot.setControlState('jump', True)
            bot.setControlState('sprint', True)
        elif message.startswith(config.get('command', 'stop')):
            bot.clearControlStates()

def start_bot():
    global stop_threads
    stop_threads = False
    signal.signal(signal.SIGINT, handle_ctrl_c)
    started(lambda: stop_threads)

if __name__ == "__main__":
    start_bot()
