from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.paquetes  import paquetes, paquetesSchema

routes_paquetes = Blueprint("routes_paquetes", __name__)

paquete_schema = paquetesSchema()
paquetes_schema = paquetesSchema(many=True)