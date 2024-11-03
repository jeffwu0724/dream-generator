from fastapi import FastAPI
from typing import Optional
from DreamGenerator import dream_enriched_story_generator, dream_picture_generator
from mangum import Mangum

app = FastAPI()
handler = Mangum(app)
class StoryState:
    def __init__(self):
        self.enriched_story: Optional[str] = None

app.state.story_manager = StoryState()


@app.get("/generate_story")
async def generate_story_api(story:str):
    print(f"Received story: {story}")
    enriched_story = dream_enriched_story_generator(story)
    print(f"enriched_story: {enriched_story}")
    app.state.story_manager.enriched_story = enriched_story
    return {"enriched_story" : enriched_story, "picture_url": None}

@app.get("/generate_picture")
async def generate_picture_api():
    # print(enriched_story)
    picture_url = dream_picture_generator(app.state.story_manager.enriched_story)
    return {"enriched_story" : None, "picture_url": picture_url}

@app.get("/generate_story_and_picture")
async def generate_story_and_picture_api(story:str):
    enriched_story = dream_enriched_story_generator(story)
    picture_url = dream_picture_generator(enriched_story)
    return {"enriched_story" : enriched_story, "picture_url": picture_url}

# fastapi dev DreamGenerator_api.py