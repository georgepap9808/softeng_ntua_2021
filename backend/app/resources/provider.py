from flask import request
from webargs.flaskparser import use_args
from webargs import fields, validate


import marshmallow
from marshmallow import post_dump

from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.models import Provider, db,ma,Session
from app.resources.utils import custom_error, ErrorCode

from app.resources.auth import requires_auth,requires_admin

import json

class ProviderSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Provider
        # Fields to be included in the output
        fields = ('id', 'name', 'kwh_cost')

provider_schema = ProviderSchema()

class AllProvidersResource(Resource):
    @requires_auth
    def get(self,token,is_admin):
        query = Provider.query
        res = query
        total = res.count()

        return{
            "total":total,
            "providers":provider_schema.dump(res.all(),many=True)
        }


class ProviderByUserResource(Resource):
    @requires_auth
    @use_args({    
        'id':fields.Int(required=True)
    },location='query')
    def get(self, args,token,is_admin):
        sub = Session.query.filter(Session.user_id == args['id']).all()
        ids = list(set([s.provider_id for s in sub]))
        
        query = Provider.query.filter(Provider.id.in_(list(ids) ))
        stat = query
        return {
            'total':stat.count(),
            'providers':provider_schema.dump(stat.all(),many=True)
        }

class ProviderResource(Resource):
    @requires_admin
    @use_args({
        'name':fields.Str(required=True),
        'kwh_cost':fields.Float(required=True)
    },location='query')
    def post(self,args,token,is_admin):
        provider = Provider(
            name = args['name'],
            kwh_cost = args['kwh_cost']
        )
        db.session.add(provider)

        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])

        return {'message': 'OK'}


    @requires_auth #??
    @use_args({    
        'id':fields.Int(required=True)
    },location='query')
    def get(self, args,token,is_admin):
        prov = Provider.query.filter(Provider.id == args['id']).first()
        return provider_schema.dump(prov)          

    @requires_admin
    @use_args({
        'id':fields.Int(required=True),
        'kwh_cost':fields.Float(required=True)
    },location='query')
    def put(self,args,token,is_admin):
        prov = Provider.query.filter(Provider.id== args['id']).first()
        prov.kwh_cost = args['kwh_cost']

        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])

        return {
            'message': 'OK',
            'new kwh': args['kwh_cost'] 
            }    

    @requires_admin
    @use_args({    
        'id':fields.Int(required=True)
    },location='query')
    def delete(self,args,token,is_admin):
        prov = Provider.query.get_or_404(args['id'])
        db.session.delete(prov)
        
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])

        return {'message': 'OK'}