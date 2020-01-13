import boto3
import json

def test(event,context):
    args= event['queryStringParameters']
    prova=args.get('simple')
    body={
        "message": prova
    }

    response ={
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

def search(event,context):
    client = boto3.client('cloudsearchdomain', endpoint_url='https://search-webri-2dz3yckt2f5cjq7hcsbois6nw4.eu-west-1.cloudsearch.amazonaws.com')
    args= event['queryStringParameters']
    simple=args.get('simple')
    if simple:
        response = client.search(
        query= simple,
        queryParser='simple')
        ret={
        "statusCode":200,
        "body": json.dumps(response)}
        return ret
    if

    ret={
        "statusCode":200,
        "body": "Treballant en consultes estructurades"}
    return ret
