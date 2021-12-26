import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PetsIcon from "@mui/icons-material/Pets";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { RgbaColor } from "react-colorful";
import { sizeOfPiece, mobileSizeOfPiece } from "./sizeOfPiece";
interface PieceProps {
  name: string;
  value: JSX.Element;
}
const createPiece = (color: string): PieceProps[] => {

  const pieces = [
    {
      name: "Clear",
      value: (
        <ClearIcon
          sx={{
            height: mobileSizeOfPiece,
            width: mobileSizeOfPiece,
            maxHeight: sizeOfPiece,
            maxWidth: sizeOfPiece,
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
            height: mobileSizeOfPiece,
            width: mobileSizeOfPiece,
            maxHeight: sizeOfPiece,
            maxWidth: sizeOfPiece,
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
          height: mobileSizeOfPiece,
          width: mobileSizeOfPiece,
          maxHeight:sizeOfPiece,
          maxWidth:sizeOfPiece, color: color }}
        />
      ),
    },
    {
      name: "Pets",
      value: (
        <PetsIcon
       
        
        sx={{
          height: mobileSizeOfPiece,
          width: mobileSizeOfPiece,
          maxHeight:sizeOfPiece,
          maxWidth:sizeOfPiece, color: color }}
        />
      ),
    },
    {
      name: "FitnessCenter",
      value: (
        <FitnessCenterIcon
       
        
        sx={{
          height: mobileSizeOfPiece,
          width: mobileSizeOfPiece,
          maxHeight:sizeOfPiece,
          maxWidth:sizeOfPiece, color: color }}
        />
      ),
    },
    {
      name: "FavoriteBorder",
      value: (
        <FavoriteBorderIcon
      
        
        sx={{
          height: mobileSizeOfPiece,
          width: mobileSizeOfPiece,
          maxHeight:sizeOfPiece,
          maxWidth:sizeOfPiece, color: color }}
        />
      ),
    },
    {
      name: "ChildCare",
      value: (
        <ChildCareIcon
       
        
        sx={{
          height: mobileSizeOfPiece,
          width: mobileSizeOfPiece,
          maxHeight:sizeOfPiece,
          maxWidth:sizeOfPiece, color: color }}
        />
      ),
    },
  ];
  return pieces;
};
export default createPiece;
