from typing import List

from django.db.models import Model

class CustomModel(Model):

    class Meta:
        abstract = True

    def to_dict(self, fields: List[str] = None):
        """
        Build and return a dictionary with fields specified

        If no fields are specified, will return all fields using _meta.fields
        """
        model_dict = {}
        if not fields:
            fields = [field.get_attname_column() for field in self._meta.fields]
            model_dict = {field[1]: getattr(self, field[0]) for field in fields}
        else:
            for field in fields:
                model_dict[field] = getattr(self, field)
        return model_dict
