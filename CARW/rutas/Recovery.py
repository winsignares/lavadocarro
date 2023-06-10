from db import db, app, ma
from flask import Blueprint, Flask,  redirect, request, jsonify, json, session, render_template
from model.usuarios  import usuarios, usuariosSchema

routes_Recovery = Blueprint("routes_Recovery", __name__)

@routes_Recovery.route('/indexRecovery', methods=['GET'] )
def indexRecovery():
    
    return render_template('/main/Recovery.html')

@routes_Recovery.route('/consulRC', methods=['GET'])
def consulRC():
    datos = {}
    usuarios_table = db.Model.metadata.tables['tblusuarios']
    resultado = db.session.query(usuarios).select_from(usuarios_table).all()
    i = 0
    for usuario in resultado:
        i += 1
        datos[i] = {
            'nombreu': usuario.Usuario,
            'email': usuario.Correo,
            'numero': usuario.Telefono
        }
        print(f"Usuario {i}: {datos[i]}")
    return jsonify(datos)

@routes_Recovery.route('/actualizar_contraseña', methods=['POST'])
def actualizar_contraseña():
    # Recibir datos del cliente
    usuario_id = request.json['Usuario']
    nueva_contraseña = request.json['Contraseña']

    # Simular actualización de contraseña
    # (En un caso real, se debería aplicar la lógica adecuada)
    print(f"Usuario: {usuario_id}")
    print(f"Contraseña: {nueva_contraseña}")

    # Devolver respuesta al cliente
    return jsonify({'mensaje': 'Contraseña actualizada correctamente'})