from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template

routes_Pagos = Blueprint("routes_Pagos", __name__)

@routes_Pagos.route('/indexPagos', methods=['GET'] )
def indexPagos():
    
    return render_template('/main/Pagos.html')

