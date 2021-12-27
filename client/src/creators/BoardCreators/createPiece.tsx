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
const createPiece = (color: string, sizeOfPiece:{mobile:string,desktop:string}={mobile:"5vw", desktop:"40px"}, ): PieceProps[] => {
  const pieces = [
    {
      name: "Clear",
      value: (
        <ClearIcon
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
          sx={{
            height: sizeOfPiece.mobile,
            width:sizeOfPiece.mobile,
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
          sx={{
            height: sizeOfPiece.mobile,
            width:sizeOfPiece.mobile,
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
          sx={{
            height:sizeOfPiece.mobile,
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
          sx={{
            height: sizeOfPiece.mobile,
            width:sizeOfPiece.mobile,
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
