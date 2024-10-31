from openai import OpenAI
import argparse
import os
from dotenv import load_dotenv
load_dotenv()

client = OpenAI()
NUM_OF_TOKENS = 150
print(os.getenv("OPENAI_API_KEY"))
# get the user input as the short description of the dream
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--input', type=str, required=True) 
    args = parser.parse_args()
    user_input = args.input
    enriched_story = dream_enriched_story_generator(user_input)
    dream_pic_url = dream_picture_generator(enriched_story)
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
    print(enriched_story)
    return enriched_story

def dream_picture_generator(enriched_story:str) -> str:
    # print(enriched_story)
    response = client.images.generate(
        model="dall-e-3",
        prompt= f"Please generate a detailed picture based on my story: {enriched_story}",
        size="1024x1024",
        quality="standard",
        n=1
    )
    picture_url = response.data[0].url
    # print(response.data[0].url)
    return picture_url

if __name__ == "__main__":
    main()


