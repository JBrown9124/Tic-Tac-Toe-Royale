"""
WSGI config for mysite project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os
from socketio_app.views import sio
from django.core.wsgi import get_wsgi_application
import socketio
import eventlet
import eventlet.wsgi
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tic_tac_toe_backend.settings')

application = get_wsgi_application()
application = socketio.WSGIApp(sio, application)

eventlet.wsgi.server(eventlet.listen(("", 8000)), application, log_output=False)