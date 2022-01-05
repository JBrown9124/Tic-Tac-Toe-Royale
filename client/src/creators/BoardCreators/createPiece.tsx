import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PetsIcon from "@mui/icons-material/Pets";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChildCareIcon from "@mui/icons-material/ChildCare";
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
        key={400}
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
        key={500}
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
        key={600}
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
        key={700}
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
        key={800}
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
        key={900}
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
        key={1000}
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
  ];
  return pieces;
};
export default createPiece;
