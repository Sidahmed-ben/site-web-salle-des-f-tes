from googleapiclient.discovery import build
import requests
from io import BytesIO
from PIL import Image
from dotenv import load_dotenv
import os


# Load the .env file
load_dotenv()

# Retrieve the API key from the environment variables
def get_image_dimensions(file_id, api_key):
    url = f"https://www.googleapis.com/drive/v3/files/{file_id}?alt=media&key={api_key}"
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()  # This will raise an HTTPError for bad responses
        image = Image.open(BytesIO(response.raw.read()))
        return image.size  # (width, height)
    except requests.exceptions.RequestException as e:
        print(f"HTTP request error for file ID {file_id}: {e}")
        return None
    except (IOError, SyntaxError) as e:
        print(f"Error processing image with file ID {file_id}: {e}, status code: {response.status_code}")
        return None

def list_files_in_folder(api_key, folder_id):
    service = build('drive', 'v3', developerKey=api_key)
    query = f"'{folder_id}' in parents"
    results = service.files().list(
        q=query,
        pageSize=10,
        fields="files(id, name)"
    ).execute()
    items = results.get('files', [])
    print(items)
    if not items:
        print('No files found.')
    else:
        print('Files:')
        for item in items:
            file_id = item['id']
            dimensions = get_image_dimensions(file_id, api_key)
            if dimensions:
                width, height = dimensions
                print(f"Name: {item['name']}, ID: {file_id}")
                print(f"Width: {width}, Height: {height}")
                print()

def main():
    # Replace with your API key
    api_key = os.getenv('API_KEY')
    # Replace with the ID of the folder you want to list files from
    folder_id = '1wJG55NOg-piytBc_KBTkSG9qS6I5k0To'
    list_files_in_folder(api_key, folder_id)

if __name__ == '__main__':
    main()
