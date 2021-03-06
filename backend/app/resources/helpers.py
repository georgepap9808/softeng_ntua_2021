from flask import request
from webargs.flaskparser import use_args
from webargs import fields, validate
from flask import abort 

import marshmallow
from marshmallow import post_dump

from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.models import db,ma,Session
from app.resources.utils import custom_error, ErrorCode

from app.resources.auth import requires_auth,requires_admin

import json


class HealthCheckResource(Resource):
    @requires_admin
    def get(self,token,is_admin):         
        try:
            db.session.execute("select 1;")
            db.session.commit()
        except Exception as e: 
            return {"error": str(e)}
        return {'status': "OK"}
        

class ResetSessionResource(Resource):
    @requires_admin
    def post(self,token,is_admin):       
        try:
            db.session.execute("delete from session;")
            db.session.commit()
        except Exception as e: 
            return {"error": str(e)}
        return {'status': "OK"}
        