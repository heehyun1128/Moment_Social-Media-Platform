from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

class PostForm(FlaskForm):
  title = StringField('title',validators=[DataRequired(),Length(max=100)])
  content=TextAreaField('content',validators=[DataRequired(),Length(max=1000)])

  def validate_title(form,field):
    if not field.data:
      raise ValidationError('Post title is required.')
    else:
      if len(field.data)>100:
        raise ValidationError('Post title cannot exceed 100 characters')
  def validate_content(form,field):
    if not field.data:
      raise ValidationError('Post content is required')
    else:
      if len(field.data)>1000:
        raise ValidationError('Post content cannot exceed 1000 characters')