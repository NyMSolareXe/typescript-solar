import { ProjectInput } from './components/project-input.js'
import { ProjectList } from './components/project-list.js'

new ProjectInput()
new ProjectList('active')
new ProjectList('finished')

// npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader