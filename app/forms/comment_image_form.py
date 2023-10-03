from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField,IntegerField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.s3_helpers import ALLOWED_EXTENSIONS

class CommentImageForm(FlaskForm):
  comment_id=IntegerField(validators=[DataRequired()])
  comment_image = FileField("comment_image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])