from flask import request
from webargs.flaskparser import use_args
from webargs import fields, validate

from sqlalchemy import create_engine,func

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


    last_bill = bills.first()
    last_bill_date = '0000-00-00 00:00:00'

    if last_bill is not None:
        last_bill_date = last_bill.period_end_date
    '''
    engine = create_engine('sqlite:///app.db')
    con = engine.connect()
    rs = con.execute("select sum( (CAST( substr(finishing_time,12,2) AS INTEGER)-CAST(substr(starting_time,12,2) AS INTEGER))*kwh_cost ) as cost ,substr(starting_time,0,8) as month  from session where user_id = ?  and substr(starting_time,0,8)>? group by substr(starting_time,0,8) ;",(user_id,last_bill_date))
    '''
    rs = db.session.query( func.sum(Session.kwh_delivered*Session.kwh_cost),func.substr(Session.starting_time,0,8)).group_by(func.substr(Session.starting_time,0,8)).filter(Session.user_id == user_id,Session.starting_time>last_bill_date)



    for r in rs:
        #print(r[0],r[1])
    
        b = Bill(
            user_id = user_id, 
            period_start_date = str(r[1])+'-00',
            period_end_date = str(r[1])+'-31',
            total_cost = r[0],
            is_paid = False
        )

        print(b)

        db.session.add(b)
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])
    
    
    



    

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

    @requires_auth
    @use_args({
        'bill_id':fields.Int(required=True)
    },location='query')
    def put(self,args,token,is_admin):
        
        b = Bill.query.filter(Bill.id == args['bill_id']).first()
        if b.is_paid: 
            return{
                "message":"bill already paid"
            }

        b.is_paid = True
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])

        return {
            'message': 'OK' 
            }    
    