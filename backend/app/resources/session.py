from flask import request
import werkzeug
from flask_restful import reqparse
from webargs.flaskparser import use_args
from webargs import fields, validate
import time


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
        
        f.save("files/"+str(time.time()))

        print(str(f))
        return {
            "SessionsInUploadedFile":0,
            "SessionsImported":0,
            "TotalSessionsInDatabase":0,
            "content":0
        }