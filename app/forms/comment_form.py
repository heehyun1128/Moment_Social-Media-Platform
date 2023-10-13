from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

# class CommentForm(FlaskForm):
#   content =TextAreaField('content',validators=[DataRequired(),Length(max=1000)])
class CommentForm(FlaskForm):
  content =TextAreaField('content',validators=[Length(max=1000)])


  def validate_content(form,field):
      if len(field.data)>1000:
        raise ValidationError('Comment content cannot exceed 1000 characters')

