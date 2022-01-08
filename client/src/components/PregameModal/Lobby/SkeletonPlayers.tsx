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
import { useCookies } from "react-cookie";
import Skeleton from "@mui/material/Skeleton";
export default function SkeletonPlayers() {
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Skeleton animation="wave" sx={{ width: "40px", height: "40px" }} />
        </ListItemIcon>
        <ListItemText
          inset
          key={1}
          primary={
            <ListItemIcon>
              <Skeleton animation="wave" sx={{ width: "40px", height: "40px" }} />
            </ListItemIcon>
          }
        />

        <ListItemText primary={<Skeleton animation="wave" sx={{ textAlign: "center" }} />} />
      </ListItem>{" "}
      <ListItem>
        <ListItemIcon>
          <Skeleton animation="wave" sx={{ width: "40px", height: "40px" }} />
        </ListItemIcon>
        <ListItemText
          inset
          key={2}
          primary={
            <ListItemIcon>
              <Skeleton animation="wave" sx={{ width: "40px", height: "40px" }} />
            </ListItemIcon>
          }
        />

        <ListItemText primary={<Skeleton animation="wave" sx={{ textAlign: "center" }} />} />
      </ListItem>{" "}
      <ListItem>
        <ListItemIcon>
          <Skeleton sx={{ width: "40px", height: "40px" }} />
        </ListItemIcon>
        <ListItemText
          inset
          key={3}
          primary={
            <ListItemIcon>
              <Skeleton animation="wave" sx={{ width: "40px", height: "40px" }} />
            </ListItemIcon>
          }
        />

        <ListItemText primary={<Skeleton sx={{ textAlign: "center" }} />} />
      </ListItem>{" "}
      <ListItem>
        <ListItemIcon>
          <Skeleton animation="wave"  sx={{ width: "40px", height: "40px" }} />
        </ListItemIcon>
        <ListItemText
          inset
          key={4}
          primary={
            <ListItemIcon>
              <Skeleton animation="wave"  sx={{ width: "40px", height: "40px" }} />
            </ListItemIcon>
          }
        />

        <ListItemText primary={<Skeleton animation="wave" sx={{ textAlign: "center" }} />} />
      </ListItem>
    </>
  );
}
