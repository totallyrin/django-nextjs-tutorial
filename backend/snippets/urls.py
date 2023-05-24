from django.urls import path, include
from rest_framework.routers import DefaultRouter

from snippets import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'snippets', views.SnippetViewSet, basename='snippet')
router.register(r'users', views.UserViewSet, basename='user')

# The API URLs are not determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('', views.index, name='index'),
]
