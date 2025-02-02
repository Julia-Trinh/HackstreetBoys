import React, { useState, useEffect } from 'react';
import { TestGame } from './TestGame';


const MinigameRush = () => {
    const {display, isTrue} = TestGame();
    return{
        display
    }

}

export default MinigameRush;