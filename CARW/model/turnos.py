from db import db, app, ma 

class turnos(db.Model):
    __tablename__ = "tblturnos"

    
    id = db.Column(db.String(50), primary_key=True)
    id_vehiculo = db.Column(db.String(50), db.ForeignKey('tblvehiculos.Matricula'))
    id_paquete = db.Column(db.Integer, db.ForeignKey('tblpaquetes.id'))
    Hora_inicio = db.Column(db.Time)
    Hora_Fin = db.Column(db.Time)

    

    def __init__(self ,id_vehiculo,id_paquete,Hora_inicio,Hora_Fin ):
        
        self.id_vehiculo = id_vehiculo
        self.id_paquete = id_paquete
        self.Hora_inicio = Hora_inicio
        self.Hora_Fin = Hora_Fin
        
    
with app.app_context():
    db.create_all()

class turnosSchema(ma.Schema):
    class Meta:
        fields = ('id','id_vehiculo','id_paquete','Hora_inicio','Hora_Fin')