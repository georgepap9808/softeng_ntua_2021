from flask import request
from webargs.flaskparser import use_args
from webargs import fields, validate


import marshmallow
from marshmallow import post_dump

from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.models import Vehicle, db,ma
from app.resources.utils import custom_error, ErrorCode

from app.resources.auth import requires_auth

import json


class VehicleSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Vehicle
        # Fields to be included in the output
        fields = ('user_id', 'registration_plate', 'manufacturer', 'model')
vehicle_schema = VehicleSchema()

#REQUIRES LOGINNNNNNN
class VehicleResource(Resource):
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

    #requires logiiin
    @use_args({
        'user_id':fields.Int(required=True)
    })
    def get(self,args):
        query = Vehicle.query
        query = query.filter(Vehicle.user_id == args['user_id'])
        total = query.count()

        return {
            "total":total,
            "vehicles": vehicle_schema.dump(query.all(),many = True)
        }


    #requires LOGINNN   
    @use_args({    
        'registration_plate':fields.Str(required=True)
    })
    def delete(self,args):
        veh = Vehicle.query.get_or_404(args['registration_plate'])
        db.session.delete(veh)
        db.session.commit()
        return {"message":"OK"}

        