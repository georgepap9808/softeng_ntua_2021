from flask import request
from webargs.flaskparser import use_args
from webargs import fields, validate


import marshmallow
from marshmallow import post_dump

from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.models import Station, db,ma,User,Session
from app.resources.utils import custom_error, ErrorCode

from app.resources.auth import requires_auth,requires_admin

import json

class StationSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Station
        # Fields to be included in the output
        fields = ('id', 'country', 'city', 'street','number','avg_rating','num_ratings')

station_schema = StationSchema()


class AllStationsResource(Resource):
    @requires_auth
    def get(self,token,is_admin):
        query = Station.query
        res = query
        total = res.count()

        return{
            "total":total,
            "stations":station_schema.dump(res.all(),many=True)
        }


class StationResource(Resource):
    @requires_admin
    @use_args({
        'country':fields.Str(required=True),
        'city':fields.Str(required=True),
        'street':fields.Str(required=True),
        'number':fields.Int(required=True)
    },location='query')
    def post(self,args,token,is_admin):
        station = Station(
            country = args['country'],
            city = args['city'],
            street = args['street'],
            number = args['number']
            )
        db.session.add(station)

        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])

        return {'message': 'OK'}

    @requires_auth
    @use_args({    
        'id':fields.Int(required=True)
    },location='query')
    def get(self, args,token,is_admin):
        stat = Station.query.filter(Station.id == args['id']).first()
        return station_schema.dump(stat)

    @requires_admin
    @use_args({    
        'id':fields.Int(required=True)
    },location='query')
    def delete(self,args,token,is_admin):
        stat = Station.query.get_or_404(args['id'])
        db.session.delete(stat)
        
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])

        return {'message': 'OK'}

class StationByUserResource(Resource):
    @requires_auth
    @use_args({    
        'id':fields.Int(required=True)
    },location='query')
    def get(self, args,token,is_admin):
        sub = Session.query.filter(Session.user_id == args['id']).all()
        ids = list(set([s.station_id for s in sub]))
        
        query = Station.query.filter(Station.id.in_(list(ids) ))
        stat = query
        return {
            'total':stat.count(),
            'stations':station_schema.dump(stat.all(),many=True)
        }

#requires login from user
class SubmitRatingResource(Resource):
    @requires_auth
    @use_args({
        "id":fields.Int(required=True),
        "rating":fields.Int(required=True)
    },location='query')
    def post(self,args,token,is_admin):
        stat = Station.query.filter(Station.id == args['id']).first()
        n = stat.num_ratings 
        avg = 0 if stat.avg_rating == None else stat.avg_rating
        new_rating = (n* + args['rating'])/(n+1)
        stat.avg_rating = new_rating 
        stat.num_ratings = n +1 

        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])

        return {
            'message': 'OK',
            'new rating': new_rating 
            }
