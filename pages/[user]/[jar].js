import { useRouter } from 'next/router'
import TipJarLayout from '../../components/tipLayout'
import UserSettings from '../[user]/settings/[...settings]'
const Post = () => {
  const router = useRouter()
  const userName = router.query.user
  const jar = router.query.jar ? router.query.jar : 'none' // should add a jar not found kinda thing here
  //   return <p>jar: {user} {jar}</p>

  if (router.asPath === `/${userName}/settings`) {
    return <UserSettings/>;
  }else{
    return <TipJarLayout/>
  }


  // return <TipJar></TipJar>

}

export default Post
