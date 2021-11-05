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


// export async function getStaticPaths() {

//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: false
// }
// }

export async function GetStaticPaths() {


  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
}
}

