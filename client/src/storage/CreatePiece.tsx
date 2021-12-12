import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PetsIcon from "@mui/icons-material/Pets";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { RgbaColor } from "react-colorful";
interface PieceProps{
  name:string;
  value:JSX.Element
}
const createPiece = ( color:string ):PieceProps[] => {
 console.log(color,"CREATEPIECECOLOR")
  const pieces = [
    {
      name: "Clear",
      value: <ClearIcon sx={{ height: "40px", width: "40px",  color: color }} />,
      
    },
    {
      name: "Star",
      value: <StarIcon sx={{ height: "40px", width: "40px", color: color }} />,
      
    },
    {
      name: "CircleOutlined",
      value: <CircleOutlinedIcon sx={{ height: "40px", width: "40px",   color: color }} />,
     
    },
    {
      name: "Pets",
      value: <PetsIcon sx={{ height: "40px", width: "40px",  color: color }} />,
      
    },
    {
      name: "FitnessCenter",
      value: <FitnessCenterIcon sx={{ height: "40px", width: "40px" , color: color }} />,
      
    },
    {
      name: "FavoriteBorder",
      value: <FavoriteBorderIcon sx={{ height: "40px", width: "40px" , color: color }} />,
     
    },
    {
      name: "ChildCare",
      value: <ChildCareIcon sx={{ height: "40px", width: "40px" ,color: color}} />,
     
    },
  ];
  return pieces;
};
export default createPiece;
