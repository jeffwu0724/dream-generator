import boto3
import os
from uuid import uuid4
import json
from dotenv import load_dotenv

load_dotenv()

# Prepare the DynamoDB client
dynamodb = boto3.resource("dynamodb")
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

async def add_dream(keyword, story, picture_url):
    dream_id = str(uuid4())
    table.put_item(
        Item={
            "dream_id": dream_id,
            "keyword": keyword,
            "story": story,
            "picture_url": picture_url
        }
    )
    return {"statusCode": 200, "body": json.dumps({"dream_id": dream_id})}

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