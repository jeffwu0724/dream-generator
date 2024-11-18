import imghdr
import boto3
import os
from uuid import uuid4
import json
import requests
from dotenv import load_dotenv

load_dotenv()

s3_client = boto3.client('s3')
# Prepare the DynamoDB client
dynamodb = boto3.resource("dynamodb")
s3 = boto3.resource("s3")
# table_name = os.environ['TABLE_NAME']
table = dynamodb.Table("generated_dream_table")
    

def lambda_handler(event, context):
    operation = event.get("operation")

    if operation == "add":
        return add_dream(event["keyword"], event["story"], event["picture_url"])
    elif operation == "edit":
        return edit_dream(event["dream_id"], event.get("keyword"), event.get("story"), event.get("picture_url"))
    elif operation == "fetch":
        return fetch_dream(event["dream_id"])
    elif operation == "delete":
        return delete_dream(event["dream_id"])
    else:
        return {"statusCode": 400, "body": "Invalid operation"}

async def add_dream(request):
    dream_id = str(uuid4())

     # Prepare S3 image key and bucket name
    image_key = f"dream-images/{dream_id}.png"
    S3_BUCKET_NAME = "openai-generated-image"

    # Fetch the image from the provided URL using requests
    response = requests.get(request.picture_url, stream=True)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch image: HTTP {request.picture_url}")
    # image_type = imghdr.what(None, response.raw)

    # Upload the image to S3
    try:
        bucket = s3.Bucket(S3_BUCKET_NAME)
        bucket.upload_fileobj(
            response.raw,
            image_key,
            # ExtraArgs={"ContentType": f"image/{image_type}"},
            ExtraArgs={"ACL": "public-read"})
        
        s3_url = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/{image_key}"
        print(f"Image uploaded to S3: {s3_url}")

    except ClientError as e:
        print(f"Error uploading to S3: {e}")
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "Failed to upload image to S3"})
        }

    table.put_item(
        Item={
            "dream_id": dream_id,
            "keyword": request.keyword,
            "story": request.story,
            "picture_url": s3_url
        }
    )
    return {"statusCode": 200, "body": json.dumps({"dream_id": dream_id, "url" : s3_url})}

async def edit_dream(dream_id, keyword=None, story=None, picture_url=None):
    update_expression = []
    expression_attribute_values = {}

    if keyword:
        update_expression.append("keyword = :keyword")
        expression_attribute_values[":keyword"] = keyword
    if story:
        update_expression.append("story = :story")
        expression_attribute_values[":story"] = story
    if picture_url:
        update_expression.append("picture_url = :picture_url")
        expression_attribute_values[":picture_url"] = picture_url

    if update_expression:
        table.update_item(
            Key={"dream_id": dream_id},
            UpdateExpression="SET " + ", ".join(update_expression),
            ExpressionAttributeValues=expression_attribute_values
        )
    return {"statusCode": 200, "body": "Dream updated"}

async def fetch_dream(dream_id):
    response = table.get_item(Key={"dream_id": dream_id})
    item = response.get("Item")
    if item:
        return {"statusCode": 200, "body": json.dumps(item)}
    else:
        return {"statusCode": 404, "body": "Dream not found"}

async def fetch_dreams():
    response = table.scan()
    print(response)
    # return {"statusCode": 404, "body": "Dream not found"}
    items = response["Items"]
    if items:
        return {"statusCode": 200, "body": json.dumps(items)}
    else:
        return {"statusCode": 404, "body": "Dream not found"}
    
async def delete_dream(dream_id):
    table.delete_item(Key={"dream_id": dream_id})
    return {"statusCode": 200, "body": "Dream deleted"}

if __name__ == "__main__":
    os.environ["TABLE_NAME"] = "generated_dream_table"
    test_event = {
        "operation": "fetch",
        "dream_id": "db938484-0928-4a35-9aaa-de9b9e9e057a",
        "keyword": "dream",
        "story": "I dreamed of flying!",
        "picture_url": "http://example.com/flying-dream.jpg"
    }
    result = lambda_handler(test_event, None)
    print(result)