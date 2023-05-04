from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template

routes_Peditables = Blueprint("routes_Peditables", __name__)

@routes_Peditables.route('/indexPeditables', methods=['GET'] )
def indexPeditables():
    
    return render_template('/main/Peditables.html')

@routes_Peditables.route('/consulprocedimientos', methods=['GET'])
def consulprocedimientos():
    datos= {}
    paqutes_table = db.Model.metadata.tables['tblpaquetes']
    resultado = db.session.query(paqutes_table).select_from(paqutes_table).all()
    users = []
    i = 0
    for paqutes_table in resultado:
        i += 1
        datos[i] = {
            'titulo':paqutes_table.Nombre,
            'descripcion':paqutes_table.Descripcion,
            'valor': paqutes_table.Valor                   
        }
    return jsonify(datos)