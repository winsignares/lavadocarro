from flask import Flask, redirect, request, jsonify, json, session, render_template, url_for
from db import db, app, ma
import os

#generar llave y sesion
app.secret_key = os.urandom(24)

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

@app.route("/")
def index():
    titulo= "Pagina Princiapl"
    session['my_variable'] = 'initial_value'
    return render_template('/main/login.html', titles=titulo)

@app.route('/update_session', methods=['POST'])
def update_session():
    usuario = request.json['usuario']
    contrasena = request.json['contrasena']
    
    id_rol = verificar_credenciales(usuario, contrasena)
    if id_rol is not None:
        session['id_rol'] = id_rol
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})


@app.route('/Principal')
def principal():
    if 'id_rol' in session:
        return render_template('/main/Principal.html')
    else:
        return redirect(url_for('index'))
    
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

@app.route('/verificar_credenciales', methods=['POST'])
def verificar_credenciales():
    usuario = request.json['usuario']
    contrasena = request.json['contrasena']

    id_rol = verificar_credenciales(usuario, contrasena)
    if id_rol is not None:
        return jsonify({'success': True, 'id_rol': id_rol})
    else:
        return jsonify({'success': False})


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')