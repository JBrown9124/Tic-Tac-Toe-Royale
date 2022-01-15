from django.contrib.auth.middleware import get_user
from django.db.models import Max, Q
from django.db.models.query import Prefetch
from django.http import HttpResponse, JsonResponse, HttpResponseServerError
from random import randrange

from rest_framework.views import APIView
from rest_framework.request import Request
from django.utils import timezone

from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView
index = never_cache(TemplateView.as_view(template_name='index.html'))
