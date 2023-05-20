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
    resultado = db.session.query(usuarios_table.c.Nombre, usuarios_table.c.Apellido, usuarios_table.c.Cedula, usuarios_table.c.Correo, vehiculos_table.c.Matricula, vehiculos_table.c.Tipo).select_from(usuarios_table).join(vehiculos_table).all()
    
    i = 0
    for nombre, apellido, cedula, correo, matricula, tipo in resultado:
        i += 1
        datos[i] = {
            'Nombre': nombre,
            'Apellido': apellido,
            'Cedula': cedula,
            'Correo': correo,
            'Matricula': matricula,
            'Tipo': tipo            
        }
    return jsonify(datos)

@routes_Pagos.route('/guardarventa', methods=['POST'])
def guardarventa():
    data = request.json
    new_paq = paquetes(Fecha=data['Fecha'], id_vehiculo=data['Matricula'], id_paquete=data['id_paquete'], Descripcion=data['Descripcion'])
    db.session.add(new_paq)
    db.session.commit()
    return redirect('/Pagos')