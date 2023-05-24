from db import db, app, ma 

class turnos(db.Model):
    __tablename__ = "tblturnos"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_vehiculo = db.Column(db.String(50), db.ForeignKey('tblvehiculos.Matricula'))
    id_paquete = db.Column(db.Integer, db.ForeignKey('tblpaquetes.id'))

    

    def __init__(self ,id_vehiculo,id_paquete ):
        
        self.id_vehiculo = id_vehiculo
        self.id_paquete = id_paquete
        
    
with app.app_context():
    db.create_all()

class turnosSchema(ma.Schema):
    class Meta:
        fields = ('id','id_vehiculo','id_paquete')