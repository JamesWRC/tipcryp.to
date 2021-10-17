import { useRouter } from 'next/router'
import { TipJar } from '../components/tipJar'
import Matter from 'matter-js'
import ReactDOM from 'react-dom';

const Post = () => {
  const router = useRouter()
  const user = router.query.user

  return <p>user: {user}</p>

}

export default Post

