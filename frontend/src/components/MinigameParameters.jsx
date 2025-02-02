const MinigameParameters = (Minigame, Difficulty) => {
    switch (Minigame) {
        case 0:
        case 1:
            switch (Difficulty) {
                case 1: return [1, 10, true];
                case 2: return [2, 14, true];
                case 3: return [3, 18, true];
                default: return [1, 10, true]; // Default fallback
            }
        case 2:
            switch (Difficulty) {
                case 1:
                case 2:
                case 3:
                    return [1, 1, true];
                default:
                    return [1, 1, true]; // Default fallback
            }
        default:
            return [1, 10, true]; // Default for unknown minigames
    }
};

export default MinigameParameters;
