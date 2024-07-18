from googleapiclient.discovery import build
import requests
from io import BytesIO
from PIL import Image


def get_image_dimensions(file_id, api_key):
    url = f"https://www.googleapis.com/drive/v3/files/{file_id}?alt=media&key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        image = Image.open(BytesIO(response.content))
        return image.size  # (width, height)
    else:
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

    if not items:
        print('No files found.')
    else:
        print('Files:')
        for item in items:
            file_id = item['id']
            dimensions = get_image_dimensions(file_id, api_key)
            if dimensions:
                width, height = dimensions
                print(f"Name: {item['name']}")
                print(f"Width: {width}, Height: {height}")
                print()

def main():
    # Replace with your API key
    api_key = 'YOUR_API_KEY'
    # Replace with the ID of the folder you want to list files from
    folder_id = '1wJG55NOg-piytBc_KBTkSG9qS6I5k0To'
    list_files_in_folder(api_key, folder_id)

if __name__ == '__main__':
    main()
