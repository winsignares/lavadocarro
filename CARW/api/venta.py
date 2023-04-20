from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.usuarios  import usuarios, usuariosSchema

routes_usuarios = Blueprint("routes_usuarios", __name__)

usuario_schema = usuariosSchema()
usuarios_schema = usuariosSchema(many=True)