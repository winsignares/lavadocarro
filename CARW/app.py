from flask import Flask,  redirect, request, jsonify, json, session, render_template, url_for
from db import db, app, ma
import os
from flask_session import Session


#generar llave y sesion
app.secret_key = os.urandom(24)
app.secret_key = 'DRAGONFORCE'

#----------------------jwt inicio-----------------------
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
from rutas.Recovery import routes_Recovery

#ubicacion de los html
app.register_blueprint(routes_login, url_prefix="/fronted")
app.register_blueprint(routes_principal, url_prefix="/fronted")
app.register_blueprint(routes_Ppredeterminados, url_prefix="/fronted")
app.register_blueprint(routes_Peditables, url_prefix="/fronted")
app.register_blueprint(routes_Pagos, url_prefix="/fronted")
app.register_blueprint(routes_Turnos, url_prefix="/fronted")
app.register_blueprint(routes_Balances, url_prefix="/fronted")
app.register_blueprint(routes_Ajustes, url_prefix="/fronted")
app.register_blueprint(routes_Recovery, url_prefix="/fronted")


#------------------------------------------------
@app.route('/verificar_usuario', methods=['POST'])
def verificar_usuario():
    ROL_usuario = request.form['rol']
    if int(ROL_usuario) > 0:
        session['userROL'] = ROL_usuario
        return render_template('/main/Principal.html')
    return redirect(url_for("index"))

@app.route('/Principal')
def principal():
    if 'userROL' in session and int(session['userROL']) > 0:
        return render_template('/main/Principal.html')
    return redirect(url_for("index"))

@app.route('/Recovery')
def Recovery():
    return render_template('/main/Recovery.html')

@app.route("/")
def index():
    session['userROL'] = 0
    titulo = "Pagina Principal"
    return render_template('/main/login.html', titles=titulo)

@app.route('/Ppredeterminados')
def Paquetes_predeterminados():
    if 'userROL' in session and int(session['userROL']) > 0:
        return render_template('/main/Ppredeterminados.html')
    return redirect(url_for("index"))

@app.route('/Peditables')
def Peditables():
    if 'userROL' in session and int(session['userROL']) > 0:
        userROL = int(session['userROL'])
        if userROL == 3:
            return render_template('/main/Principal.html', mostrar_alerta=True)
        return render_template('/main/Peditables.html')
    return redirect(url_for("index"))

@app.route('/Pagos')
def Pagos():
    if 'userROL' in session and int(session['userROL']) > 0:
        userROL = int(session['userROL'])
        if userROL == 3:
            return render_template('/main/Ppredeterminados.html', mostrar_alerta=True)
        return render_template('/main/Pagos.html')
    return redirect(url_for("index"))

@app.route('/Turnos')
def Turnos():
    if 'userROL' in session and int(session['userROL']) > 0:
        userROL = int(session['userROL'])
        if userROL == 3:
            return render_template('/main/Principal.html', mostrar_alerta=True)
        return render_template('/main/Turnos.html')
    return redirect(url_for("index"))

@app.route('/Balances')
def Balances():
    if 'userROL' in session and int(session['userROL']) > 0:
        userROL = int(session['userROL'])
        if userROL == 3:
            return render_template('/main/Principal.html', mostrar_alerta=True)
        return render_template('/main/Balances.html')
    return redirect(url_for("index"))

@app.route('/Ajustes')
def Ajustes():
    if 'userROL' in session and int(session['userROL']) > 0:
        userROL = int(session['userROL'])
        if userROL == 3 or userROL == 2:
            return render_template('/main/Principal.html', mostrar_alerta=True)
        return render_template('/main/Ajustes.html')
    return redirect(url_for("index"))


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')