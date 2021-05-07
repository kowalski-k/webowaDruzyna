#!/bin/bash
envsubst < config.tmpl > config.ini
python /opt/flaskapp/app.py
