import boto3
import os
import sys
import uuid
from urllib.parse import unquote_plus

s3_client = boto3.client('s3')

def upload(event, context):

    cloudsearch_client = boto3.client("cloudsearchdomain", endpoint_url=os.environ['CLOUDSEARCH_DOMAIN'])
    
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = unquote_plus(record['s3']['object']['key'])
        download_path = '/tmp/{}{}'.format(uuid.uuid4(), key)
        s3_client.download_file(bucket, key, download_path)
        cloudsearch_client.upload_documents(documents=download_path, contentType='application/json')