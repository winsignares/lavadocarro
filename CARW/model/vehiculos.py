from db import db, app, ma 

class vehiculos(db.Model):
    __tablename__ = "tblvehiculos"

    
    Matricula  = db.Column(db.String(50), primary_key=True)
    Modelo = db.Column(db.String(50))
    Color = db.Column(db.String(20))
    Tipo = db.Column(db.String(50))
    

    def __init__(self, Modelo,Color,Tipo ):
        
        self.Modelo = Modelo
        self.Color = Color
        self.Tipo = Tipo
        
    
with app.app_context():
    db.create_all()

class vehiculosSchema(ma.Schema):
    class Meta:
        fields = ('Matricula','Modelo','Color','Tipo')