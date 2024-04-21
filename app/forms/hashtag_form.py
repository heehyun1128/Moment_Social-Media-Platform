from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired,ValidationError


class HashtagForm(FlaskForm):
#   description=StringField(validators=[DataRequired()])
  def validate_description(form, field):
      if len(field.data) > 30:
        raise ValidationError('Hashtags can not exceed 30 characters long')