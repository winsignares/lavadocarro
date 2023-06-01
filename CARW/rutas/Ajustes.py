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