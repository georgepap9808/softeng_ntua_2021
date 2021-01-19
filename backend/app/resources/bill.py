from flask import request
from webargs.flaskparser import use_args
from webargs import fields, validate


import marshmallow
from marshmallow import post_dump

from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.models import Bill, db,ma
from app.resources.utils import custom_error, ErrorCode

from app.resources.auth import requires_auth,requires_admin

import json

class BillSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Bill
        # Fields to be included in the output
        fields = ('id','user_id','period_start_date','period_end_date','total_cost','is_paid')
bill_schema =BillSchema()

def update_bills(user_id):
    #TO BE IMPLEMENTED
    pass

class Bill(Resource):
    @requires_auth
    @user_args({
        'user_id':fields.Int(required=True)
    },location = 'qurey')
    def get(self,args,token,is_admin)
        update_bills(args['user_id'])
        query = Bill.query
        res = query.filter(Bill.user_id == args['user_id']).order_by(Bill.period_end_date).desc()
        total = res.count()

        return{
            "total":total,
            "bills":bill_schema.dump(res.all(),many=True)
        }