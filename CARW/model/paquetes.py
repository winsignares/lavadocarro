from db import db, app, ma 

class paquetes(db.Model):
    __tablename__ = "tblpaquetes"

    
    id  = db.Column(db.Integer, primary_key=True)
    Descripcion = db.Column(db.String(500))
    Valor = db.Column(db.Integer)
    

    def __init__(self, Descripcion,Valor ):
        
        self.Descripcion = Descripcion
        self.Valor = Valor
        
    
with app.app_context():
    db.create_all()

class paquetesSchema(ma.Schema):
    class Meta:
        fields = ('id','Descripcion','Valor')