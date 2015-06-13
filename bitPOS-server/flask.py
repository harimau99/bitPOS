from flask import Flask, render_template
from flask.ext.cors import CORS
import datetime
import time
from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException
import requests
import json
import decimal

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost"}})


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        super(DecimalEncoder, self).default(o)


@app.route("/")
def index():
    return render_template("index5.html")


@app.route("/time")
def time():
    return str(datetime.datetime.now())


@app.route("/wallet")
def wallet():
    balance = float(rpc_connection.getbalance())
    default_address = rpc_connection.getaccountaddress("")
    last_transaction = rpc_connection.listtransactions("", 1)[0]
    last_time = last_transaction["time"]
    last_timedelta = int(datetime.datetime.now().strftime('%s')) - last_transaction["time"]
    last_amount = float(last_transaction["amount"])
    last_confirmations = last_transaction["confirmations"]

    message = {"balance": balance, "defaultAddress": default_address, "lastTransaction": {
               "time": last_time, "timedelta": last_timedelta,
               "amount": last_amount, "confirmations": last_confirmations}}
    return json.dumps(message)


@app.route("/transactions")
def transactions():
    transactions = rpc_connection.listtransactions("", 5)
    message = {'t1': transactions[0], 't2': transactions[1], 't3': transactions[2],
               't4': transactions[3], 't5': transactions[4]}
    return json.dumps(message, cls=DecimalEncoder)


@app.route("/status")
def status():
    local_height = rpc_connection.getblockcount()
    if local_height > max_height:
        get_max_height()
    connections = rpc_connection.getconnectioncount()
    next_block_fee = rpc_connection.estimatefee(1)
    message = {"maxHeight": max_height, "localHeight": local_height,
               "connections": connections, 'nextBlockFee': next_block_fee}
    return json.dumps(message, cls=DecimalEncoder)


def get_max_height():
    global max_height
    r = requests.get("http://blockexplorer.com/testnet/q/getblockcount")
    if r.status_code != 200:
        print "Error 1"
    else:
        max_height = int(r.text)

rpc_connection = AuthServiceProxy(
    "http://%s:%s@127.0.0.1:8332" % ("rpcuser", "hellothere"))

max_height = 0
get_max_height()


if __name__ == "__main__":
    # app.run(host='0.0.0.0')
    app.run(debug=True)
