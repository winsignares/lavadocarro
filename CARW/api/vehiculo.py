from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.vehiculos  import vehiculos, vehiculosSchema

routes_vehiculos = Blueprint("routes_vehiculos", __name__)

vehiculo_schema = vehiculosSchema()
vehiculos_schema = vehiculosSchema(many=True)

@routes_vehiculos.route('/vehiculos', methods=['GET'])
def obtenervehiculos():    
    returnall = vehiculos.query.all()
   
    resultado_vehiculos = vehiculos_schema.dump(returnall)
    return jsonify(resultado_vehiculos)

@routes_vehiculos.route('/savevehiculos', methods=['POST'])
def guardar_vehiculos():    
    newvehiculos = request.json['Modelo','Color','Tipo']
    new_car = vehiculos(newvehiculos)
    db.session.add(new_car)
    db.session.commit()
    return redirect('/vehiculos')

@routes_vehiculos.route('/eliminarvehiculos/<Matricula>', methods=['GET'] )
def eliminarveh(Matricula):
    veh = vehiculos.query.get(Matricula)
    db.session.delete(veh)
    db.session.commit()
    return jsonify(vehiculos_schema.dump(veh)) 

@routes_vehiculos.route('/actualizarvehiculos', methods=['POST'] )
def actualizarveh():
    Matricula = request.json['Matricula']
    veh = request.json['Modelo','Color','Tipo']
    pusuario = vehiculos.query.get(id)
    pusuario.Nombre_vehiculos = veh
    db.session.commit()
    return redirect('/vehiculos')