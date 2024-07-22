

import boto3
from botocore.exceptions import NoCredentialsError

# Initialize a session using Amazon S3
s3_client = boto3.client('s3')

# Function to list objects and generate public URLs for a given bucket
def list_public_urls(bucket_name):
    try:

        image_urls = []
        # List objects within the specified bucket
        response = s3_client.list_objects_v2(Bucket=bucket_name)

        # Base URL format for public S3 bucket objects
        base_url = f"https://{bucket_name}.s3.amazonaws.com/"

        # Check if 'Contents' is in the response to handle empty bucket cases
        if 'Contents' in response:
            for obj in response['Contents']:
                object_key = obj['Key']
                # Construct the public URL
                public_url = f"{base_url}{object_key}"
                public_url = public_url.replace(" ", "+")
                print(f"Object: {object_key}, URL: {public_url}")
                image_urls.append(public_url)
        else:
            print(f"No objects found in bucket '{bucket_name}'.")

        return image_urls
    except NoCredentialsError:
        print("Credentials not available")
    except Exception as e:
        print(f"Error listing objects in bucket '{bucket_name}': {e}")

