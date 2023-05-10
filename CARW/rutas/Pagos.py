from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from model.usuarios  import usuarios, usuariosSchema
from model.roles import roles, rolesSchema

routes_Pagos = Blueprint("routes_Pagos", __name__)

@routes_Pagos.route('/indexPagos', methods=['GET'] )
def indexPagos():
    
    return render_template('/main/Pagos.html')

@routes_Pagos.route('/consulusuario', methods=['GET'])
def consullist():
    datos= {}
    usuarios_table = db.Model.metadata.tables['tblusuarios']
    roles_table = db.Model.metadata.tables['tblroles']
    resultado = db.session.query(usuarios, roles).select_from(usuarios_table).join(roles_table).all()
    i = 0
    for usuario, rol in resultado:
        i += 1
        datos[i] = {
            'nombreu':usuario.Usuario,
            'rolsito': rol.id                   
        }
    return jsonify(datos)

