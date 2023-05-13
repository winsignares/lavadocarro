from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from model.servicios import servicios,serviciosSchema
from model.paquetes import paquetes, paquetesSchema

routes_Peditables = Blueprint("routes_Peditables", __name__)

@routes_Peditables.route('/indexPeditables', methods=['GET'] )
def indexPeditables():
    
    return render_template('/main/Peditables.html')

@routes_Peditables.route('/consulprocedimientos', methods=['GET'])
def consulprocedimientos():
    datos= {}
    procedimientos_table = db.Model.metadata.tables['tblservicios']
    resultado = db.session.query(procedimientos_table).select_from(procedimientos_table).all()
    i = 0
    for procedimientos_table in resultado:
        i += 1
        datos[i] = {
            'descripcion':procedimientos_table.Descripcion,
            'valor': procedimientos_table.Valor                   
        }
    return jsonify(datos)

@routes_Peditables.route('/guardarpaquetes', methods=['POST'])
def guardarpaquetes():
    data = request.json
    new_paq = paquetes(Nombre=data['Nombre'], Descripcion=data['Descripcion'], Valor=data['Valor'], Duracion=data['Duracion'])
    db.session.add(new_paq)
    db.session.commit()
    return redirect('/Peditables')
