from db import db, app, ma 

class ventas(db.Model):
    __tablename__ = "tblventas"

    
    Fecha = db.Column(db.Date, primary_key=True)
    id_vehiculo = db.Column(db.String(50), db.ForeignKey('tblvehiculos.Matricula'))
    id_paquete = db.Column(db.Integer, db.ForeignKey('tblpaquetes.id'))
    Total = db.Column(db.Integer)
    Descripcion = db.Column(db.String(5000))

    

    def __init__(self ,id_vehiculo,id_paquete,Total,Vendedor ):
        
        self.id_vehiculo = id_vehiculo
        self.id_paquete = id_paquete
        self.Total = Total
        self.Vendedor = Vendedor
        
    
with app.app_context():
    db.create_all()

class ventasSchema(ma.Schema):
    class Meta:
        fields = ('Fecha','id_vehiculo','id_paquete','Total','Vendedor')