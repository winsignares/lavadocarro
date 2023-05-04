from db import db, app, ma 

class servicios(db.Model):
    __tablename__ = "tblservicios"

    
    id  = db.Column(db.Integer, primary_key=True)
    Valor = db.Column(db.Integer)
    Descripcion = db.Column(db.String(250))
    

    def __init__(self,Valor, Descripcion):
        
        self.Valor = Valor
        self.Descripcion = Descripcion
        
    
with app.app_context():
    db.create_all()

class serviciosSchema(ma.Schema):
    class Meta:
        fields = ('id','Valor','Descripcion')