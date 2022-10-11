from flask import Flask, request
from flask_cors import CORS, cross_origin
from algo import n_queens

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/profile', methods=["POST"])
@cross_origin()
def my_profile():
    size = request.json['size']
    # response_body = {
    #     "name": "Nagato",
    #     "about" :size
    # }
    solutions = n_queens(size)
    response_body = {
        "num_solutions": len(solutions),
        "solutions": solutions
    }
    return response_body
