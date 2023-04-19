from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.roles  import roles, rolesSchema

routes_roles = Blueprint("routes_roles", __name__)

rol_schema = rolesSchema()
roles_schema = rolesSchema(many=True)