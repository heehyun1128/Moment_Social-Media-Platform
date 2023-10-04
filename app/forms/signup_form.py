from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

#aws
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.s3_helpers import ALLOWED_EXTENSIONS



def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    



class SignUpForm(FlaskForm):
    profile_image_url = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email(),user_exists])
    password = StringField('password', validators=[DataRequired()])

    # def validate_username(form,field):
    #     if not field.data:
    #         raise ValidationError('Username is required.')
    # def validate_first_name(form,field):
    #     if not field.data:
    #         raise ValidationError('First name is required.')
    # def validate_last_name(form,field):
    #     if not field.data:
    #         raise ValidationError('Last name is required.')
    # def validate_email(form,field):
    #     if not field.data:
    #         raise ValidationError('Email is required.')
    # def validate_password(form,field):
    #     if not field.data:
    #         raise ValidationError('Password is required.')