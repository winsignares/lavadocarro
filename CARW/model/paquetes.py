from db import db, app, ma 

class paquetes(db.Model):
    __tablename__ = "tblpaquetes"

    
    id  = db.Column(db.Integer, primary_key=True)
    Nombre = db.Column(db.String(50))
    Descripcion = db.Column(db.String(5000))
    Valor = db.Column(db.Integer)
    Duracion = db.Column(db.TIME)
    

    def __init__(self, Nombre,Descripcion,Valor,Duracion ):
        
        self.Nombre = Nombre
        self.Descripcion = Descripcion
        self.Valor = Valor
        self.Duracion = Duracion
        
    
with app.app_context():
    db.create_all()

class paquetesSchema(ma.Schema):
    class Meta:
        fields = ('id','Nombre','Descripcion','Valor','Duracion')