from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template

routes_principal = Blueprint("routes_principal", __name__)

@routes_principal.route('/indexprincipal', methods=['GET'] )
def indexprincipal():
    
    return render_template('/main/Principal.html')