from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from model.usuarios  import usuarios, usuariosSchema
from model.roles import roles, rolesSchema

routes_login = Blueprint("routes_login", __name__)

@routes_login.route('/indexlogin', methods=['GET'] )
def indexlogin():
    
    return render_template('/main/login.html')

@routes_login.route('/consulusuario', methods=['GET'])
def consullist():
    datos= {}
    usuarios_table = db.Model.metadata.tables['tblusuarios']
    roles_table = db.Model.metadata.tables['tblroles']
    resultado = db.session.query(usuarios, roles).select_from(usuarios_table).join(roles_table).all()
    users = []
    i = 0
    for usuario, rol in resultado:
        i += 1
        datos[i] = {
            'nombreu':usuario.Usuario,
            'password':usuario.Contraseña,
            'rolsito': rol.id                   
        }
    users.append(datos)
    print(users)
    return jsonify(datos)
