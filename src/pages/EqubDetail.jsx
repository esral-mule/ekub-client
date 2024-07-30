import { useParams } from 'react-router';
import DemoPage from '../components/equb/page'
export default function EqubDetail() {
    let { id } = useParams();
    return (
    <DemoPage id={id}/>
  )
}
