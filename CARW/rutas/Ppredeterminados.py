from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template

routes_Ppredeterminados = Blueprint("routes_Ppredeterminados", __name__)

@routes_Ppredeterminados.route('/indexPpredeterminados', methods=['GET'] )
def indexPpredeterminados():
    
    return render_template('/main/Ppredeterminados.html')