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
    profile_image_url = FileField("Image File", validators=[ FileAllowed(list(ALLOWED_EXTENSIONS))])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email(),user_exists])
    password = StringField('password', validators=[DataRequired()])

    def validate_password(form,field):
        if len(field.data)<4:
            raise ValidationError('Password cannot be shorter than 4 characters.')
        if not any(char.isalpha() for char in field.data):
            raise ValidationError('Password must contain at least one letter.')
        if not any(char.isupper() for char in field.data):
            raise ValidationError('Password must contain at least one uppercase character.')
        if not any(char.isdigit() for char in field.data):
            raise ValidationError(('Password must contain at least one number.'))
    def validate_username(form,field):
        if len(field.data)<4:
            raise ValidationError('Username cannot be shorter than 4 characters.')