class Direction:
    def __init__(self, is_vertical=False, is_horizontal=False, is_diagonal=False):
        self.is_vertical = is_vertical
        self.is_horizontal = is_horizontal
        self.is_diagonal = is_diagonal

    def to_dict(self):
        return {
            "isVertical": self.is_vertical,
            "isHorizontal": self.is_horizontal,
            "isDiagonal": self.is_diagonal,
        }


class Rules:
    def __init__(
        self,
        affects_caster=False,
        direction=Direction().to_dict(),
        cast_anywhere=False,
        tiles_affected=0,
        must_be_empty_tile=False,
        area_shape="",
    ):
        self.affects_caster = affects_caster
        self.direction = direction
        self.cast_anywhere = cast_anywhere
        self.tiles_affected = tiles_affected
        self.must_be_empty_tile = must_be_empty_tile
        self.area_shape = area_shape

    def to_dict(self):
        return {
            "affectsCaster": self.affects_caster,
            "direction": self.direction,
            "castAnywhere": self.cast_anywhere,
            "tilesAffected": self.tiles_affected,
            "mustBeEmptyTile": self.must_be_empty_tile,
            "areaShape": self.area_shape,
        }


class PowerUp:
    def __init__(
        self,
        value=0,
        name="",
        description="",
        img_url="",
        rules=Rules().to_dict(),
        select_color="",
    ):
        self.value = value
        self.name = name
        self.description = description
        self.img_url = img_url
        self.rules = rules
        self.select_color = select_color

    def to_dict(self):
        return {
            "value": self.value,
            "name": self.name,
            "description": self.description,
            "imgUrl": self.img_url,
            "rules": self.rules,
            "selectColor": self.select_color,
        }
