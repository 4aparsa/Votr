from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_blockchain),
    path('add/', views.add_vote),
    path('get/', views.get_vote)
]