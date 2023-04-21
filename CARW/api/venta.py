from flask import Blueprint, request, jsonify, json
from db import db, app, ma
from flask import Flask,  redirect, request, jsonify, json, session, render_template
from model.ventas import ventas, ventasSchema

routes_ventas = Blueprint("routes_ventas", __name__)

venta_schema = ventasSchema()
ventas_schema = ventasSchema(many=True)