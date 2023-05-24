from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from model.paquetes import paquetes,paquetesSchema

routes_Turnos = Blueprint("routes_Turnos", __name__)

@routes_Turnos.route('/indexTurnos', methods=['GET'] )
def indexTurnos():
    
    return render_template('/main/Turnos.html')

@routes_Turnos.route('/consulTurnos', methods=['GET'])
def consulTurnos():
    datos = []
    resultado = db.session.query(turnos, paquetes).join(paquetes).all()

    for turno, paquete in resultado:
        datos.append({
            'id': turno.id,
            'matricula': turno.id_vehiculo,
            'paquete': paquete.Nombre
        })

    return jsonify(datos)
