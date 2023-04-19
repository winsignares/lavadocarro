from db import db, app, ma 

class servicios(db.Model):
    __tablename__ = "tbservicios"

    
    id  = db.Column(db.Integer, primary_key=True)
    Descripcion = db.Column(db.String(250))
    

    def __init__(self, Descripcion):
        
        self.Descripcion = Descripcion
        
    
with app.app_context():
    db.create_all()

class serviciosSchema(ma.Schema):
    class Meta:
        fields = ('id','Descripcion')