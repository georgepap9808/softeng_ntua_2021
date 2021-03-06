from flask import request
from webargs.flaskparser import use_args
from webargs import fields, validate


import marshmallow
from marshmallow import post_dump

from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.models import Card, db,ma
from app.resources.utils import custom_error, ErrorCode

from app.resources.auth import requires_auth,requires_admin

import json


class CardSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Card
        # Fields to be included in the output
        fields = ('user_id', 'card_number', 'card_expiration', 'cvc_code')
card_schema = CardSchema()


class CardResource(Resource):
    @requires_auth
    @use_args({
        'user_id':fields.Int(required=True),
        'card_number':fields.Str(required=True),
        'card_expiration':fields.Str(required=True),
        'cvc_code':fields.Int(required=True)
    },location='query')
    def post(self, args,token,is_admin):
        card = Card(
            user_id = args['user_id'],
            card_number = args['card_number'],
            card_expiration = args['card_expiration'],
            cvc_code = args['cvc_code']
        )

        db.session.add(card)
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
        query = Card.query
        query = query.filter(Card.user_id == args['user_id'])
        total = query.count()

        return {
            "total":total,
            "cards": card_schema.dump(query.all(),many = True)
        }


    @requires_auth  
    @use_args({    
        'registration_plate':fields.Str(required=True)
    },location='query')
    def delete(self,args,token,is_admin):
        c = Card.query.get_or_404(args['card_number'])
        db.session.delete(c)
        
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])

        return {'message': 'OK'}