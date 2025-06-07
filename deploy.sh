#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Check if PROJECT_ID is set
if [ -z "$PROJECT_ID" ]; then
  echo "Error: PROJECT_ID is not set in .env file"
  exit 1
fi

# Build the project
npm run build

# Deploy to Google Cloud Run Functions
gcloud functions deploy api \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-west1 \
  --source=. \
  --entry-point=api \
  --trigger-http \
  --allow-unauthenticated \
  --project=$PROJECT_ID

echo "Deployment completed!"