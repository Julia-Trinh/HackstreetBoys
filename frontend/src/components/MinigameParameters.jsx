import React from "react";

const MinigameParameters = ({Minigame, Difficulty}) => {
    //RattleOff:0
    //SuddenDeath:1
    //StandOff:2
    
    switch (Minigame){
        case 0:
            switch(Difficulty){
                case 1:
                    return [1,10,true];
                case 2:
                    return [2,14,true];
                case 3:
                    return [3,18,true];
            }
        case 1:
            switch(Difficulty){
                case 1:
                    return [1,10,true];
                case 2:
                    return [2,14,true];
                case 3:
                    return [3,18,true];
            }
        case 2:
            switch(Difficulty){
                case 1:
                    return [1,1,true];
                case 2:
                    return [1,1,true];
                case 3:
                    return [1,1,true];
            }
    }
}

export default MinigameParameters;