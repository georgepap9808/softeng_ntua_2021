from flask_restful import Api
#from webargs.flaskparser import parser, abort
from app.resources.hello import HelloWorldResource
from app.resources.auth import LoginResource,RegisterResource
from app.resources.vehicle import RegisterVehicleResource,GetUserVehiclesResource


##@parser.error_handler
##def handle_request_parsing_error(err, *_unused):
##    abort(400, errors=err.messages)


api = Api(prefix='/evcharging/api')
api.add_resource(HelloWorldResource, '/hello')

api.add_resource(LoginResource,'/login')
api.add_resource(RegisterResource,'/register')

api.add_resource(RegisterVehicleResource,'/vehicle/register_vehicle')
api.add_resource(GetUserVehiclesResource,'/vehicle/get_user_vehicles')

