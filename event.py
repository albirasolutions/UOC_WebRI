import boto3
import os
import sys
import uuid
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)
from urllib.parse import unquote_plus

s3_client = boto3.client('s3')

def upload(event, context):

    logger.info('## ENVIRONMENT VARIABLES')
    logger.info(os.environ)
    logger.info('## EVENT')
    logger.info(event)
    
    cloudsearch_client = boto3.client("cloudsearchdomain", endpoint_url="https://doc-webri-2dz3yckt2f5cjq7hcsbois6nw4.eu-west-1.cloudsearch.amazonaws.com")
    
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = unquote_plus(record['s3']['object']['key'])
        download_path = '/tmp/{}/{}'.format(uuid.uuid4(), key)
        logger.info('## DOWNLOAD PATH')
        logger.info(download_path)
        s3_client.download_file(bucket, key, download_path)
        logger.info('## DOWNLOAD PATH')
        logger.info(download_path)
        cloudsearch_client.upload_documents(documents=download_path, contentType='application/json')