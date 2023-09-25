import {App} from "./app/app";
import { createRoot } from 'react-dom/client';
import React from 'react';
import Button from '@mui/material/Button';
import {App2} from './App'

const root = createRoot(document.getElementById('app'));
root.render(<App2 />)

new App().run()
