from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.usuarios  import usuarios, usuariosSchema

routes_usuarios = Blueprint("routes_usuarios", __name__)

usuario_schema = usuariosSchema()
usuarios_schema = usuariosSchema(many=True)

@routes_usuarios.route('/usuarios', methods=['GET'])
def obtenerusuarios():    
    returnall = usuarios.query.all()
   
    resultado_usuarios = usuarios_schema.dump(returnall)
    return jsonify(resultado_usuarios)

@routes_usuarios.route('/saveusuarios', methods=['POST'])
def guardar_usuarios():    
    newusuarios = request.json['Nombre','Apellido','Correo','Telefono','Contraseña','id_vehiculo','id_rol']
    new_usu = usuarios(newusuarios)
    db.session.add(new_usu)
    db.session.commit()
    return redirect('/usuarios')

@routes_usuarios.route('/eliminarusuarios/<Usuario>', methods=['GET'] )
def eliminarusu(Usuario):
    usu = usuarios.query.get(Usuario)
    db.session.delete(usu)
    db.session.commit()
    return jsonify(usuarios_schema.dump(usu)) 

@routes_usuarios.route('/actualizarusuarios', methods=['POST'] )
def actualizarusu():
    Usuario = request.json['Usuario']
    usu = request.json['Nombre','Apellido','Correo','Telefono','Contraseña','id_vehiculo','id_rol']
    pusuario = usuarios.query.get(id)
    pusuario.Nombre_usuarios = usu
    db.session.commit()
    return redirect('/usuarios')