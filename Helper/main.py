from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.requests import Request
from starlette.templating import Jinja2Templates
import shutil
import os
import base64
import requests
import json
import re

app = FastAPI()

# Google Cloud Vision API endpoint and API key
ENDPOINT_URL = 'https://vision.googleapis.com/v1/images:annotate'
api_key = "AIzaSyCOxNkK0N3jTNRXSN0ThHGf2R4frIIQr14"

# Function to create image data for OCR
def makeImageData(imgpath):
    img_req = None
    with open(imgpath, 'rb') as f:
        ctxt = base64.b64encode(f.read()).decode()
        img_req = {
            'image': {
                'content': ctxt
            },
            'features': [{
                'type': 'DOCUMENT_TEXT_DETECTION',
                'maxResults': 1
            }]
        }
    return json.dumps({"requests": img_req}).encode()

# Function to perform OCR using Google Cloud Vision API
def requestOCR(url, api_key, imgpath):
    imgdata = makeImageData(imgpath)
    response = requests.post(url,
                             data=imgdata,
                             params={'key': api_key},
                             headers={'Content-Type': 'application/json'})
    return response

# Function to process OCR result
def processOCR(img_code):
    result = requestOCR(ENDPOINT_URL, api_key, img_code)

    if result.status_code != 200 or result.json().get('error'):
        return {"error": "OCR processing failed"}
    else:
        # Extracted OCR information
        result = result.json()['responses'][0]['textAnnotations']
        original_text = result[0]['description']
        lines = original_text.split('\n')
        filtered_lines = [line for line in lines if re.search(r'[^\x00-\x7F]', line) is None]
        data_lines = filtered_lines

        # Extract relevant data
        identification_number = data_lines[0]
        name_line = data_lines[2].split('Name ')[1].strip()
        last_name = data_lines[3].split('Last name ')[1].strip()
        date_of_birth = data_lines[4].split('Date of Birth ')[1].strip()
        date_of_issue = data_lines[5]
        date_of_expiry = data_lines[9]

        # Convert to JSON format
        output_json = {
            "identification_number": identification_number,
            "name": name_line,
            "last_name": last_name,
            "date_of_birth": date_of_birth,
            "date_of_issue": date_of_issue,
            "date_of_expiry": date_of_expiry
        }

        return JSONResponse(content=output_json)

