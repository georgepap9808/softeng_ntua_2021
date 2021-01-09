from flask import request
from webargs.flaskparser import use_args
from webargs import fields, validate


import marshmallow
from marshmallow import post_dump

from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.models import Vehicle, db,ma
from app.resources.utils import custom_error, ErrorCode

from app.resources.auth import requires_auth,requires_admin

import json


class VehicleSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Vehicle
        # Fields to be included in the output
        fields = ('user_id', 'registration_plate', 'manufacturer', 'model')
vehicle_schema = VehicleSchema()


class VehicleResource(Resource):
    @requires_auth
    @use_args({
        'user_id':fields.Int(required=True),
        'registration_plate':fields.Str(required=True),
        'manufacturer':fields.Str(required=True),
        'model':fields.Str(required=True)
    },location='query')
    def post(self, args,token,is_admin):
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

    @requires_auth
    @use_args({
        'user_id':fields.Int(required=True)
    },location='query')
    def get(self,args,token,is_admin):
        query = Vehicle.query
        query = query.filter(Vehicle.user_id == args['user_id'])
        total = query.count()

        return {
            "total":total,
            "vehicles": vehicle_schema.dump(query.all(),many = True)
        }


    @requires_auth  
    @use_args({    
        'registration_plate':fields.Str(required=True)
    },location='query')
    def delete(self,args,token,is_admin):
        veh = Vehicle.query.get_or_404(args['registration_plate'])
        db.session.delete(veh)
        
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])

        return {'message': 'OK'}

        