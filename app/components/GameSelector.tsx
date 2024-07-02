import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { games } from '../constants';
import { Game } from '../types';

interface Props {
    defaultGame?: Game;
    onChange: (game: Game) => void;
}

export default function GameSelector(props: Props) {
    const [game, setGame] = useState(props.defaultGame || games.zeldaOoT);

    const onChange = (e: SelectChangeEvent) => {
        const game = games[e.target.value];

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
                {Object.keys(games).map((k) => (
                    <MenuItem key={k} value={games[k].id}>
                        {games[k].name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
