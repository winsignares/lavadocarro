from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.servicios  import servicios, serviciosSchema

routes_servicios = Blueprint("routes_servicios", __name__)

servicio_schema = serviciosSchema()
servicios_schema = serviciosSchema(many=True)