import './update-screen.scss';
import { useParams } from 'react-router-dom';
import { UpdateRestaurant } from 'src/components';

const UpdateScreen = (): React.ReactElement => {
  return (
    <>
      Update Restaurant
      <UpdateRestaurant />
    </>
  );
};

export default UpdateScreen;
