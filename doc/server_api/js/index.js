import { convertJson } from './convertJSON';
import { createRoot } from './createRoot'
import STORE from '../data/data.json'
import '../css/main.css'

const root = createRoot('container');
convertJson(STORE, root, 'paragraph');
