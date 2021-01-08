from flask import request
from webargs.flaskparser import use_args
from webargs import fields, validate
from flask import abort 

import marshmallow
from marshmallow import post_dump

from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.models import db,ma
from app.resources.utils import custom_error, ErrorCode

from app.resources.auth import requires_auth

import json


class HealthCheckResource(Resource):
    @requires_auth
    def get(self,token,is_admin):
        if is_admin: 
            try:
                db.session.execute("select 1;")
            except Exception as e: 
                return {"error": str(e)}
            return {'status': "OK"}
        else:
            abort(401)

class ResetSessionResource(Resource):
    @requires_auth
    def post(self,token,is_admin):
        if is_admin: 
            try:
                db.session.execute("delete * from session;")
            except Exception as e: 
                return {"error": str(e)}
            return {'status': "OK"}
        else:
            abort(401)