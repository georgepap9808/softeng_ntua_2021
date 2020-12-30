from flask_restful import Api
#from webargs.flaskparser import parser, abort
from app.resources.hello import HelloWorldResource

##@parser.error_handler
##def handle_request_parsing_error(err, *_unused):
##    abort(400, errors=err.messages)


api = Api(prefix='/evcharging/api')
api.add_resource(HelloWorldResource, '/hello')
