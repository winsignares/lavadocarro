from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.ventas import ventas, ventasSchema

routes_ventas = Blueprint("routes_ventas", __name__)

venta_schema = ventasSchema()
ventas_schema = ventasSchema(many=True)

@routes_ventas.route('/ventas', methods=['GET'])
def obtenerventas():    
    returnall = ventas.query.all()
   
    resultado_ventas = ventas_schema.dump(returnall)
    return jsonify(resultado_ventas)

@routes_ventas.route('/saveventas', methods=['POST'])
def guardar_ventas():    
    newventas = request.json['id_vehiculo','id_paquete','Total','Vendedor']
    new_ven = ventas(newventas)
    db.session.add(new_ven)
    db.session.commit()
    return redirect('/ventas')

@routes_ventas.route('/eliminarventas/<Fecha>', methods=['GET'] )
def eliminarven(Fecha):
    ven = ventas.query.get(Fecha)
    db.session.delete(ven)
    db.session.commit()
    return jsonify(ventas_schema.dump(ven)) 

@routes_ventas.route('/actualizarventas', methods=['POST'] )
def actualizarven():
    Fecha = request.json['Fecha']
    ven = request.json['id_vehiculo','id_paquete','Total','Vendedor']
    pusuario = ventas.query.get(Fecha)
    pusuario.Nombre_proveedor = ven
    db.session.commit()
    return redirect('/ventas')