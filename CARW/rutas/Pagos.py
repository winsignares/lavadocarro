from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from model.usuarios  import usuarios, usuariosSchema
from model.roles import roles, rolesSchema
from model.vehiculos import vehiculos,vehiculosSchema
from model.paquetes import paquetes,paquetesSchema

routes_Pagos = Blueprint("routes_Pagos", __name__)

@routes_Pagos.route('/indexPagos', methods=['GET'] )
def indexPagos():
    
    return render_template('/main/Pagos.html')


@routes_Pagos.route('/consulusuarioPAG', methods=['GET'])
def consullist():
    datos = {}
    usuarios_table = db.Model.metadata.tables['tblusuarios']
    vehiculos_table = db.Model.metadata.tables['tblvehiculos']
    resultado = db.session.query(usuarios_table.c.Nombre,usuarios_table.c.Apellido, usuarios_table.c.Cedula, vehiculos_table.c.Matricula, vehiculos_table.c.Tipo).select_from(usuarios_table).join(vehiculos_table).all()
    
    users = []
    i = 0
    for nombre, apellido, cedula, matricula, tipo in resultado:
        i += 1
        datos[i] = {
            'Nombre': nombre,
            'Apellido': apellido,
            'Cedula': cedula,
            'Matricula': matricula,
            'Tipo': tipo            
        }
        users.append(datos)
        print(users)
    
    return jsonify(datos)