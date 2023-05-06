from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.paquetes  import paquetes, paquetesSchema

routes_paquetes = Blueprint("routes_paquetes", __name__)

paquete_schema = paquetesSchema()
paquetes_schema = paquetesSchema(many=True)

@routes_paquetes.route('/paquetes', methods=['GET'])
def obtenerpaquetes():    
    returnall = paquetes.query.all()
   
    resultado_paquetes = paquetes_schema.dump(returnall)
    return jsonify(resultado_paquetes)

@routes_paquetes.route('/guardarpaq', methods=['POST'])
def guardarpaq():    
    newpaquetes = request.json['Nombre','Descripcion','Valor']
    new_paq = paquetes(newpaquetes)
    db.session.add(new_paq)
    db.session.commit()
    return redirect('/paquetes')

@routes_paquetes.route('/eliminarpaquetes/<id>', methods=['GET'] )
def eliminarPaq(id):
    paq = paquetes.query.get(id)
    db.session.delete(paq)
    db.session.commit()
    return jsonify(paquetes_schema.dump(paq)) 

@routes_paquetes.route('/actualizarpaquetes', methods=['POST'] )
def actualizarpaquetes():
    id = request.json['id']
    paq = request.json['Nombre','Descripcion','Valor']
    pusuario = paquetes.query.get(id)
    pusuario.Nombre_proveedor = paq
    db.session.commit()
    return redirect('/paquetes')