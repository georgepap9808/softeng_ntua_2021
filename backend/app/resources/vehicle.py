from flask import request
from webargs.flaskparser import use_args
from webargs import fields, validate

from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.models import Vehicle, db
from app.resources.utils import custom_error, ErrorCode

from app.resources.auth import requires_auth

#REQUIRES LOGINNNNNNN
class RegisterVehicleResource(Resource):
    @use_args({
        'user_id':fields.Int(required=True),
        'registration_plate':fields.Str(required=True),
        'manufacturer':fields.Str(required=True),
        'model':fields.Str(required=True)
    })
    def post(self, args):
        vehicle = Vehicle(
            user_id = args['user_id'],
            registration_plate = args['registration_plate'],
            manufacturer = args['manufacturer'],
            model =  args['model']
        )

        db.session.add(vehicle)
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])

        return {"message":"OK"}

#REQUIRES LOGIIIIN
class GetUserVehiclesResource(Resource):
    @use_args({
        'user_id':fields.Int(required=True)
    })
    def get(self,args):
        vehicles = Vehicle.query.filter(Vehicle.user_id == args['user_id'])
        return vehicles