import {App} from "./app/App.js";
import {createRoot} from 'react-dom/client';
import React from 'react';


const root = createRoot(document.getElementById('planner'));
root.render(<App/>)

