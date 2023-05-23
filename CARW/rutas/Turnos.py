from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template

routes_Turnos = Blueprint("routes_Turnos", __name__)

@routes_Turnos.route('/indexTurnos', methods=['GET'] )
def indexTurnos():
    
    return render_template('/main/Turnos.html')