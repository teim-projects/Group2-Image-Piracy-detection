from flask import Flask, send_file
import csv

app = Flask(__name__)

# Endpoint to send the CSV file
@app.route('/get_csv', methods=['GET'])
def get_csv():
    return send_file('similarities_sorted - Copy.csv', mimetype='text/csv', attachment_filename='similarities_sorted - Copy.csv', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
