from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_blockchain),
    path('register/', views.register_voter),
    path('add/', views.add_vote),
    path('get/', views.get_vote),
    path('count_votes/', views.count_votes),
    path('change/', views.change_blockchain)
]