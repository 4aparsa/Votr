from django.db import models
from django.core.validators import MaxValueValidator

class RegisteredVoter(models.Model):
    ssn = models.IntegerField(validators=[MaxValueValidator(9999999999)], blank=True, null=True)
    dob = models.CharField(max_length=10)
    name = models.CharField(max_length=100)

    @classmethod
    def create(cls, ssn, dob, name):
        newRegisteredVoter = cls(ssn=ssn, dob=dob, name=name)
        return newRegisteredVoter

    def __str__(self):
        return f"SSN: {self.ssn} | DOB: {self.dob} | Name: {self.name}"
