from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.turnos  import turnos, turnosSchema

routes_turnos = Blueprint("routes_turnos", __name__)

turno_schema = turnosSchema()
turnos_schema = turnosSchema(many=True)