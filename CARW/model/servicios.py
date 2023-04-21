from db import db, app, ma 

class servicios(db.Model):
    __tablename__ = "tblservicios"

    
    id  = db.Column(db.Integer, primary_key=True)
    Titulo = db.Column(db.String(50))
    Descripcion = db.Column(db.String(250))
    

    def __init__(self,Titulo, Descripcion):
        
        self.Titulo = Titulo
        self.Descripcion = Descripcion
        
    
with app.app_context():
    db.create_all()

class serviciosSchema(ma.Schema):
    class Meta:
        fields = ('id','Titulo','Descripcion')