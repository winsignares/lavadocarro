from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.vehiculos  import vehiculos, vehiculosSchema

routes_vehiculos = Blueprint("routes_vehiculos", __name__)

vehiculo_schema = vehiculosSchema()
vehiculos_schema = vehiculosSchema(many=True)