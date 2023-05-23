from flask import Flask,  redirect, request, jsonify, json, session, render_template, url_for
from db import db, app, ma
import os

#generar llave y sesion
app.secret_key = os.urandom(24)

#----------------------datos de payu inicio-----------------------
#----------------------datos de payu fin--------------------------

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

#ubicacion de los html
app.register_blueprint(routes_login, url_prefix="/fronted")
app.register_blueprint(routes_principal, url_prefix="/fronted")
app.register_blueprint(routes_Ppredeterminados, url_prefix="/fronted")
app.register_blueprint(routes_Peditables, url_prefix="/fronted")
app.register_blueprint(routes_Pagos, url_prefix="/fronted")
app.register_blueprint(routes_Turnos, url_prefix="/fronted")


#------------------------------------------------

@app.route("/")
def index():
    titulo= "Pagina Princiapl"
    session['my_variable'] = 'initial_value'
    return render_template('/main/login.html', titles=titulo)

@app.route('/update_session', methods=['POST'])
def update_session():
    new_value = request.json['new_value']
    session['my_variable'] = new_value
    return jsonify({'success': True})

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
#----------------------parte de payu inicio-----------------------
@app.route('/Pagos', methods=['GET', 'POST'])
def pagos():
    if request.method == 'POST':
        api_key = "4Vj8eK4rloUd272L48hsrarnUA"
        merchant_id = request.form.get('merchantId')
        reference_code = request.form.get('referenceCode')
        tx_value = request.form.get('amount')
        new_value = "{:.2f}".format(float(tx_value))
        currency = request.form.get('currency')
        transaction_state = request.form.get('transactionState')
        firma_cadena = f"{api_key}~{merchant_id}~{reference_code}~{new_value}~{currency}~{transaction_state}"
        firmacreada = hashlib.md5(firma_cadena.encode()).hexdigest()
        firma = request.form.get('signature')
        reference_pol = request.form.get('reference_pol')
        cus = request.form.get('cus')
        extra1 = request.form.get('description')
        pse_bank = request.form.get('pseBank')
        lap_payment_method = request.form.get('lapPaymentMethod')
        transaction_id = request.form.get('transactionId')

        if transaction_state == '4':
            estado_tx = "Transacción aprobada"
        elif transaction_state == '6':
            estado_tx = "Transacción rechazada"
        elif transaction_state == '104':
            estado_tx = "Error"
        elif transaction_state == '7':
            estado_tx = "Pago pendiente"
        else:
            estado_tx = request.form.get('mensaje')

        if firma.upper() == firmacreada.upper():
            return render_template('pagos.html', estado_tx=estado_tx, transaction_id=transaction_id,
                                   reference_pol=reference_pol, reference_code=reference_code, tx_value=tx_value,
                                   currency=currency, extra1=extra1, lap_payment_method=lap_payment_method)
        else:
            return '<h1>Error validando la firma digital.</h1>'
    else:
        return '''
            <form method="post" action="/Pagos">
                <input name="merchantId" type="hidden" value="508029">
                <input name="accountId" type="hidden" value="512321">
                <input name="description" type="hidden" value="Test PAYU">
                <input name="referenceCode" type="hidden" value="TestPayU">
                <input name="amount" type="hidden" value="20000">
                <input name="tax" type="hidden" value="3193">
                <input name="taxReturnBase" type="hidden" value="16806">
                <input name="currency" type="hidden" value="COP">
                <input name="signature" type="hidden" value="7ee7cf808ce6a39b17481c54f2c57acc">
                <input name="test" type="hidden" value="0">
                <input name="buyerEmail" type="hidden" value="test@test.com">
                <input name="responseUrl" type="hidden" value="/Pagos">
                <input name="confirmationUrl" type="hidden" value="http://www.test.com/confirmation">
                <input name="Submit" type="image" src="{{ url_for('static', filename='img/boton_pagar_mediano.png') }}" alt="Enviar">
            </form>
        '''
#----------------------parte de payu fin--------------------------


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')