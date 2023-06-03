from flask import Flask,  redirect, request, jsonify, json, session, render_template, url_for
from db import db, app, ma
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,get_jwt_identity)
import os

#generar llave y sesion
app.secret_key = os.urandom(24)

#----------------------jwt inicio-----------------------
app.config['JWT_SECRET_KEY'] = 'ZEROGT2558'
jwt = JWTManager(app)
#----------------------jwt fin--------------------------

#importar routes de las tablas 
from api.paquete import routes_paquetes
from api.rol import routes_roles
from api.servicio import routes_servicios
from api.vehiculo import routes_vehiculos
from api.usuario import routes_usuarios
from api.turno import routes_turnos
from api.venta import routes_ventas

#ubicacion del api de las tablas 
app.register_blueprint(routes_paquetes, url_prefix="/api") 
app.register_blueprint(routes_roles, url_prefix="/api")
app.register_blueprint(routes_servicios, url_prefix="/api")
app.register_blueprint(routes_vehiculos, url_prefix="/api")
app.register_blueprint(routes_usuarios, url_prefix="/api")
app.register_blueprint(routes_turnos, url_prefix="/api")
app.register_blueprint(routes_ventas, url_prefix="/api")

#importar routes de los html
from rutas.login import routes_login
from rutas.Principal import routes_principal
from rutas.Ppredeterminados import routes_Ppredeterminados
from rutas.Peditables import routes_Peditables
from rutas.Pagos import routes_Pagos
from rutas.Turnos import routes_Turnos
from rutas.Balances import routes_Balances
from rutas.Ajustes import routes_Ajustes

#ubicacion de los html
app.register_blueprint(routes_login, url_prefix="/fronted")
app.register_blueprint(routes_principal, url_prefix="/fronted")
app.register_blueprint(routes_Ppredeterminados, url_prefix="/fronted")
app.register_blueprint(routes_Peditables, url_prefix="/fronted")
app.register_blueprint(routes_Pagos, url_prefix="/fronted")
app.register_blueprint(routes_Turnos, url_prefix="/fronted")
app.register_blueprint(routes_Balances, url_prefix="/fronted")
app.register_blueprint(routes_Ajustes, url_prefix="/fronted")


#------------------------------------------------
@app.route('/consulusuario', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # Verificar las credenciales del usuario (aquí deberías realizar la lógica de autenticación)
    if username == 'usuario' and password == 'contraseña':
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify(message='Usuario o contraseña incorrectos'), 401

@app.route("/")
def index():
    titulo= "Pagina Princiapl"
    return render_template('/main/login.html', titles=titulo)

@app.route('/Principal')
def principal():
    return render_template('/main/Principal.html')
    
@app.route('/Ppredeterminados')
def Paquetes_predeterminados():
    return render_template('/main/Ppredeterminados.html')

@app.route('/Peditables')
def Peditables():
    return render_template('/main/Peditables.html')

@app.route('/Pagos')
def Pagos():
    return render_template('/main/Pagos.html')

@app.route('/Turnos')
def Turnos():
    return render_template('/main/Turnos.html')

@app.route('/Balances')
def Balances():
    return render_template('/main/Balances.html')

@app.route('/Ajustes')
def Ajustes():
    return render_template('/main/Ajustes.html')


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')