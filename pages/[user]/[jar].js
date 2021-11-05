import { useRouter } from 'next/router'
import TipJarLayout from '../../components/tipLayout'
import TipJar from '../../components/tipJar'
const Post = () => {
  const router = useRouter()
  const user = router.query.user 
  const jar = router.query.jar ? router.query.jar : 'none' // should add a jar not found kinda thing here
//   return <p>jar: {user} {jar}</p>
return <>

  <TipJarLayout></TipJarLayout>

</>

// return <TipJar></TipJar>

}

export default Post



export async function GetStaticPaths() {


  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
}
}
