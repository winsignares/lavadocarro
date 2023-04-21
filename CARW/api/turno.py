from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.turnos  import turnos, turnosSchema

routes_turnos = Blueprint("routes_turnos", __name__)

turno_schema = turnosSchema()
turnos_schema = turnosSchema(many=True)

@routes_turnos.route('/turnos', methods=['GET'])
def obtenerturnos():    
    returnall = turnos.query.all()
   
    resultado_turnos = turnos_schema.dump(returnall)
    return jsonify(resultado_turnos)

@routes_turnos.route('/saveturnos', methods=['POST'])
def guardar_turnos():    
    newturnos = request.json['id_vehiculo','id_rol','Hora_inicio','Hora_Fin']
    new_tur = turnos(newturnos)
    db.session.add(new_tur)
    db.session.commit()
    return redirect('/turnos')

@routes_turnos.route('/eliminarturnos/<id>', methods=['GET'] )
def eliminartur(id):
    tur = turnos.query.get(id)
    db.session.delete(tur)
    db.session.commit()
    return jsonify(turnos_schema.dump(tur)) 

@routes_turnos.route('/actualizarturnos', methods=['POST'] )
def actualizartur():
    id = request.json['id']
    tur = request.json['id_vehiculo','id_rol','Hora_inicio','Hora_Fin']
    pusuario = turnos.query.get(id)
    pusuario.Nombre_turnos = tur
    db.session.commit()
    return redirect('/turnos')