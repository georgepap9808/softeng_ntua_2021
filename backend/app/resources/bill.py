from flask import request
from webargs.flaskparser import use_args
from webargs import fields, validate

from sqlalchemy import create_engine

import marshmallow
from marshmallow import post_dump

from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.models import Bill,Session, db,ma
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
    #sessions = Session.query.filter(Session.user_id==user_id).order_by(Session.starting_time)

    bills = Bill.query.filter(Bill.user_id ==user_id).order_by(Bill.period_start_date.desc())


    engine = create_engine('sqlite:///app.db')
    con = engine.connect()
    rs = con.execute("select sum( (CAST( substr(finishing_time,12,2) AS INTEGER)-CAST(substr(starting_time,12,2) AS INTEGER))*kwh_cost ),substr(starting_time,0,8)  from session where user_id = ?  group by substr(starting_time,0,8) ;",(user_id))

    for r in rs:
        print(r)

    #if sessions.count() == 0:
    #    return

    

    
    """
    last_bill = bills.first()
    last_bill_date = '0000-00-00 00:00:00'

    if last_bill is not None:
        last_bill_date = last_bill.period_end_date

    for ses in sessions.all():
        #print(ses.starting_time[0:7]+'-00') 
        '''
        if ses.finishing_time > last_bill_date:
            b = Bill(
                user_id= int(user_id)
                period_start_date = ses.starting_time[0:7]+'-00'
                period_end_date = ses.starting_time[0:7]+'-31'   #tha einai panta 31 opote mhn tupwseis ending date sto frontend apla tupose oti e;inai gia ;ena mhna
                total_cost_ = #provlimaaa
                is_paid = Flase
            )
        '''
    """


    pass

class BillResource(Resource):
    @requires_auth
    @use_args({
        'user_id':fields.Int(required=True)
    },location = 'query')
    def get(self,args,token,is_admin):
        update_bills(args['user_id'])
        query = Bill.query
        res = query.filter(Bill.user_id == args['user_id']).order_by(Bill.period_start_date.desc())
        total = res.count()

        return{
            "total":total,
            "bills":bill_schema.dump(res.all(),many=True)
        }