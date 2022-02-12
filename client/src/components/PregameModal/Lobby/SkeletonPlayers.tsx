import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Skeleton from "@mui/material/Skeleton";
export default function SkeletonPlayers() {
  return (
    <>
      <ListItem
        sx={{
          background: "#81c784",
          p: 1,
          border: "1px solid #ec407a",
          borderRadius: "5px",
          boxShadow: 20,
        }}
      >
        <ListItemIcon>
          <Skeleton animation="wave" sx={{ width: "40px", height: "40px" }} />
        </ListItemIcon>
        <ListItemText
          inset
          key={1}
          primary={
            <ListItemIcon>
              <Skeleton
                animation="wave"
                sx={{ width: "40px", height: "40px" }}
              />
            </ListItemIcon>
          }
        />

        <ListItemText
          primary={<Skeleton animation="wave" sx={{ textAlign: "center" }} />}
        />
      </ListItem>{" "}
      <ListItem
        sx={{
          background: "#81c784",
          p: 1,
          border: "1px solid #ec407a",
          borderRadius: "5px",
          boxShadow: 20,
        }}
      >
        <ListItemIcon>
          <Skeleton animation="wave" sx={{ width: "40px", height: "40px" }} />
        </ListItemIcon>
        <ListItemText
          inset
          key={2}
          primary={
            <ListItemIcon>
              <Skeleton
                animation="wave"
                sx={{ width: "40px", height: "40px" }}
              />
            </ListItemIcon>
          }
        />

        <ListItemText
          primary={<Skeleton animation="wave" sx={{ textAlign: "center" }} />}
        />
      </ListItem>{" "}
      <ListItem
        sx={{
          background: "#81c784",
          p: 1,
          border: "1px solid #ec407a",
          borderRadius: "5px",
          boxShadow: 20,
        }}
      >
        <ListItemIcon>
          <Skeleton sx={{ width: "40px", height: "40px" }} />
        </ListItemIcon>
        <ListItemText
          inset
          key={3}
          primary={
            <ListItemIcon>
              <Skeleton
                animation="wave"
                sx={{ width: "40px", height: "40px" }}
              />
            </ListItemIcon>
          }
        />

        <ListItemText primary={<Skeleton sx={{ textAlign: "center" }} />} />
      </ListItem>{" "}
      <ListItem
        sx={{
          background: "#81c784",
          p: 1,
          border: "1px solid #ec407a",
          borderRadius: "5px",
          boxShadow: 20,
        }}
      >
        <ListItemIcon>
          <Skeleton animation="wave" sx={{ width: "40px", height: "40px" }} />
        </ListItemIcon>
        <ListItemText
          inset
          key={4}
          primary={
            <ListItemIcon>
              <Skeleton
                animation="wave"
                sx={{ width: "40px", height: "40px" }}
              />
            </ListItemIcon>
          }
        />

        <ListItemText
          primary={<Skeleton animation="wave" sx={{ textAlign: "center" }} />}
        />
      </ListItem>
    </>
  );
}
