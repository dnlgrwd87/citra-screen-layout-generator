import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { games } from '../constants';
import { Game, GameKey } from '../types';

interface Props {
    defaultGame?: Game;
    onChange: (game: Game) => void;
}

export default function GameSelector(props: Props) {
    const [game, setGame] = useState(props.defaultGame || games.zelda);

    const onChange = (e: SelectChangeEvent) => {
        const game = games[e.target.value as GameKey];

        setGame(game);
        props.onChange(game);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="game-select-label">Game</InputLabel>
            <Select
                label="game"
                labelId="game-select-label"
                id="game-select"
                value={game.id}
                onChange={onChange}
            >
                {Object.values(games).map((game) => (
                    <MenuItem key={game.id} value={game.id}>
                        {game.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
