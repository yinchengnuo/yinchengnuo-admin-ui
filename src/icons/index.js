import Vue from 'vue'
import SvgIcon from './SvgIcon'

Vue.component('svg-icon', SvgIcon)

const context = require.context('./svg', false, /\.svg$/)
context.keys().map(context)
