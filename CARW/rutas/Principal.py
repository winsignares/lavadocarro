from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from model.paquetes import paquetes,paquetesSchema

routes_principal = Blueprint("routes_principal", __name__)

@routes_principal.route('/indexprincipal', methods=['GET'] )
def indexprincipal():
    
    return render_template('/main/Principal.html')

@routes_principal.route('/consulpaquetesPAG', methods=['GET'])
def consulpaquetes():
    datos= {}
    paqutes_table = db.Model.metadata.tables['tblpaquetes']
    resultado = db.session.query(paqutes_table).select_from(paqutes_table).all()
    i = 0
    for paqutes_table in resultado:
        i += 1
        datos[i] = {
            'titulo': paqutes_table.Nombre,
            'descripcion': paqutes_table.Descripcion,
            'valor': paqutes_table.Valor,
            'tiempo': paqutes_table.Duracion.strftime("%H:%M:%S")
            }

    return jsonify(datos)