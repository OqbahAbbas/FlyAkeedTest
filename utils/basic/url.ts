import { trimUrlSlashes } from '@admixltd/admix-component-library'
import { BASE_PATH } from '@constants/envs'

const url = (path: string) => trimUrlSlashes(`${BASE_PATH ?? '/'}${path}`)

export default url
