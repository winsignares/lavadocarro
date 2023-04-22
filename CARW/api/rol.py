from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.roles  import roles, rolesSchema

routes_roles = Blueprint("routes_roles", __name__)

rol_schema = rolesSchema()
roles_schema = rolesSchema(many=True)

@routes_roles.route('/roles', methods=['GET'])
def obtenerroles():    
    returnall = roles.query.all()
   
    resultado_roles = roles_schema.dump(returnall)
    return jsonify(resultado_roles)

@routes_roles.route('/saveroles', methods=['POST'])
def guardarrol():    
    newroles = request.json['Rol']
    new_rol = roles(newroles)
    db.session.add(new_rol)
    db.session.commit()
    return redirect('/roles')

@routes_roles.route('/eliminarroles/<id>', methods=['GET'] )
def eliminarrol(id):
    rol = roles.query.get(id)
    db.session.delete(rol)
    db.session.commit()
    return jsonify(roles_schema.dump(rol)) 

@routes_roles.route('/actualizarroles', methods=['POST'] )
def actualizarrol():
    id = request.json['id']
    rol = request.json['Rol']
    pusuario = roles.query.get(id)
    pusuario.Nombre_roles = rol
    db.session.commit()
    return redirect('/roles')