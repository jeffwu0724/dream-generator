from fastapi import FastAPI
from typing import List, Optional
from DreamList import add_dream, edit_dream, fetch_dream, fetch_dreams, delete_dream
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()
handler = Mangum(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/add_dream")
async def add_dream_api(keyword:str, story:str, picture_url:str):
    print(f"keyword: {keyword}")
    print(f"story: {story}")
    print(f"picture_url: {picture_url}")
    response = await add_dream(keyword, story, picture_url)
   
    return response


@app.get("/edit_dream")
async def edit_dream_api(dream_id:str, keyword:str, story:str, picture_url:str):
    print(f"dream_id: {dream_id}")
    print(f"keyword: {keyword}")
    print(f"story: {story}")
    print(f"picture_url: {picture_url}")
    response = await edit_dream(dream_id,keyword, story, picture_url)
   
    return response

@app.get("/fetch_dream")
async def fetch_dream_api(dream_id:str):
    print(f"dream_id: {dream_id}")
    response = await fetch_dream(dream_id)
   
    return response

@app.get("/fetch_dreams")
async def fetch_dreams_api():
    response = await fetch_dreams()
    return response

@app.get("/delete_dream")
async def delete_dream_api(dream_id:str):
    print(f"dream_id: {dream_id}")
    response = await delete_dream(dream_id)
   
    return response


@app.get("/")
async def root():
    return {"message": "FastAPI ↔ DynamoDB Direct Access Example"}
