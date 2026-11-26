//@ts-nocheck
import { mount } from 'svelte'
import './app.css'
import App from './App.svelte' // eslint-disable-line

const app = mount(App, {
  target: document.getElementById('app'), // eslint-disable-line
})

export default app