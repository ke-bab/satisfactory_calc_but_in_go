import {App, AppReact} from "./app/App";
import { createRoot } from 'react-dom/client';
import React from 'react';
import Button from '@mui/material/Button';


const root = createRoot(document.getElementById('planner'));
root.render(<AppReact />)

