from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from model.paquetes import paquetes,paquetesSchema
from model.turnos import turnos,turnosSchema

routes_Turnos = Blueprint("routes_Turnos", __name__)

@routes_Turnos.route('/indexTurnos', methods=['GET'] )
def indexTurnos():
    
    return render_template('/main/Turnos.html')

@routes_Turnos.route('/consulTurnos', methods=['GET'])
def consulTurnos():
    datos = []
    turnos_table = db.Model.metadata.tables['tblturnos']
    paquetes_table = db.Model.metadata.tables['tblpaquetes']
    resultado = db.session.query(turnos_table.c.id, turnos_table.c.id_vehiculo, paquetes_table.c.Nombre,paquetes_table.c.Duracion).select_from(turnos_table).join(paquetes_table).all()
    

    for id, id_vehiculo,nombre,duracion in resultado:
        datos.append({
            'ID': id,
            'Matricula': id_vehiculo,
            'Paquete': nombre,
            'Duracion': duracion.strftime("%H:%M:%S")
        })
    return jsonify(datos)


@routes_Turnos.route('/eliminarTurno/<int:Id>', methods=['DELETE'])
def eliminarTurno(Id):
    turno = turnos.query.get(Id)

    if turno:
        db.session.delete(turno)
        db.session.commit()
        return jsonify({'message': 'El turno ha sido eliminado correctamente'})
    else:
        return jsonify({'message': 'El turno no existe'})