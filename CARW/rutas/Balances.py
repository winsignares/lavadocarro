from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from model.paquetes import paquetes
from model.vehiculos import vehiculos
from model.ventas import ventas

routes_Balances = Blueprint("routes_Balances", __name__)

@routes_Balances.route('/indexBalances', methods=['GET'] )
def indexBalances():
    
    return render_template('/main/Balances.html')

@routes_Balances.route('/consulBalances', methods=['GET'])
def consulBalances():
    datos = []
    ventas_table = db.Model.metadata.tables['tblventas']
    carritos_table = db.Model.metadata.tables['tblvehiculos']
    paquetes_table = db.Model.metadata.tables['tblpaquetes']
    resultado = db.session.query(ventas_table.c.Fecha, carritos_table.c.Matricula, paquetes_table.c.Nombre, ventas_table.c.Total, paquetes_table.c.Descripcion).select_from(ventas_table).join(carritos_table).join(paquetes_table).all()
    
    for fecha, matricula, nombre, total, descripcion in resultado:
        datos.append({
            'Fecha': fecha,
            'Matricula': matricula,
            'Paquete': nombre,
            'Total': total,
            'Descripcion': descripcion
        })
    return jsonify(datos)
