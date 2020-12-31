from flask import request
from webargs.flaskparser import use_args
from webargs import fields, validate

from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from app.models import User, db
from app.resources.utils import custom_error, ErrorCode


def requires_auth(f):
    pass


def _login(user):
    '''
    Actually log the user in.
    :param user: an User instance already in the db, but not already logged in
        (user.token should be None).
    '''
    while True:
        #user.token = token_urlsafe(20)
        try:
            db.session.commit()
            break
        except IntegrityError:
            db.session.rollback()
            # token collision

class LoginResource(Resource):
    @use_args({
        'email': fields.Str(required=True),
        'password': fields.Str(required=True)#,
#        'format': fields.Str(missing='json', location='query', validate=validate.Equal('json'))
    })
    def post(self, args):
        user = User.query.filter(User.email == args['email']).first()
        if not user:
            return custom_error('username', ['Invalid username']), ErrorCode.BAD_REQUEST
        elif not user.verify_password(args['password']):
            return custom_error('password', ['Wrong password']), ErrorCode.BAD_REQUEST
                
        _login(user)

        return {'id': user.id}


class RegisterResource(Resource):
    @use_args({
        'email': fields.Str(required=True),
        'is_admin': fields.Bool(required=True),
        'password': fields.Str(required=True, validate=validate.Length(min=1)),
        'first_name': fields.Str(required=True),
        'last_name': fields.Str(required=True),
        'country': fields.Str(required=True),
        'city': fields.Str(required=True),
        'street': fields.Str(required=True),
        'number': fields.Int(required=True),
        'zip_code': fields.Str(required=True)
 #       'format': fields.Str(missing='json', location='query', validate=validate.Equal('json'))
    })
    def post(self, args):
        user = User(
            email=args['email'], 
            is_admin = args['is_admin'],
            password=args['password'],
            first_name = args['first_name'],
            last_name = args['last_name'],
            country = args['country'],
            city = args['city'],
            street = args['street'],
            number = args['number'],
            zip_code =  args['zip_code']
            )
        db.session.add(user)
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])
            #return custom_error('email', ['email already in use']), ErrorCode.BAD_REQUEST

        return {'message': 'OK'}