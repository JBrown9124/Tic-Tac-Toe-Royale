"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from tic_tac_toe_backend.views import lobby_view, game_view, board_view, bot_view
from django.conf.urls.static import static
from django.conf import settings


# from .index import index

urlpatterns = [
    #   path('', index, name='index'),
    path('admin/', admin.site.urls),
    path('api/lobby', lobby_view.LobbyView.as_view()),
     path('api/game', game_view.Game.as_view()),
     path('api/board', board_view.Board.as_view()),
     path('api/bot', bot_view.BotAction.as_view()),
     
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

