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
    datos= {}
    usuarios_table = db.Model.metadata.tables['tblusuarios']
    vehiculos_table = db.Model.metadata.tables['tblvehiculos']
    resultado = db.session.query(usuarios, vehiculos).select_from(usuarios_table).join(vehiculos_table).all()
    users = []
    i = 0
    for usuario, vehiculo in resultado:
        i += 1
        datos[i] = {
            'cedula':usuario.Cedula,
            'nombreu':usuario.Usuario,
            'matricula': vehiculo.Matricula            
        }
        users.append(datos)
        print(users)
    return jsonify(datos)

@routes_Pagos.route('/consulpaquetes', methods=['GET'])
def consulpaquetes():
    datos= {}
    paqutes_table = db.Model.metadata.tables['tblpaquetes']
    resultado = db.session.query(paqutes_table).select_from(paqutes_table).all()
    i = 0
    for paqutes_table in resultado:
        i += 1
        datos[i] = {
            'titulo':paqutes_table.Nombre,
            'descripcion':paqutes_table.Descripcion,
            'valor': paqutes_table.Valor                  
        }
    return jsonify(datos)