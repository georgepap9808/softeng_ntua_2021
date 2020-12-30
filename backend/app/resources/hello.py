from flask_restful import Resource
from webargs import fields, validate
from webargs.flaskparser import use_args
#from app.models import  db#, ma
#from app.resources.auth import requires_auth
#from sqlalchemy import func


class HelloWorldResource(Resource):
    @use_args({})
    def get(self, args):
        return {"message":"hello world"}
