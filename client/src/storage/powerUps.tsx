import fire from "../img/fire.png";
import {PowerUps} from "../Models/PowerUp"
export const powerUps:PowerUps = 
  {
    "1": {
      name: "fire",
      description:
        "Place on an empty tile next to any tile you own. Last for 2 turns. If players move onto this tile their moves will perish",
      imgUrl: fire,
      value: 1,
    },
  
  
    "2": {
      name: "cleave",
      description:
        "Slash 3 spaces vertically or horizontally. Any moves in the slashes path will be destroyed!",
      imgUrl:
        "https://i1.wp.com/st-central.net/wp-content/uploads/2020/08/icon_global_skill_p_cleave.png?ssl=1",
      value: 2,
    },

  
    "3": {
      name: "piercing arrow",
      description:
        "Shoot an arrow in any direction from a tile you own. Any moves in the arrows path will be destroyed!",
      imgUrl:
        "https://cdn.newworldfans.com/db_images/db/items_hires/arrowt4.png",
      value: 3,
    },
  
  
    "4": {
      name: "bomb",
      description: "Blow up a 4 square radius on any spot of the board",
      imgUrl:
        "https://cdn.pixabay.com/photo/2017/01/31/16/59/bomb-2025548_960_720.png",
      value: 4,
    },
  
  
    "5": {
      name: "swap",
      description: "Swap with any tile next to one that you own.",
      imgUrl: "https://icon-library.com/images/swap-icon/swap-icon-15.jpg",
      value: 5,
    }
  };
