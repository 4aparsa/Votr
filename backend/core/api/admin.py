from django.contrib import admin
from api.models import RegisteredVoter

# Register your models here.
class RegisteredVoterAdmin(admin.ModelAdmin):
    pass

admin.site.register(RegisteredVoter, RegisteredVoterAdmin)
