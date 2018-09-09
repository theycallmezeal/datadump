import hashlib
import json
import os.path
import random
import string
import sys

from flask import Flask, render_template

app = Flask(__name__)
DIR = os.path.dirname(os.path.realpath(__file__))
BLOCKCHAIN = os.path.join(DIR, 'static', 'blockchain.json')
DIFFICULTY = 4

if len(sys.argv) >= 2 and os.path.exists(sys.argv[1]):
    import serial
    arduino = serial.Serial(sys.argv[1], 9600)
else:
    print('SERIAL CONSOLE DOES NOT EXIST, NOT OPENING')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/mine/<num>', methods=['POST'])
def mine(num):
    if not os.path.exists(BLOCKCHAIN):
        with open(BLOCKCHAIN, 'w') as f:
            json.dump([], f)

    with open(BLOCKCHAIN) as f:
        prev = json.load(f)

    if len(prev) == 0:
        lasthash = ''
    else:
        lasthash = prev[-1]['hash']

    while True:
        nonce = ''.join([random.choice(string.printable) for _ in range(10)])
        to_hash = nonce + lasthash + num
        h = hashlib.sha256(to_hash.encode('utf8')).hexdigest()
        if all([h[i] == '0' for i in range(DIFFICULTY)]):
            break

    prev.append({'nonce': nonce, 'roll_count': num, 'hash': h})
    with open(BLOCKCHAIN, 'w') as f:
        json.dump(prev, f)

    return h

@app.route('/script.js')
def script():
    return render_template('script.js')

@app.route('/speed/<motor>/<speed>', methods=['POST'])
def set_speed(motor, speed):
    arduino.write((motor + '\n').encode('utf8'))
    arduino.write((speed + '\n').encode('utf8'))
    res = arduino.readline()
    print(res)
    return res

if __name__ == '__main__':
    app.run(debug=True)
