from flask import Blueprint,request, jsonify
from flask_login import current_user, login_required
from openai import OpenAI
import os, json
from dotenv import load_dotenv
load_dotenv()


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

open_ai_routes = Blueprint('ai', __name__)

@open_ai_routes.route('/',methods=['POST'])
@login_required
def generate_post_info():
    data = request.get_json()
    if not data:
        return {"error": "Request data is missing or not JSON"}, 400
    title=data.get('title')
    
    if not title:
        return {"error": "Title is required"}, 400
    
    completion = client.chat.completions.create(model="gpt-3.5-turbo", messages=[
    {"role": "system", "content": "Please generate a post title and a post content based on user prompt in an object format with title and content as keys. Title should be less than 50 characters long and content should be less than 500 characters long"},
    {"role": "user", "content": title}])

    assistant_message=completion.choices[0].message.content if completion.choices else "No response from AI"
    res_data=json.loads(assistant_message)
    title=res_data.get('title')
    content=res_data.get('content')
    
    return jsonify({"title": title, "content": content}), 200
