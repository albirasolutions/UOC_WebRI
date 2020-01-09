import boto3
import json
"""logger = logging.getLogger()
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
        download_path = '/tmp/{}.json'.format(uuid.uuid4())
        logger.info('## DOWNLOAD PATH')
        logger.info(download_path)
        s3_client.download_file(bucket, key, download_path)
        f=open(download_path, "r")
        if f.mode == 'r':
           contents = f.read()
           logger.info('## JSON CONTENT')
           logger.info(contents)
        f.close()
        cloudsearch_client.upload_documents(documents=download_path, contentType='application/json')
"""
def test(event,context):
    body={
        "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        #"input": event
    }

    response ={
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

def search(event,context):
    client = boto3.client('cloudsearchdomain', endpoint_url='https://search-webri-2dz3yckt2f5cjq7hcsbois6nw4.eu-west-1.cloudsearch.amazonaws.com')
    args= event['queryStringParameters']
    simple=args['simple']
    if simple:
        response = client.search(
        query= simple,
        queryParser='simple')
        ret={
        "statusCode":200,
        "body": json.dumps(response)}
        return ret

    ret={
        "statusCode":200,
        "body": "Treballant en consultes estructurades"}
    return ret
