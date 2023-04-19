from db import db, app, ma 

class roles(db.Model):
    __tablename__ = "tblroles"

    
    id  = db.Column(db.Integer, primary_key=True)
    Rol = db.Column(db.String(50))
    

    def __init__(self, Rol):
        
        self.Rol = Rol
        
    
with app.app_context():
    db.create_all()

class rolesSchema(ma.Schema):
    class Meta:
        fields = ('id','Rol')