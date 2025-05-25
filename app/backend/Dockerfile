FROM python:3.9-slim-buster

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_APP=app.py
ENV MONGO_URI="mongodb://host.docker.internal:27017/media_manifest"

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]