import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FaCrown } from "react-icons/fa";
import { Player } from "../../../Models/Player";
import createPiece from "../../../creators/BoardCreators/createPiece";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import SkeletonPlayers from "./SkeletonPlayers";
interface PlayerListProps {
  players: Player[];
  playerPiece: string;
  playerName: string;
  playerId: string;
}
export default function PlayerList({
  players,
  playerPiece,
  playerName,
  playerId,
}: PlayerListProps) {
  const pieces = createPiece("black");
  return (
    <>
      <Grid
        container
        textAlign="center"
        direction="column"
        justifyContent="center"
        sx={{ p: 1 }}
      >
        {/* <Grid item>
          <Typography
            sx={{ fontFamily: "Noto Sans, sans-serif"}}
          >
            {" "}
            Players{" "}
          </Typography>
        </Grid> */}
        {players.map((player) => (
          <Grid
          key={player.playerId}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            sx={{
              background: "#81c784",
              p: 1,
              border: "1px solid #ec407a",
              borderRadius: "5px",
              boxShadow: { xs: 0, sm: 0, md: 20 },
            }}
          >
            <Grid item xs={4} sm={4} md={4} lg={4}>
              {player.isHost ? (
                <FaCrown
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "orange",
                  }}
                />
              ) : player.isReady ? (
                <CheckIcon
                  sx={{
                    width: "40px",
                    height: "40px",
                    color: "green",
                  }}
                />
              ) : (
                <ClearIcon
                  sx={{
                    width: "40px",
                    height: "40px",
                    color: "red",
                  }}
                />
              )}
            </Grid>
            <Grid item xs={4} sm={1} md={4} lg={4}>
              {player.name}
            </Grid>
            <Grid item xs={4} sm={7} md={4} lg={4}>
              {" "}
              {player.playerId === playerId ? (
                typeof playerPiece === "string" &&
                playerPiece &&
                playerPiece.length > 30 ? (
                  <img
                    src={playerPiece}
                    alt={playerPiece}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "5px",
                    }}
                  />
                ) : (
                  pieces.map((piece) => {
                    if (piece.name === playerPiece) return piece.value;
                  })
                )
              ) : typeof player.piece === "string" &&
                player.piece &&
                player.piece.length > 30 ? (
                <img
                  src={player.piece}
                  alt={player.piece}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "5px",
                  }}
                />
              ) : (
                pieces.map((piece) => {
                  if (piece.name === player.piece) return piece.value;
                })
              )}
            </Grid>
          </Grid>
        ))}
        {/* <List dense  sx={{ }} aria-label="players">
          {players.length === 0 ? (
            <SkeletonPlayers />
          ) : (
            <>
              {" "}
              {players.map((player: Player, idx: number) =>
                player.playerId === playerId ? (
                  <ListItem
                  disablePadding
                  disableGutters
                    key={idx}
                    sx={{
                      background: "#81c784",
                      p: 1,
                      border: "1px solid #ec407a",
                      borderRadius: "5px",
                      boxShadow: 20,
                    }}
                  >
                    {!player.isHost && (
                      <ListItemIcon>
                        {player.isReady ? (
                          <CheckIcon
                            sx={{
                              width: "40px",
                              height: "40px",
                              color: "green",
                            }}
                          />
                        ) : (
                          <ClearIcon
                            sx={{
                              width: "40px",
                              height: "40px",
                              color: "red",
                            }}
                          />
                        )}
                      </ListItemIcon>
                    )}
                    {player.isHost && (
                      <ListItemIcon>
                        {" "}
                        <FaCrown
                          style={{
                            width: "40px",
                            height: "40px",
                            color: "orange",
                          }}
                        />
                      </ListItemIcon>
                    )}
                    {playerPiece.length > 30 ? (
                      <ListItemText
                        inset
                        key={playerPiece}
                        primary={
                          <img
                            src={playerPiece}
                            alt={playerPiece}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "5px",
                            }}
                          />
                        }
                      />
                    ) : (
                      pieces.map((piece) => {
                        if (piece.name === playerPiece)
                          return (
                            <ListItemText
                              inset
                              key={piece?.name}
                              primary={piece?.value}
                            />
                          );
                      })
                    )}

                    <ListItemText
                    inset
                      sx={{ textAlign: "center" }}
                      primaryTypographyProps={{
                        style: {
                          fontFamily: "Noto Sans, sans-serif",
                          
                        },
                      }}
                      primary={player.name}
                    />
                  </ListItem>
                ) : (
                  <ListItem
                  disablePadding
                    key={idx}
                    sx={{
                      background: "#81c784",
                      p: 1,
                      border: "1px solid #ec407a",
                      borderRadius: "5px",
                      boxShadow: 20,
                    }}
                  >
                    {!player.isHost && (
                      <ListItemIcon>
                        {player.isReady ? (
                          <CheckIcon
                            sx={{
                              width: "40px",
                              height: "40px",
                              color: "green",
                            }}
                          />
                        ) : (
                          <ClearIcon
                            sx={{
                              width: "40px",
                              height: "40px",
                              color: "red",
                            }}
                          />
                        )}
                      </ListItemIcon>
                    )}

                    {player.isHost && (
                      <ListItemIcon>
                        {" "}
                        <FaCrown
                          style={{
                            width: "40px",
                            height: "40px",
                            color: "orange",
                          }}
                        />
                      </ListItemIcon>
                    )}
                    {typeof player.piece === "string" &&
                    player.piece &&
                    player.piece.length > 30 ? (
                      <ListItemText
                        inset
                        key={player.piece}
                        primary={
                          <img
                            src={player.piece}
                            alt={player.piece}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "5px",
                            }}
                          />
                        }
                      />
                    ) : (
                      pieces.map((piece) => {
                        if (piece.name === player.piece)
                          return (
                            <ListItemText
                              inset
                              key={piece.name}
                              primary={piece.value}
                            />
                          );
                      })
                    )}

                    <ListItemText
               
                      primaryTypographyProps={{
                        style: {
                          fontFamily: "Noto Sans, sans-serif",
                        },
                      }}
                      sx={{  }}
                      primary={player.name}
                    />
                  </ListItem>
                )
              )}
            </>
          )}
        </List> */}
      </Grid>
    </>
  );
}
