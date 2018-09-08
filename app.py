import sys
from flask import Flask, render_template
import os.path
app = Flask(__name__)

if len(sys.argv) >= 2 and os.path.isfile(sys.argv[1]):
    import serial
    arduino = serial.Serial(sys.argv[1], 9600)
else:
    print('SERIAL CONSOLE DOES NOT EXIST, NOT OPENING')

@app.route('/')
def index():
    return render_template('index.html')

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
