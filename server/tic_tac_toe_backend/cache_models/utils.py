from abc import ABC, abstractmethod
from typing import List


class Utils():
    def to_dict(self):
        dict = {}
        fields = [
            attr
            for attr in dir(self)
            if not callable(getattr(self, attr)) and not attr.startswith("__")
        ]
        for field in fields:

            camel_case_field = self.py_to_camel_case(field)
            dict[camel_case_field] = getattr(self, field)

        return dict
    
    @staticmethod
    def py_to_camel_case(word: str):
        split_word = word.split("_")
        for i in range(1, len(split_word)):

            split_word[i] = split_word[i].capitalize()

        return "".join(split_word)
