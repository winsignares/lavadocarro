from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template

routes_Peditables = Blueprint("routes_Peditables", __name__)

@routes_Peditables.route('/indexPeditables', methods=['GET'] )
def indexPeditables():
    
    return render_template('/main/Paqeutes_editables.html')