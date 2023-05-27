from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template

routes_Ajustes = Blueprint("routes_Ajustes", __name__)

@routes_Ajustes.route('/indexAjustes', methods=['GET'] )
def indexAjustes():
    
    return render_template('/main/Ajustes.html')