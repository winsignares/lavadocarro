from flask import Flask,  redirect, request, jsonify, json, session, render_template
from db import db, app, ma

#importar routes
from api.paquete import routes_paquetes

#ubicacion del api 
app.register_blueprint(routes_paquetes, url_prefix="/api")