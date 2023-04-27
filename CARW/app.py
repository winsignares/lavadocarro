from flask import Flask,  redirect, request, jsonify, json, session, render_template
from db import db, app, ma

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

#ubicacion de los html
app.register_blueprint(routes_login, url_prefix="/fronted")
app.register_blueprint(routes_principal, url_prefix="/fronted")

#------------------------------------------------

@app.route("/")
def index():
    titulo= "Pagina Princiapl"
    return render_template('/main/Principal.html', titles=titulo)

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')