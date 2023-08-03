
import BusinessTop from "components/templates/amlDetail/BusinessTop";
import BusinessCore from "components/templates/amlDetail/BusinessCore";

import { BusinessProfile} from "interfaces/detail";
import { useToggle } from "contexts/toggleContext";



interface Props{
  profileData:BusinessProfile[];

}

const Detail = ({profileData}:Props) => {

  

  const { dispatch } = useToggle();
  const collapseAll = () => {
    dispatch({ type: 'RESET' });
  }





  return (
    <div className="pt-5 px-5 min-w-[1280px]">
      <BusinessTop profileData={profileData[0]} />   
      <BusinessCore  profileData={profileData[0]} />,
    </div>
  );
};
export default Detail;


