from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from model.paquetes import paquetes, paquetesSchema

routes_Ppredeterminados = Blueprint("routes_Ppredeterminados", __name__)

@routes_Ppredeterminados.route('/indexPpredeterminados', methods=['GET'] )
def indexPpredeterminados():
    
    return render_template('/main/Ppredeterminados.html')

@routes_Ppredeterminados.route('/consulpaquetes', methods=['GET'])
def consulpaquetes():
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
    users.append(datos)
    print(users)
    return jsonify(datos)