import sys
from flask import Flask, render_template
import serial
app = Flask(__name__)

arduino = serial.Serial(sys.argv[1], 9600)

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
