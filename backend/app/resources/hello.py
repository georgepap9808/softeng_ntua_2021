from flask_restful import Resource,reqparse
#from flask import request
import werkzeug
from webargs import fields, validate
from app.models import User,db
from webargs.flaskparser import use_args
from app.models import  db, User
from sqlalchemy.exc import IntegrityError
from app.resources.auth import requires_auth,requires_admin
#from sqlalchemy import func


class HelloWorldResource(Resource):
    

    def get(self  ):  
        """
        db.session.add(User(
            username = "markakisn",
            is_admin = True, 
            password = "yay123",
            first_name = 'nikolaos',
            last_name = 'markakis',
            country='greece',
            city = 'athens',
            street = 'kapodistriou',
            number = 123,
            zip_code = '18324'))
        
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return custom_error('some sql error',[str(e._message)])
            #return custom_error('email', ['email already in use']), ErrorCode.BAD_REQUEST


        return {'message': 'OK'}
        """
        """
        parse = reqparse.RequestParser()
        parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
        args = parse.parse_args()

        f = args['file']
        f.save("testfileupload.csv")
        """
        """            
        u = User(username = 'nikos',is_admin = True, password= 'yay123',token = None, first_name = 'nikolaos', last_name = 'markakis',country = 'gr', city = 'athens', street = 'malakismenou', number = 2, zip_code = '12311')
        db.session.add(u)
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            return {'some sql error':str(e._message)}
            #return custom_error('email', ['email already in use']), ErrorCode.BAD_REQUEST
            
        try:
            db.session.execute("select 1;")
        except Exception as e: 
            return {"error": str(e)}
        """
        #        return {'message':str(f)}
