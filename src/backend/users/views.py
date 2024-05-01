from django.shortcuts import render
from rest_framework import viewsets,permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model,authenticate
from knox.models import AuthToken
from .serializers import RegisterSerializer,LoginSerializer
# from .models import *

User=get_user_model()

class LoginViewSet(viewsets.ViewSet):
    permission_classes=[permissions.AllowAny]
    serializer_class=LoginSerializer

    def create(self,request):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            email=serializer.validated_data['email']
            password=serializer.validated_data['password']
            user=authenticate(request,email=email,password=password)

            if user:
                _, token = AuthToken.objects.create(user)
                return Response({
                    "user":self.serializer_class(user).data,
                    "token":token
                })
            else:
                return Response({"error":"Invalid Credentials"},status=401)
        else:
            return Response(serializer.errors,status=400)

class RegisterViewSet(viewsets.ViewSet):
    permission_classes=[permissions.AllowAny]
    queryset=User.objects.all()
    serializer_class=RegisterSerializer

    def create(self,request):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)
        