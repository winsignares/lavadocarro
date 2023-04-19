from db import db, app, ma 

class usuarios(db.Model):
    __tablename__ = "tblusuarios"

    
    Usuario = db.Column(db.String(50), primary_key=True)
    Nombre = db.Column(db.String(50))
    Apellido = db.Column(db.String(50))
    Correo = db.Column(db.String(100))
    Descripcion = db.Column(db.String(500))
    Telefono = db.Column(db.Integer)
    Contraseña = db.Column(db.String(20))
    id_vehiculo = db.Column(db.Integer, db.ForeignKey('tblvehiculos.id'))
    id_rol = db.Column(db.Integer, db.ForeignKey('tblroles.id'))
    

    def __init__(self, Nombre,Apellido,Correo,Telefono,Contraseña,id_vehiculo,id_rol ):
        
        self.Nombre = Nombre
        self.Apellido = Apellido
        self.Correo = Correo
        self.Telefono = Telefono
        self.Contraseña = Contraseña
        self.id_vehiculo = id_vehiculo
        self.id_rol = id_rol
        
    
with app.app_context():
    db.create_all()

class usuariosSchema(ma.Schema):
    class Meta:
        fields = ('Usuario','Nombre','Apellido','Correo','Telefono','Contraseña','id_vehiculo','id_rol')