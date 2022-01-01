class Player:
    def __init__(
        self,
        name,
        player_id="1",
        player_number=1,
        piece=None,
        is_host=False,
        is_ready=False,
    ):
        self.name = name
        self.piece = piece
        self.is_host = is_host
        self.player_id = player_id
        self.player_number = player_number
        self.is_ready = is_ready

    def to_dict(self):
        return {
            "name": self.name,
            "piece": self.piece,
            "isHost": self.is_host,
            "playerId": self.player_id,
            "playerNumber": self.player_number,
            "isReady": self.is_ready,
        }

    def __repr__(self):

        print(
            f"name: {self.name}, \n \
            piece: {self.piece} \n \
            isHost: {self.is_host}, \n \
            playerId: {self.player_id}, \n \
            playerNumber: {self.player_number},\n \
                isReady: {self.is_ready},\n \
            "
        )
