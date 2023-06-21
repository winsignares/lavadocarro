from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template

routes_Pagoex = Blueprint("routes_Pagoex", __name__)

@routes_Pagoex.route('/indexPagoex', methods=['GET'] )
def indexPagoex():
    
    return render_template('/main/Pagoex.html')