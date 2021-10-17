import { useRouter } from 'next/router'
import TipJarLayout from '../../components/tipLayout'
import TipJar from '../../components/tipJar'
const Post = () => {
  const router = useRouter()
  const user = router.query.user 
  const jar = router.query.jar ? router.query.jar : 'none' // should add a jar not found kinda thing here
//   return <p>jar: {user} {jar}</p>
return <TipJar></TipJar>
// return <TipJar></TipJar>

}

export default Post