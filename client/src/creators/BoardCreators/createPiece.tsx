import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PetsIcon from "@mui/icons-material/Pets";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import getRandomInt from "./getRandomInt";
import { RgbaColor } from "react-colorful";
import { mobileSizeOfPiece } from "./sizeOfPiece";
interface PieceProps {
  name: string;
  value: JSX.Element;
}
const createPiece = (
  color: string,
  sizeOfPiece: { mobile: string; desktop: string } = {
    mobile: "5vw",
    desktop: "40px",
  }
): PieceProps[] => {
  const pieces = [
    {
      name: "Clear",
      value: (
        <ClearIcon
          key={getRandomInt(1, 9999)}
          sx={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
            color: color,
          }}
        />
      ),
    },
    {
      name: "Star",
      value: (
        <StarIcon
          key={getRandomInt(1, 9999)}
          sx={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
            color: color,
          }}
        />
      ),
    },
    {
      name: "CircleOutlined",
      value: (
        <CircleOutlinedIcon
          key={getRandomInt(1, 9999)}
          sx={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
            color: color,
          }}
        />
      ),
    },
    {
      name: "Pets",
      value: (
        <PetsIcon
          key={getRandomInt(1, 9999)}
          sx={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
            color: color,
          }}
        />
      ),
    },
    {
      name: "FitnessCenter",
      value: (
        <FitnessCenterIcon
          key={getRandomInt(1, 9999)}
          sx={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
            color: color,
          }}
        />
      ),
    },
    {
      name: "FavoriteBorder",
      value: (
        <FavoriteBorderIcon
          key={getRandomInt(1, 9999)}
          sx={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
            color: color,
          }}
        />
      ),
    },
    {
      name: "ChildCare",
      value: (
        <ChildCareIcon
          key={getRandomInt(1, 9999)}
          sx={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
            color: color,
          }}
        />
      ),
    },
    {
      name: "Shrek",
      value: (
        <img
          key={getRandomInt(1, 9999)}
          src={"https://i.insider.com/60817ec5354dde0018c06960?width=700"}
          alt={"shrek"}
          style={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
          }}
        />
      ),
    },
    {
      name: "Jabba",
      value: (
        <img
          key={getRandomInt(1, 9999)}
          src={
            "https://static3.srcdn.com/wordpress/wp-content/uploads/2020/10/Jabba-the-Hutt-feature.jpg?q=50&fit=crop&w=943&h=500&dpr=1.5"
          }
          alt={"jabba"}
          style={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
          }}
        />
      ),
    },
    {
      name: "Radiohead",
      value: (
        <img
          key={getRandomInt(1, 9999)}
          src={
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ed8142d4-e3a2-4143-8acb-4276031ecdb7/d83427r-ef9cb294-b447-4357-957b-db707a14ae75.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VkODE0MmQ0LWUzYTItNDE0My04YWNiLTQyNzYwMzFlY2RiN1wvZDgzNDI3ci1lZjljYjI5NC1iNDQ3LTQzNTctOTU3Yi1kYjcwN2ExNGFlNzUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.U15gjuD6iysxMcVp20CSXWZCKIXA42IwBimGhftd3Ms"
          }
          alt={"Radiohead"}
          style={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
          }}
        />
      ),
    },
    {
      name: "TimAllen",
      value: (
        <img
          key={getRandomInt(1, 9999)}
          src={
            "https://i1.sndcdn.com/artworks-x3Sb2byztbxK4Sgr-VA47OA-t500x500.jpg"
          }
          alt={"TimAllen"}
          style={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
          }}
        />
      ),
    },
    {
      name: "Gandalf",
      value: (
        <img
          key={getRandomInt(1, 9999)}
          src={
            "https://optimistminds.com/wp-content/uploads/Gandalf-quotes.jpg"
          }
          alt={"Gandalf"}
          style={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
          }}
        />
      ),
    },
    {
      name: "Jon",
      value: (
        <img
          key={getRandomInt(1, 9999)}
          src={"https://i.imgur.com/gKPsImZ.jpg"}
          alt={"Jon"}
          style={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
          }}
        />
      ),
    },
    {
      name: "DonkeyKong",
      value: (
        <img
          key={getRandomInt(1, 9999)}
          src={
            "https://static.displate.com/857x1200/displate/2017-10-02/74c2e6a277c641f8750e9311a4b9f109_50ba44ca676ee283b7065f7022bc883a.jpg"
          }
          alt={"DonkeyKong"}
          style={{
            height: sizeOfPiece.mobile,
            width: sizeOfPiece.mobile,
            maxHeight: sizeOfPiece.desktop,
            maxWidth: sizeOfPiece.desktop,
          }}
        />
      ),
    },
  ];
  return pieces;
};
export default createPiece;
