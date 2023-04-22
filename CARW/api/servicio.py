from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.servicios  import servicios, serviciosSchema

routes_servicios = Blueprint("routes_servicios", __name__)

servicio_schema = serviciosSchema()
servicios_schema = serviciosSchema(many=True)

@routes_servicios.route('/servicios', methods=['GET'])
def obtenerservicios():    
    returnall = servicios.query.all()
   
    resultado_servicios = servicios_schema.dump(returnall)
    return jsonify(resultado_servicios)

@routes_servicios.route('/saveservicios', methods=['POST'])
def guardar_servicios():    
    newservicios = request.json['Titulo','Descripcion']
    new_ser = servicios(newservicios)
    db.session.add(new_ser)
    db.session.commit()
    return redirect('/servicios')

@routes_servicios.route('/eliminarservicios/<id>', methods=['GET'] )
def eliminarser(id):
    ser = servicios.query.get(id)
    db.session.delete(ser)
    db.session.commit()
    return jsonify(servicios_schema.dump(ser)) 

@routes_servicios.route('/actualizarservicios', methods=['POST'] )
def actualizarser():
    id = request.json['id']
    ser = request.json['Titulo','Descripcion']
    pusuario = servicios.query.get(id)
    pusuario.Nombre_servicios = ser
    db.session.commit()
    return redirect('/servicios')