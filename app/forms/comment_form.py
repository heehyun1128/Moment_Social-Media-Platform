from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

class CommentForm(FlaskForm):
  content =TextAreaField('Content',validators=[DataRequired()])
