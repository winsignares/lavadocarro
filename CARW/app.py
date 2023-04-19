from flask import Flask,  redirect, request, jsonify, json, session, render_template
from db import db, app, ma

#importar routes
from api.paquete import routes_paquetes
from api.rol import routes_roles
from api.servicio import routes_servicios
from api.vehiculo import routes_vehiculos
from api.servicio import routes_servicios
from api.servicio import routes_servicios
from api.servicio import routes_servicios

#ubicacion del api 
app.register_blueprint(routes_paquetes, url_prefix="/api")
app.register_blueprint(routes_roles, url_prefix="/api")
app.register_blueprint(routes_servicios, url_prefix="/api")
app.register_blueprint(routes_vehiculos, url_prefix="/api")
app.register_blueprint(routes_servicios, url_prefix="/api")
app.register_blueprint(routes_servicios, url_prefix="/api")
app.register_blueprint(routes_servicios, url_prefix="/api")