from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from model.usuarios  import usuarios, usuariosSchema
from model.roles  import roles, rolesSchema

routes_login = Blueprint("routes_login", __name__)

@routes_login.route('/indexlogin', methods=['GET'] )
def indexlogin():
    
    return render_template('/main/login.html')

@routes_login.route('/consulusuario', methods=['GET'])
def consullist():
    datos= {}
    resultado = db.session.query(usuarios, roles).select_from(db.Model.metadata.tables['tblusuarios']).join(db.Model.metadata.tables['tblroles']).all()
    users = []
    i = 0
    for usuario, roles in resultado:
        i += 1
        datos[i] = {
            'nombreu':usuario.Usuario,
            'password':usuario.Contraseña,
            'rolsito': usuario.id_rol.roles                     
        }
    users.append(datos)
    print(users)
    return jsonify(datos)