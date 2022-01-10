import uuid


class Player:
    def __init__(
        self,
        name,
        session_id,
        turn_number=1,
        piece=None,
        is_loaded=False,
        is_host=False,
        is_ready=False,
    ):
        self.name = name
        self.piece = piece
        self.is_host = is_host
        self.is_loaded = is_loaded
        self.player_id = str(uuid.uuid4())
        self.turn_number = turn_number
        self.is_ready = is_ready
        self.session_id = session_id

    def to_dict(self):
        return {
            "name": self.name,
            "piece": self.piece,
            "isHost": self.is_host,
            "playerId": self.player_id,
            "turnNumber": self.turn_number,
            "isReady": self.is_ready,
            "isLoaded": self.is_loaded,
            "sessionId": self.session_id,
        }

    def __repr__(self):

        print(
            f"name: {self.name}, \n \
            piece: {self.piece} \n \
            isHost: {self.is_host}, \n \
            playerId: {self.player_id}, \n \
            turnNumber: {self.turn_number},\n \
                isReady: {self.is_ready},\n \
                    isLoaded: {self.is_loaded}, \n \
                        sessionId:{self.session_id}\
            "
        )
