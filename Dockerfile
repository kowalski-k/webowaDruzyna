FROM python:3.8.3-slim
WORKDIR /opt/flaskapp

COPY requirements.txt .
RUN apt update && apt install -y curl
RUN pip install -r requirements.txt
COPY app.py .
EXPOSE "5000/tcp"
EXPOSE 2222 80
ENTRYPOINT ["python"]
CMD ["/opt/flaskapp/app.py"]
