import re
from typing import List
from openai import OpenAI
import argparse
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()
NUM_OF_TOKENS = 125
# get the user input as the short description of the dream
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--input', type=str, required=True) 
    args = parser.parse_args()
    user_input = args.input
    enriched_story = dream_enriched_story_generator(user_input)
    dream_pic_url = dream_picture_generator(enriched_story)
    keyword = dream_keyword_generator(user_input)
    print(dream_pic_url)

# generate the stroy to describe the dream better based on the user input
def dream_enriched_story_generator(story:str) -> str:
    
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Generate an enriched, detailed, creative story around {NUM_OF_TOKENS} words in the same language as this: {story}"
                # "content": f"Please generate generated a enriched creative story in the same languge I enter here, below is my story: {story}"
            }
        ]
    )

    enriched_story = completion.choices[0].message.content
    # print(enriched_story)
    return enriched_story

# generate the keyword of the story based on the user input
def dream_keyword_generator(story:str) -> List[str]:
    
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Can you please generate a few keywords based on the story {story}, and the keyword must be contained in the story and in the same language as the story"
            }
        ]
    )
    print(completion.choices[0].message.content)
    # Original keyword text
    keyword = completion.choices[0].message.content
    keyword = keyword.strip()

    # Split by commas, new lines, semicolons, or hyphens
    keyword_array = re.split(",|\n|;|-", keyword)

    # Remove numbering (like "1.", "2.") and extra spaces, and filter out empty elements
    keyword_array = [re.sub(r'^\d+\.\s*', '', k).lower().strip() for k in keyword_array if len(k.strip()) > 0]  
    print(keyword_array)
    return keyword_array

def dream_picture_generator(enriched_story:str):
    # print(enriched_story)
    response = client.images.generate(
        model="dall-e-3",
        prompt= f"Please generate a detailed picture based on my story: {enriched_story}",
        size="1024x1024",
        quality="standard",
        n=1
    )

    picture_url = response.data[0].url
    # print(picture_url)  # Debugging
    return picture_url

if __name__ == "__main__":
    main()


