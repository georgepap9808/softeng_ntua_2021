from flask import request
import werkzeug
from flask_restful import reqparse
from webargs.flaskparser import use_args
from webargs import fields, validate
import time
import datetime

import marshmallow
from marshmallow import post_dump

from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.models import Session, db,ma
from app.resources.utils import custom_error, ErrorCode

from app.resources.auth import requires_auth,requires_admin

import json 
import csv
import os


def parse_datetime(s):
    return datetime.datetime(int(s[0:4]),int(s[5:7]),int(s[8:10]),int(s[11:13]),int(s[14:16]),0)

def parse_date(s):
    return datetime.date(int(s[0:4]),int(s[5:7]),int(s[8:10]))

class SessionUploadResource(Resource):


    
    @requires_admin
    def post(self, token,is_admin):
        parse = reqparse.RequestParser()
        parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files',required=True)
        args = parse.parse_args()
        f = args['file']
        #f.save("testfileupload.csv")
        if not os.path.isdir("files/"):
            os.mkdir("files/")
        
        path = "files/"+str(time.time())
        f.save(path)

        f = open(path,mode = "r")
        reader = csv.reader(f)
        next(reader,None)

        count = 0
        file_count = sum(1 for row in reader)
        f.close()

        f = open(path,mode = "r")
        reader = csv.reader(f)
        next(reader,None)

        for row in reader: 
            sess = Session(
                user_id = int(row[0]),
                station_id = int(row[1]),
                registration_plate = row[2],
                starting_time = parse_datetime(row[3]),
                finishing_time = parse_datetime( row[4]),
                kwh_cost = float(row[5]), 
                provider_id = int(row[6])
                )
            
            try: 
                db.session.add(sess)
                db.session.commit()
                count=count+1
            except IntegrityError as e:
                db.session.rollback()
                return custom_error('some sql error',[str(e._message)])
                
        
        total = db.session.query(Session).count()
        return {
            "SessionsInUploadedFile":file_count,
            "SessionsImported":count,
            "TotalSessionsInDatabase":total
        }


class SessionSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Session
        # Fields to be included in the output
        fields = ('id','station_id','registration_plate','user_id','starting_time','finishing_time','kwh_cost','provider_id' )
session_schema =SessionSchema()


class SessionsPerDateResource(Resource): 
    @requires_auth
    @use_args({
        'id':fields.Int(required=True)
    },location = 'query')
    def get(self, args , token , is_admin,date_from,date_to):
        query = Session.query
        res = query.filter(Session.user_id == args['id'],Session.starting_time < parse_date(date_to),Session.starting_time > parse_date(date_from))
        total = res.count()

        return{
            "total":total,
            "sessions":session_schema.dump(res.all(),many=True)
        }