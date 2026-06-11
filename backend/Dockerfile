FROM python:3.11-slim

# prevent python buffering logs
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# install system deps (needed for pymongo + pdf libs stability)
RUN apt-get update && apt-get install -y \
    gcc \
    libmagic1 \
    && rm -rf /var/lib/apt/lists/*

# install python deps first (better docker caching)
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY . .

# ensure storage folder exists (important for PDF access in docker)
RUN mkdir -p /app/storage

EXPOSE 8000

# run fastapi
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]