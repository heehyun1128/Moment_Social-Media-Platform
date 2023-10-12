from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

# class CommentForm(FlaskForm):
#   content =TextAreaField('content',validators=[DataRequired(),Length(max=1000)])
class CommentForm(FlaskForm):
  content =TextAreaField('content',validators=[Length(max=10000)])


  def validate_content(form,field):
      if len(field.data)>10000:
        raise ValidationError('Post content cannot exceed 10000 characters')

