from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from model.vehiculos import vehiculos,vehiculosSchema
from model.usuarios import usuarios,usuariosSchema

routes_Ajustes = Blueprint("routes_Ajustes", __name__)

@routes_Ajustes.route('/indexAjustes', methods=['GET'] )
def indexAjustes():
    
    return render_template('/main/Ajustes.html')

@routes_Ajustes.route('/guardarvehiculosAJ', methods=['POST'])
def guardarvehiculosAJ():
    data = request.json
    new_paq = vehiculos(Matricula=data['Matricula'], Modelo=data['Modelo'], Color=data['Color'], Tipo=data['Tipo'])
    db.session.add(new_paq)
    db.session.commit()
    return redirect('/Ajustes')

@routes_Ajustes.route('/guardarusuariosAJ', methods=['POST'])
def guardarusuariosAJ():
    data = request.json
    new_paq = usuarios(Usuario=data['Usuario'], 
                       Nombre=data['Nombre'], 
                       Apellido=data['Apellido'], 
                       Cedula=data['Cedula'], 
                       Correo=data['Correo'], 
                       Telefono=data['Telefono'], 
                       Contraseña=data['Contraseña'], 
                       id_vehiculo=data['id_vehiculo'], 
                       id_rol=data['id_rol'],)
    db.session.add(new_paq)
    db.session.commit()
    return redirect('/Ajustes')

@routes_Ajustes.route('/eliminarUS/<string:Usuario>', methods=['DELETE'])
def eliminarUS(Usuario):
    persona = usuarios.query.get(Usuario)

    if persona:
        db.session.delete(persona)
        db.session.commit()
        return jsonify({'message': 'El usuario ha sido eliminado correctamente'})
    else:
        return jsonify({'message': 'El usuario no existe'})
    
@routes_Ajustes.route('/verifyusuario', methods=['GET'])
def verifyusuario():
    datos= {}
    usuarios_table = db.Model.metadata.tables['tblusuarios']
    vehiculos_table = db.Model.metadata.tables['tblvehiculos']
    resultado = db.session.query(usuarios, vehiculos).select_from(usuarios_table).join(vehiculos_table).all()
    i = 0
    for usuario, vehiculo in resultado:
        i += 1
        datos[i] = {
            'nombreu':usuario.Usuario,
            'password':usuario.Contraseña,
            'nombre':usuario.Nombre,
            'apellido':usuario.Apellido,
            'matricula':vehiculo.Matricula              
        }
    return jsonify(datos)