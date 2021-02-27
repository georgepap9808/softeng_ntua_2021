from flask_restful import Api
from webargs.flaskparser import parser, abort
from app.resources.hello import HelloWorldResource
from app.resources.auth import LoginResource,RegisterResource,LogoutResource,GetUserDataResource
from app.resources.vehicle import VehicleResource
from app.resources.station import StationResource,SubmitRatingResource,StationByUserResource
from app.resources.provider import ProviderResource
from app.resources.helpers import HealthCheckResource,ResetSessionResource
from app.resources.session import SessionUploadResource,SessionsPerDateResource,SessionsPerEVResource,SessionsPerProviderResource,SessionsPerStationResource
from app.resources.bill import BillResource

@parser.error_handler
def handle_request_parsing_error(err, *_unused):
    abort(400, errors=err.messages)


api = Api(prefix='/evcharge/api')
api.add_resource(HelloWorldResource, '/hello')

api.add_resource(LoginResource,'/login')
api.add_resource(LogoutResource,'/logout')
api.add_resource(RegisterResource,'/admin/usermod/<username>/<password>')
api.add_resource(GetUserDataResource,'/admin/users/<username>')

api.add_resource(VehicleResource,'/vehicle')
api.add_resource(StationResource,'/station')
api.add_resource(StationByUserResource,'/stationByUser')
api.add_resource(SubmitRatingResource,'/station/rating')

api.add_resource(BillResource,'/bill')

api.add_resource(ProviderResource,'/provider')

api.add_resource(HealthCheckResource,'/admin/healthcheck')
api.add_resource(ResetSessionResource,'/admin/resetsessions')


api.add_resource(SessionUploadResource, '/admin/system/sessionsupd')

#to date na exei morfi 'yyyy-mm-dd' prosoxi sta 00 diladi theloume '2020-09-03' oxi  '2020-9-3'!!!!!!!!
api.add_resource(SessionsPerDateResource,'/SessionsPerDate/<date_from>/<date_to>')
api.add_resource(SessionsPerEVResource,'/SessionsPerEV/<date_from>/<date_to>')
api.add_resource(SessionsPerProviderResource,'/SessionsPerProvider/<date_from>/<date_to>')
api.add_resource(SessionsPerStationResource,'/SessionsPerStation/<date_from>/<date_to>')