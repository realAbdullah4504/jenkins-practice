FROM python:3.12.7-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt && pip install "lxml[html_clean]"
COPY . /app
# EXPOSE 80
CMD ["./start.sh"]